const { RootMsg, MarioListMsg, ControllerMsg, ValidPlayersMsg, Sm64JsMsg, FlagMsg } = require("./proto/mario_pb")
const fs = require('fs')
const http = require('http')
const got = require('got')
const util = require('util')
const zlib = require('zlib')
const deflate = util.promisify(zlib.deflate)
const port = 80
const ws_port = 3000


const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = process.env.PRODUCTION ? new FileSync('/tmp/data/db.json') : new FileSync('testdb.json')
const db = low(adapter)
db.defaults({ chats: [], adminCommands: [], ipList: [] }).write()

//Auto Delete Old chat entries
setInterval(() => {
    const oneDayAgo = Date.now() - 86400000
    db.get('chats').remove((entry) => {
        if (entry.timestampMs < oneDayAgo) return true
    }).write()
}, 86400000 * 3) //3 Days

const allChannels = {}
const connectedIPs = {}
const stats = {}


let currentId = 0
const generateID = () => {
    if (++currentId > 4294967294) currentId = 0
    return currentId
}

const text = {
    decoder: new TextDecoder(),
    encoder: new TextEncoder()
}

const sendJsonWithTopic = (topic, msg, channel) => {
    const str = JSON.stringify({ topic, msg })
    let bytes = text.encoder.encode(str)
    const rootMsg = new RootMsg()
    rootMsg.setJsonBytesMsg(bytes)
    channel.send(rootMsg.serializeBinary(), true)
}

const broadcastJsonWithTopic = (topic, msg) => {
    const str = JSON.stringify({ topic, msg })
    let bytes = text.encoder.encode(str)
    const rootMsg = new RootMsg()
    rootMsg.setJsonBytesMsg(bytes)
    bytes = rootMsg.serializeBinary()
    Object.values(allChannels).forEach(s => { s.channel.send(bytes, true) })
}

const sendData = (bytes, channel) => { channel.send(bytes, true) }

const broadcastData = (bytes, channel) => {
    Object.values(allChannels).forEach(s => { s.channel.send(bytes, true) })
}


const adminTokens = process.env.ADMIN_TOKENS ? process.env.ADMIN_TOKENS.split(":") : []

const sendValidUpdate = () => {

    const validPlayers = Object.values(allChannels).filter(data => data.valid > 0).map(data => data.channel.my_id)

    const validplayersmsg = new ValidPlayersMsg()
    validplayersmsg.setValidplayersList(validPlayers)
    const sm64jsMsg = new Sm64JsMsg()
    sm64jsMsg.setValidPlayersMsg(validplayersmsg)
    const rootMsg = new RootMsg()
    rootMsg.setUncompressedSm64jsMsg(sm64jsMsg)
    broadcastData(rootMsg.serializeBinary())
}

const flagStarts = [
    [9380, 7657, -8980],
    [-5126, 3678, 10106],
    [-14920, 3800, -8675],
    [12043, 3000, 10086]
]

const flagData = new Array(flagStarts.length).fill(0).map((unused, i) => {
    return {
        pos: [...flagStarts[i]],
        linkedToPlayer: false,
        atStartPosition: true,
        socketID: null,
        idleTimer: 0,
        heightBeforeFall: 20000
    }
})


const processPlayerData = (channel_id, decodedMario) => {

    //Pretty strict validation  -- ignoring validation for now
    if (decodedMario.getChannelid() != decodedMario.getController().getChannelid()) return
    if (allChannels[channel_id] == undefined) return

    /// server should always force the channel_id
    decodedMario.setChannelid(channel_id)

    /// Data is Valid
    allChannels[channel_id].decodedMario = decodedMario
    allChannels[channel_id].valid = 100

}

const processControllerUpdate = (channel_id, bytes) => {
    const decodedController = ControllerMsg.deserializeBinary(bytes)

    /// do some validation here probably
    allChannels[channel_id].decodedController = decodedController
    //broadcastDataWithOpcode(bytes, 3, channel_id)
}

