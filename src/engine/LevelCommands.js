import { GeoLayoutInstance as GeoLayout } from "./GeoLayout"
import { AreaInstance as Area } from "../game/Area"
import { GameInstance as Game } from "../game/Game"
import * as Gbi from "../include/gbi"
import { GoddardRendererInstance as GoddardRenderer } from "../goddard/GoddardRenderer"
import { LevelUpdateInstance as LevelUpdate } from "../game/LevelUpdate"
import { init_graph_node_start } from "./graph_node"
import { ObjectListProcessorInstance as ObjectListProcessor } from "../game/ObjectListProcessor"

const SCRIPT_RUNNING = 1
const SCRIPT_PAUSED = 0
const SCRIPT_PAUSED2 = -1

class LevelCommands {

    constructor() {
        this.sScriptStatus = SCRIPT_PAUSED
        this.sDelayFrames = 0
        this.sCurrentScript = {}
        this.sRegister = null

        this.REGULAR_FACE = 0x0002
        this.DIZZY_FACE = 0x0003

        this.OP_AND  = 0
        this.OP_NAND = 1
        this.OP_EQ   = 2
        this.OP_NEQ  = 3
        this.OP_LT   = 4
        this.OP_LEQ  = 5
        this.OP_GT   = 6
        this.OP_GEQ  = 7

        this.OP_SET   =  0
        this.OP_GET   =  1

        this.VAR_CURR_SAVE_FILE_NUM  =  0
        this.VAR_CURR_COURSE_NUM     =  1
        this.VAR_CURR_ACT_NUM        =  2
        this.VAR_CURR_LEVEL_NUM      =  3
        this.VAR_CURR_AREA_INDEX     =  4

        this.sStackTop = []
    }

    init_level(args) {
        //console.log("init level")
        init_graph_node_start(null, GeoLayout.gObjParentGraphNode)
        ObjectListProcessor.clear_objects()
        Area.clear_areas()
        this.sCurrentScript.index++
    }

    load_mario_head(args) {
        GoddardRenderer.gdm_setup()
        GoddardRenderer.gdm_maketestdl(args[0])
        this.sCurrentScript.index++
    }

    sleep(args) {
        //console.log("sleep")
        this.sScriptStatus = SCRIPT_PAUSED

        if (this.sDelayFrames == 0) {
            this.sDelayFrames = args[0]
        } else if (--this.sDelayFrames == 0) {
            this.sCurrentScript.index++
            this.sScriptStatus = SCRIPT_RUNNING
        }
    }

    blackout(args) {
        //console.log("blackout")
        this.sCurrentScript.index++
    }

    set_register(args) {
        //console.log("set register")
        this.sRegister = args[0]
        this.sCurrentScript.index++
    }

    eval_script_op(op, arg) {
        switch (op) {
            case 0: return this.sRegister & arg
            case 1: return !(this.sRegister & arg)
            case 2: return this.sRegister == arg
            case 3: return this.sRegister != arg
            case 4: return this.sRegister < arg
            case 5: return this.sRegister <= arg
            case 6: return this.sRegister > arg
            case 7: return this.sRegister >= arg
        }

    }

    call(args) {
        const func = args[1]
        const funcClass = args[2]
        this.sRegister = func.call(funcClass, args[0], this.sRegister)
        this.sCurrentScript.index++
    }

    alloc_level_pool(args) {
        //console.log("alloc level pool")
        this.sCurrentScript.index++
    }

    free_level_pool(args) {
        this.sCurrentScript.index++
    }

    get_or_set(args) {
        if (args[0] == 0) { // SET
            switch (args[1]) {
                case 0: Area.gCurrSaveFileNum = this.sRegister; break
                case 1: Area.gCurrCourseNum = this.sRegister; break
                case 2: Area.gCurrActNum = this.sRegister; break
                case 3: Area.gCurrLevelNum = this.sRegister; break
                case 4: Area.gCurAreaIndex = this.sRegister; break
                case 5: LevelUpdate.gPressedStart = this.sRegister; break
            }
        } else {  // GET
            switch (args[1]) {
                case 0: this.sRegister = Area.gCurrSaveFileNum; break
                case 1: this.sRegister = Area.gCurrCourseNum; break
                case 2: this.sRegister = Area.gCurrActNum; break
                case 3: this.sRegister = Area.gCurrLevelNum; break
                case 4: this.sRegister = Area.gCurAreaIndex; break
                case 5: this.sRegister = LevelUpdate.gPressedStart; break
            }
        }
        this.sCurrentScript.index++
    }

    load_area(args) {
        const areaIndex = args[0]
        Area.load_area(areaIndex)
        this.sCurrentScript.index++
    }

    unload_area(args) {
        Area.clear_areas()
        //clear_area_graph_nodes -- call all node functions with init and clear command
        this.sCurrentScript.index++
    }

    begin_area(args) {
        //console.log("begin area")

        const areaIndex = args[0]
        const geoLayout = args[1]

        if (areaIndex < 8) {
            const screnArea = GeoLayout.process_geo_layout(geoLayout)

            this.sCurrAreaIndex = areaIndex
            screnArea.areaIndex = areaIndex
            Area.gAreas[areaIndex].geometryLayoutData = screnArea
            
        }

        this.sCurrentScript.index++
    }

    end_area(args) {
        this.sCurrAreaIndex = -1
        this.sCurrentScript.index++
    }

    transition(args) {

        if (Area.gCurrentArea) {
            Area.play_transition(args[0], args[1], args[2], args[3], args[4])
        }

        this.sCurrentScript.index++
    }

    cleardemoptr(args) {
        Game.gCurrDemoInput = null
        this.sCurrentScript.index++
    }

    execute(args) {
        this.start_new_script(args[0])
    }

    jump_link(args) {
        this.sStackTop.push({ script: this.sCurrentScript.commands, index: this.sCurrentScript.index++ })
        this.start_new_script(args[0])
    }

    jump_if(args) {
        if (this.eval_script_op(args[0], args[1]) != 0) {
            this.start_new_script(args[2])
        } else {
            this.sCurrentScript.index++
        }
    }

    start_new_script(level_script) {
        this.sCurrentScript.commands = level_script
        this.sCurrentScript.index = 0
    }

    level_script_execute() {
        this.sScriptStatus = SCRIPT_RUNNING

        while (this.sScriptStatus == SCRIPT_RUNNING) {
            const cmd = this.sCurrentScript.commands[this.sCurrentScript.index]
            console.log("running script command: " + cmd.command.name)
            cmd.command.call(this, cmd.args)
        }

        Game.init_render_image()
        Area.render_game()
        Game.end_master_display_list()

    }

}

export const LevelCommandsInstance = new LevelCommands()