const validSkins = (skinData) => {
    if (skinData.overalls.length != 6 && skinData.overalls != "r") return false
    if (skinData.hat.length != 6 && skinData.hat != "r") return false
    if (skinData.shirt.length != 6 && skinData.shirt != "r") return false
    if (skinData.gloves.length != 6 && skinData.gloves != "r") return false
    if (skinData.boots.length != 6 && skinData.boots != "r") return false
    if (skinData.skin.length != 6 && skinData.skin != "r") return false
    if (skinData.hair.length != 6 && skinData.hair != "r") return false


    for (let i = 0; i < 6; i++) {
        let number = skinData.overalls[i]
        if ((isNaN(number) || number < 0 || number > 255 || !Number.isInteger(number)) && skinData.overalls != "r") return false
        number = skinData.hat[i]
        if ((isNaN(number) || number < 0 || number > 255 || !Number.isInteger(number)) && skinData.hat != "r") return false
        number = skinData.shirt[i]
        if ((isNaN(number) || number < 0 || number > 255 || !Number.isInteger(number)) && skinData.shirt != "r") return false
        number = skinData.gloves[i]
        if ((isNaN(number) || number < 0 || number > 255 || !Number.isInteger(number)) && skinData.gloves != "r") return false
        number = skinData.boots[i]
        if ((isNaN(number) || number < 0 || number > 255 || !Number.isInteger(number)) && skinData.boots != "r") return false
        number = skinData.skin[i]
        if ((isNaN(number) || number < 0 || number > 255 || !Number.isInteger(number)) && skinData.skin != "r") return false
        number = skinData.hair[i]
        if ((isNaN(number) || number < 0 || number > 255 || !Number.isInteger(number)) && skinData.hair != "r") return false
    }

    return true

}


const processSkin = (channel_id, msg) => {
    if (allChannels[channel_id].valid == 0) return

    if (!validSkins(msg)) return

    allChannels[channel_id].skinData = msg
    allChannels[channel_id].skinData.updated = true
}

const rejectPlayerName = (channel) => {
    sendJsonWithTopic('playerName', { rejected: true }, channel)
}

const sanitizeChat = (string) => {
    string = string.substring(0, 200)
    string = string.replace(/</g, "")
    string = string.replace(/>/g, "")
    return applyValidCharacters(string)
}

//Valid characters for usernames.
const validCharacters = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g',
    'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u',
    'v', 'w', 'y', 'x', 'z', 'A', 'B',
    'C', 'D', 'E', 'F', 'G', 'H', 'I',
    'J', 'K', 'L', 'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T', 'U', 'V', 'W',
    'Y', 'X', 'Z', '1', '2', '3', '4',
    '5', '6', '7', '8', '9', '0', '!',
    '@', '$', '^', '*', '(', ')', '{',
    '}', '[', ']', ';', ':', `'`, '"',
    `\\`, ',', '.', '/', '?', '🙄', '😫',
    '🤔', '🔥', '😌', '😍', '🤣', '❤️', '😭',
    '😂', '⭐', '✨', '🎄', '🎃', '🔺', '🔻',
    '🎄', '🍬', '🍭', '🍫', ' ',
    '-', '_', '=', '|', '<', '>', ':', "'"
]


const applyValidCharacters = (str) => {
    let temp = ""
    str.split('').forEach(character => {
        if (validCharacters.includes(character)) { temp += character }
    })
    return temp
}


const processAdminCommand = (msg, token) => {
    const parts = msg.split(' ')
    const command = parts[0].toUpperCase()
    const remainingParts = parts.slice(1)

    let args

    switch (command) {
        case "ANNOUNCEMENT":
            args = remainingParts.join(" ")
            broadcastJsonWithTopic('announcement', { message: remainingParts.join(" "), timer: 300 })
            break
        default:  return console.log("Unknown Admin Command: " + parts[0])
    }

    db.get('adminCommands').push({ token, timestampMs: Date.now(), command, args }).write()
}

const processChat = async (channel_id, msg) => {

    const socket = allChannels[channel_id]
    if (socket == undefined || socket.playerName == undefined) return

    /// Throttle chats by IP
    if (connectedIPs[socket.channel.ip].chatCooldown > 10) {
        const chatmsg = {
            channel_id,
            msg: "Chat message ignored: You have to wait longer between sending chat messages",
            sender: "Server",
        }
        sendJsonWithTopic('chat', chatmsg, socket.channel)
        return
    }

    if (msg.message.length == 0) return

    const isAdmin = adminTokens.includes(msg.adminToken)

    if (msg.message[0] == '/') {
        if (isAdmin) processAdminCommand(msg.message.slice(1), msg.adminToken)
        return
    }

    const decodedMario = socket.decodedMario
    if (decodedMario == undefined) return

    connectedIPs[socket.channel.ip].chatCooldown += 5 // seconds

    /// record chat to DB
    db.get('chats').push({
        socketID: channel_id,
        playerName: socket.playerName,
        ip: socket.channel.ip,
        timestampMs: Date.now(),
        message: msg.message,
        adminToken: msg.adminToken
    }).write()

    const sanitizedChat = sanitizeChat(msg.message)

    const request = "http://www.purgomalum.com/service/json?text=" + sanitizedChat

    try {
        const filteredMessage = JSON.parse((await got(request)).body).result

        const chatmsg = {
            channel_id,
            msg: filteredMessage,
            sender: socket.playerName,
            isAdmin
        }

        broadcastJsonWithTopic('chat', chatmsg)

    } catch (e) {
        console.log(`Got error with profanity api: ${e}`)
    }

}

const processPlayerName = async (channel_id, msg) => {
    const socket = allChannels[channel_id]
    if (socket == undefined) return
    if (socket.playerName != undefined || msg.length < 3 || msg.length > 14 || msg == "server")  {
        return rejectPlayerName(socket.channel)
    }

    const sanitizedName = sanitizeChat(msg)

    if (sanitizedName != msg) {
        return rejectPlayerName(socket.channel)
    }

    const playerNameRequest = "http://www.purgomalum.com/service/json?text=" + sanitizedName

    try {
        const filteredPlayerName = JSON.parse((await got(playerNameRequest)).body).result

        if (sanitizedName != filteredPlayerName) {
            return rejectPlayerName(socket.channel)
        }

        socket.playerName = filteredPlayerName

        const acceptMsg = {
            accepted: true,
            playerName: filteredPlayerName,  /// should be same as message
        }

        sendJsonWithTopic('playerName', acceptMsg, socket.channel)

    } catch (e) {
        console.log(`Got error with profanity api: ${e}`)
    }


}


const sendSkinsToChannel = (channel) => {
    /// Send Skins
    Object.entries(allChannels).forEach(([channel_id, data]) => {
        if (data.skinData) {
            const skinMsg = { channel_id, skinData: data.skinData }
            sendJsonWithTopic('skin', skinMsg, channel)
        }
    })
}

const sendSkinsIfUpdated = () => {
    /// Send Skins
    Object.entries(allChannels).forEach(([channel_id, data]) => {
        if (data.skinData) {
            const skinMsg = { channel_id, skinData: data.skinData, playerName: data.playerName }
            broadcastJsonWithTopic('skin', skinMsg)
            data.skinData.updated = false
        }
    })
}

const processBasicAttack = (attackerID, attackMsg) => {

    if (allChannels[attackerID].valid == 0) return

    /// redundant
    attackMsg.setAttackerSocketId(attackerID)

    const flagIndex = attackMsg.getFlagId()
    const targetId = attackMsg.getTargetSocketId()

    if (flagData[flagIndex].linkedToPlayer && flagData[flagIndex].socketID == targetId) {
        flagData[flagIndex].linkedToPlayer = false
        flagData[flagIndex].socketID = null
        flagData[flagIndex].fallmode = true
        const newFlagLocation = allChannels[attackerID].decodedMario.getPosList()
        newFlagLocation[0] += ((Math.random() * 1000.0) - 500.0)
        newFlagLocation[1] += 600
        newFlagLocation[2] += ((Math.random() * 1000.0) - 500.0)
        flagData[flagIndex].heightBeforeFall = newFlagLocation[1]
        flagData[flagIndex].pos = [parseInt(newFlagLocation[0]), parseInt(newFlagLocation[1]), parseInt(newFlagLocation[2])]
    }

}

const processGrabFlagRequest = (socketID, grabFlagMsg) => {

    const i = grabFlagMsg.getFlagId()

    if (flagData[i].linkedToPlayer) return

    const pos = grabFlagMsg.getPosList()

    const xDiff = pos[0] - flagData[i].pos[0]
    const zDiff = pos[2] - flagData[i].pos[2]

    const dist = Math.sqrt(xDiff * xDiff + zDiff * zDiff)
    if (dist < 50) {
        flagData[i].linkedToPlayer = true
        flagData[i].fallmode = false
        flagData[i].atStartPosition = false
        flagData[i].socketID = socketID
        flagData[i].idleTimer = 0
    }
}

const checkForFlag = (socketID) => {

    for (let i = 0; i < flagData.length; i++) {
        if (flagData[i].socketID == socketID) {
            flagData[i].linkedToPlayer = false
            flagData[i].socketID = null
            flagData[i].fallmode = true
            const newFlagLocation = allChannels[socketID].decodedMario.getPosList()
            newFlagLocation[1] += 100
            flagData[i].heightBeforeFall = newFlagLocation[1]
            flagData[i].pos = [parseInt(newFlagLocation[0]), parseInt(newFlagLocation[1]), parseInt(newFlagLocation[2])]
        }
    }

}

const serverSideFlagUpdate = () => {

    for (let i = 0; i < flagData.length; i++) {

        if (flagData[i].fallmode) {
            if (flagData[i].pos[1] > -10000) flagData[i].pos[1] -= 2
        }

        if (!flagData[i].linkedToPlayer && !flagData[i].atStartPosition) {
            flagData[i].idleTimer++
            if (flagData[i].idleTimer > 3000) {
                flagData[i].pos = [...flagStarts[i]]
                flagData[i].fallmode = false
                flagData[i].atStartPosition = true
                flagData[i].idleTimer = 0
            }
        }

    }

}




/// Every frame - 30 times per second
setInterval(async () => {

    serverSideFlagUpdate()

    Object.values(allChannels).forEach(data => {
        if (data.valid > 0) data.valid--
        else if (data.decodedMario) {
            checkForFlag(data.channel.my_id)   //// this line probably unnecessay because should be called when the socket is closed
            data.channel.close()
        }
    })

    const sm64jsMsg = new Sm64JsMsg()
    const mariolist = Object.values(allChannels).filter(data => data.decodedMario).map(data => data.decodedMario)
    const mariolistproto = new MarioListMsg()
    mariolistproto.setMarioList(mariolist)


    const flagProtoList = []

    for (let i = 0; i < flagData.length; i++) {
        const flagmsg = new FlagMsg()
        flagmsg.setLinkedtoplayer(flagData[i].linkedToPlayer)
        if (flagData[i].linkedToPlayer) flagmsg.setSocketid(flagData[i].socketID)
        else {
            flagmsg.setPosList(flagData[i].pos)
            flagmsg.setHeightBeforeFall(flagData[i].heightBeforeFall)
        }
        flagProtoList.push(flagmsg)
    }

    mariolistproto.setFlagList(flagProtoList)

    sm64jsMsg.setListMsg(mariolistproto)
    const bytes = sm64jsMsg.serializeBinary()
    const compressedBytes = await deflate(bytes)
    const rootMsg = new RootMsg()
    rootMsg.setCompressedSm64jsMsg(compressedBytes)
    broadcastData(rootMsg.serializeBinary())

}, 33)

/// Every other frame - 16 times per second
setInterval(async () => {
/*    const controllerlist = Object.values(allChannels).filter(data => data.decodedController).map(data => data.decodedController)
    const controllerlistproto = new ControllerListMsg()
    controllerlistproto.setControllerList(controllerlist)
    const bytes = controllerlistproto.serializeBinary()
    const compressedMsg = await deflate(bytes)
    broadcastDataWithOpcode(compressedMsg, 3)*/

}, 66)


/// Every 33 frames / once per second
setInterval(() => {
    sendValidUpdate()

    //chat cooldown
    Object.values(connectedIPs).forEach(data => {
        if (data.chatCooldown > 0) data.chatCooldown--
    })
}, 1000)

/// Every 10 seconds
setInterval(() => {

    sendSkinsIfUpdated()

}, 10000)


require('uWebSockets.js').App().ws('/*', {

    upgrade: async (res, req, context) => { // a request was made to open websocket, res req have all the properties for the request, cookies etc

        // add code here to determine if ws request should be accepted or denied
        // can deny request with "return res.writeStatus('401').end()" see issue #367

        const ip = req.getHeader('x-forwarded-for')

        if (connectedIPs[ip]) {
            if (Object.keys(connectedIPs[ip].socketIDs).length >= 4) return res.writeStatus('403').end()
        }

        const key = req.getHeader('sec-websocket-key')
        const protocol = req.getHeader('sec-websocket-protocol')
        const extensions = req.getHeader('sec-websocket-extensions')

        //res.onAborted(() => { console.log("!! aborted") })

        if (process.env.PRODUCTION) {

            try {

                //console.log("someone trying to connect: " + ip)

                ///// check CORS
                let originHeader = req.getHeader('origin')
                const url = new URL(originHeader)
                const domainStr = url.hostname.substring(url.hostname.length - 11, url.hostname.length)
                if (domainStr != ".sm64js.com" && url.hostname != "sm64js.com") return res.writeStatus('418').end()

                const ipStatus = db.get('ipList').find({ ip }).value()

                if (ipStatus == undefined) {

                    //console.log("trying to hit vpn api")
                    const vpnCheckRequest = `http://v2.api.iphub.info/ip/${ip}`
                    const initApiReponse = await got(vpnCheckRequest, {
                        headers: { 'X-Key': process.env.VPN_API_KEY }
                    })
                    const response = JSON.parse(initApiReponse.body)

                    if (response.block == undefined) {
                        console.log("iphub reponse invalid")
                        return res.writeStatus('500').end()
                    }

                    if (response.block == 1) {
                        db.get('ipList').push({ ip, value: 'BANNED', reason: 'AutoVPN' }).write()
                       // console.log("Adding new VPN BAD IP " + ip)
                        return res.writeStatus('403').end()
                    } else {
                        //console.log("Adding new Legit IP")
                        db.get('ipList').push({ ip, value: 'ALLOWED' }).write()
                    }

                } else if (ipStatus.value == "BANNED") {  /// BANNED or NOT ALLOWED IP
                    //console.log("BANNED IP tried to connect")
                    return res.writeStatus('403').end()
                } else if (ipStatus.value == "ALLOWED") { /// Whitelisted IP - OKAY
                    //console.log("Known Whitelisted IP connecting")
                }

            } catch (e) {
                console.log(`Got error with upgrading to websocket: ${e}`)
                return res.writeStatus('500').end()
            }

        }
        
        res.upgrade( // upgrade to websocket
            { ip }, // 1st argument sets which properties to pass to the ws object, in this case ip address
            key,
            protocol,
            extensions, // these 3 headers are used to setup the websocket
            context // also used to setup the websocket
        )


    },

    open: async (channel) => {

        channel.my_id = generateID()

        if (connectedIPs[channel.ip] == undefined)
            connectedIPs[channel.ip] = { socketIDs: {}, chatCooldown: 15 }

        connectedIPs[channel.ip].socketIDs[channel.my_id] = 1

        allChannels[channel.my_id] = { valid: 0, channel }
        sendJsonWithTopic('id', { id: channel.my_id }, channel)

        sendSkinsToChannel(channel)
    },

    message: async (channel, bytes) => {

        try {
            let sm64jsMsg
            const rootMsg = RootMsg.deserializeBinary(bytes)

            switch (rootMsg.getMessageCase()) {
                case RootMsg.MessageCase.UNCOMPRESSED_SM64JS_MSG:

                    if (allChannels[channel.my_id].playerName == undefined) return

                    sm64jsMsg = rootMsg.getUncompressedSm64jsMsg()
                    switch (sm64jsMsg.getMessageCase()) {
                        case Sm64JsMsg.MessageCase.MARIO_MSG:
                            processPlayerData(channel.my_id, sm64jsMsg.getMarioMsg()); break
                        case Sm64JsMsg.MessageCase.ATTACK_MSG:
                            processBasicAttack(channel.my_id, sm64jsMsg.getAttackMsg()); break
                        case Sm64JsMsg.MessageCase.GRAB_MSG:
                            processGrabFlagRequest(channel.my_id, sm64jsMsg.getGrabMsg()); break
                        //case 3: processControllerUpdate(channel.my_id, bytes.slice(1)); break
                        //case 4: processKnockUp(channel.my_id, bytes.slice(1)); break
                        default: throw "unknown case for uncompressed proto message"
                    }
                    break
                case RootMsg.MessageCase.JSON_BYTES_MSG:
                    const str = text.decoder.decode(rootMsg.getJsonBytesMsg())
                    const { topic, msg } = JSON.parse(str)
                    switch (topic) {
                        case 'chat': processChat(channel.my_id, msg); break
                        case 'skin': processSkin(channel.my_id, msg); break
                        case 'playerName': processPlayerName(channel.my_id, msg); break
                        case 'ping': sendData(bytes, channel); break
                        default: throw "Unknown topic in json message"
                    }
                    break
                case RootMsg.MessageCase.MESSAGE_NOT_SET:
                default:
                    throw new Error(`unhandled case in switch expression: ${rootMsg.getMessageCase()}`)
            }


        } catch (err) { console.log(err) }
    },

    close: (channel) => {
        checkForFlag(channel.my_id)
        delete connectedIPs[channel.ip].socketIDs[channel.my_id]
        delete allChannels[channel.my_id]
    }

}).listen(ws_port, () => { console.log("Starting websocket server " + ws_port) })


//// Express Static serving
const express = require('express')
const app = express()
const server = http.Server(app)
app.use(express.static(__dirname + '/dist'))

server.listen(port, () => { console.log('Serving Files with express server ' + port) })


////// Admin Commands
app.get('/banIP/:token/:ip', (req, res) => {

    const { token, ip } = req.params

    if (!adminTokens.includes(token)) return res.status(401).send('Invalid Admin Token')

    const ipObject = db.get('ipList').find({ ip })
    const ipValue = ipObject.value()

    db.get('adminCommands').push({ token, timestampMs: Date.now(), command: 'banIP', args: [ ip ] }).write()

    if (ipValue == undefined) {
        db.get('ipList').push({ ip, value: 'BANNED', reason: 'Manual' }).write()
        console.log("Admin BAD IP " + ip + "  " + token)

        return res.send("BANNED")
    } else if (ipValue.value == "ALLOWED") {
        ipObject.assign({ value: 'BANNED', reason: 'Manual'  }).write()
        console.log("Admin BAD Existing IP " + ip + "  " + token)

        ///kick
        Object.values(allChannels).forEach(data => {
            if (data.channel.ip == ip) data.channel.close()
        })

        return res.send("BANNED")
    } else if (ipValue.value == "BANNED") {
        return res.send("Already BANNED")
    }

})

app.get('/allowIP/:token/:ip', (req, res) => {

    const { token, ip } = req.params

    if (!adminTokens.includes(token)) return res.status(401).send('Invalid Admin Token')

    const ipObject = db.get('ipList').find({ ip })
    const ipValue = ipObject.value()

    db.get('adminCommands').push({ token, timestampMs: Date.now(), command: 'allowIP', args: [ip] }).write()

    if (ipValue == undefined) {
        console.log("admin allowIP could not find")
        return res.send("allowIP could not find")
    } else if (ipValue.value == "BANNED") {
        ipObject.assign({ value: 'ALLOWED' }).write()
        console.log("Admin - Allowing Existing IP " + ip + "  " + token)

        return res.send("Allowing Existing IP")
    } else if (ipValue.value == "ALLOWED") {
        console.log("Admin Allow - already allowed")
        return res.send("Already ALLOWED")
    }

})

app.get('/chatLog/:token/:timestamp?/:range?', (req, res) => {

    const token = req.params.token
    const timestamp = (req.params.timestamp && req.params.timestamp != '0') ? parseInt(req.params.timestamp) : Date.now()
    const range = parseInt(req.params.range ? req.params.range : 60) * 1000

    if (adminTokens.includes(token)) {
        let stringResult = 'socketID,playerName,ip,message <br />'

        db.get('chats').forEach((entry) => {
            if (entry.timestampMs >= timestamp - range && entry.timestampMs <= timestamp + range) {
                stringResult += `${entry.socketID},${entry.playerName},${entry.ip},${entry.message} <br />`
            }
        }).value()
        
        return res.send(stringResult)
    } else {
        res.status(401).send('Invalid Admin Token')
    }

})


/////// necessary for server side rom extraction

const { promisify } = require('util')
const { spawn } = require('child_process')
const { v4: uuidv4 } = require('uuid')

app.get('/romTransfer', async (req, res) => {
    console.log("rom transfer")

    const uid = uuidv4()
    await mkdir('extractTools/' + uid)

    const file = fs.createWriteStream('extractTools/' + uid + '/baserom.us.z64')
    await fileDownload(file, 'http://' + req.query.romExternal)

    return res.send(await extractJsonFromRomFile(uid))
})


app.get('/stats', (req, res) => {
    return res.send({
        marioListSize: stats.marioListSize,
        numPlayers: Object.keys(allChannels).length
    })
})

const mkdir = promisify(fs.mkdir)

const pythonExtract = (dir) => {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python3', ['extract_assets.py', 'us', dir], { cwd: 'extractTools/' })
        //pythonProcess.stdout.on('data', (data) => { console.log(data.toString()) })
        //pythonProcess.stderr.on('data', (data) => { console.log(data.toString()) })
        pythonProcess.stderr.on('close', () => { resolve() })
    })
}

const fileDownload = (file, url) => {
    return new Promise((resolve, reject) => {
        try {
            http.get(url, (response) => {
                const stream = response.pipe(file)
                stream.on('error', () => { reject('Fail') })
                stream.on('finish', () => { resolve('Success') })
            })
        } catch {
            console.log("HTTP GET Error")
            fs.rmdirSync('extractTools/' + uid, { recursive: true })
            reject('Fail')
        }
    })
}

const extractJsonFromRomFile = async (dir) => {
    return new Promise(async (resolve, reject) => {
        try {
            await pythonExtract(dir)

            const extractedData = {}
            const assets = JSON.parse(fs.readFileSync('extractTools/assets.json'))
            Object.keys(assets).forEach((assetname) => {
                let filepath = assetname
                if (filepath == '@comment') return
                if (filepath.indexOf("skyboxes") != -1) { /// skybox
                    filepath = `extractTools/${dir}/${filepath}`
                    filepath = filepath.slice(0, filepath.length - 4) + "_skybox.c"
                    let filedata = fs.readFileSync(filepath, "utf8")
                    filedata = filedata.replace(/\r/g, "")
                    let lines = filedata.split("\n")
                    lines = lines.filter(line => (line.length != 0) && (line[0] != '/'))
                    while (lines.length > 0) {
                        let section = lines.splice(0, 2)
                        if (section[0].slice(0, 24) == 'ALIGNED8 static const u8') {
                            const textureName = section[0].slice(25, section[0].length - 6)
                            const textureData = section[1].slice(0, section[1].indexOf('}'))
                            extractedData[textureName] = Buffer.from(textureData.split(','))
                        }
                    }
                } else {  /// not skybox
                    filepath = `extractTools/${dir}/${filepath}`
                    filepath = filepath.substring(0, filepath.length - 4)
                    const filedata = fs.readFileSync(filepath)
                    extractedData[assetname] = filedata
                }
            })
            fs.rmdirSync('extractTools/' + dir, { recursive: true })
            resolve(extractedData)
        } catch {
            console.log('Rom Extraction Fail')
            fs.rmdirSync('extractTools/' + dir, { recursive: true })
            resolve('Fail')
        }
    })
}
