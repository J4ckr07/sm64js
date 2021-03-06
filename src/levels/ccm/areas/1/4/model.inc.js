import * as Gbi from "../../../../../include/gbi"
import {
	snow_09000000,
	snow_09005800,
	snow_09006800,
	snow_09007000
} from "../../../../../textures/snow"

import { ccm_seg7_texture_07000000, ccm_seg7_texture_07000900 } from "../../../texture.inc"

const ccm_seg7_vertex_0700C438 = [
	{ pos: [ 2852, -1535, 2490 ], flag: 0, tc: [ 0, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 2811, -1317, 2304 ], flag: 0, tc: [ 992, -34 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 2839, -1331, 2507 ], flag: 0, tc: [ -30, -34 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1953, 2619, -58 ], flag: 0, tc: [ 990, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1995, 2926, -203 ], flag: 0, tc: [ 0, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1995, 2721, -203 ], flag: 0, tc: [ 0, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1953, 2824, -58 ], flag: 0, tc: [ 990, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1706, 2926, -492 ], flag: 0, tc: [ 0, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1706, 2721, -492 ], flag: 0, tc: [ 0, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1501, 2721, -492 ], flag: 0, tc: [ 990, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1501, 2926, -492 ], flag: 0, tc: [ 990, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3015, -1536, 2614 ], flag: 0, tc: [ 0, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3217, -1521, 2587 ], flag: 0, tc: [ 990, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3205, -1318, 2604 ], flag: 0, tc: [ 988, -30 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3002, -1332, 2631 ], flag: 0, tc: [ 0, -30 ], color: [ 255, 255, 255, 255 ] },
]

const ccm_seg7_vertex_0700C528 = [
	{ pos: [ 3794, -1345, 1829 ], flag: 0, tc: [ 990, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3754, -1126, 1643 ], flag: 0, tc: [ 0, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3782, -1141, 1845 ], flag: 0, tc: [ 990, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 2852, -1535, 2490 ], flag: 0, tc: [ 0, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 2824, -1521, 2288 ], flag: 0, tc: [ 990, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 2811, -1317, 2304 ], flag: 0, tc: [ 992, -34 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3401, -1344, 1530 ], flag: 0, tc: [ 990, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3591, -1126, 1519 ], flag: 0, tc: [ 0, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3388, -1140, 1546 ], flag: 0, tc: [ 990, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3603, -1330, 1503 ], flag: 0, tc: [ 0, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3766, -1330, 1627 ], flag: 0, tc: [ 0, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3520, -4591, -179 ], flag: 0, tc: [ 0, 0 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 3520, -4796, -179 ], flag: 0, tc: [ 0, 990 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 3690, -4854, -265 ], flag: 0, tc: [ 990, 990 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 3690, -4649, -265 ], flag: 0, tc: [ 990, 0 ], color: [ 153, 153, 153, 255 ] },
]

const ccm_seg7_vertex_0700C618 = [
	{ pos: [ 3132, -4591, -308 ], flag: 0, tc: [ 0, 0 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 3132, -4796, -308 ], flag: 0, tc: [ 0, 990 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 3045, -4875, -482 ], flag: 0, tc: [ 990, 990 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 3045, -4670, -482 ], flag: 0, tc: [ 990, 0 ], color: [ 153, 153, 153, 255 ] },
]

const ccm_seg7_vertex_0700C658 = [
	{ pos: [ -3292, -4505, 5501 ], flag: 0, tc: [ 0, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -3298, -4607, 5194 ], flag: 0, tc: [ 3034, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -3298, -4505, 5194 ], flag: 0, tc: [ 3034, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -4607, -4505, 4608 ], flag: 0, tc: [ 0, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -4607, -4607, 4608 ], flag: 0, tc: [ 0, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -3292, -4607, 5501 ], flag: 0, tc: [ 15838, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -3292, -4505, 5501 ], flag: 0, tc: [ 15838, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -4720, -4505, 3590 ], flag: 0, tc: [ -2970, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -4720, -4607, 3590 ], flag: 0, tc: [ -2970, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -4607, -4607, 4608 ], flag: 0, tc: [ 7248, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -4607, -4505, 4608 ], flag: 0, tc: [ 7248, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -3314, -4505, 4454 ], flag: 0, tc: [ -1410, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -3327, -4607, 3840 ], flag: 0, tc: [ 4720, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -3327, -4505, 3840 ], flag: 0, tc: [ 4720, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -3314, -4607, 4454 ], flag: 0, tc: [ -1410, 990 ], color: [ 255, 255, 255, 255 ] },
]

const ccm_seg7_vertex_0700C748 = [
	{ pos: [ 256, 1485, 2696 ], flag: 0, tc: [ -6830, -12 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 256, 1382, 2696 ], flag: 0, tc: [ -6830, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 2057, 1737, 2920 ], flag: 0, tc: [ 11624, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -3292, -4505, 5501 ], flag: 0, tc: [ 0, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -3292, -4607, 5501 ], flag: 0, tc: [ 0, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -3298, -4607, 5194 ], flag: 0, tc: [ 3034, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 256, 1485, 2696 ], flag: 0, tc: [ 30466, -28 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -3235, 1148, 1509 ], flag: 0, tc: [ -6498, -28 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -3235, 1045, 1509 ], flag: 0, tc: [ -6496, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 256, 1382, 2696 ], flag: 0, tc: [ 30468, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -50, 1280, 2048 ], flag: 0, tc: [ 21846, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -3071, 1142, 1024 ], flag: 0, tc: [ -10070, -30 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -3071, 1040, 1024 ], flag: 0, tc: [ -10080, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -50, 1382, 2048 ], flag: 0, tc: [ 21856, -30 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 2057, 1840, 2920 ], flag: 0, tc: [ 11624, -12 ], color: [ 255, 255, 255, 255 ] },
]

const ccm_seg7_vertex_0700C838 = [
	{ pos: [ 3604, 2304, -2928 ], flag: 0, tc: [ 6100, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3604, 2406, -2928 ], flag: 0, tc: [ 6100, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 4096, 2406, -2559 ], flag: 0, tc: [ 0, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 4096, 2304, -2559 ], flag: 0, tc: [ 0, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 4096, 2192, -1038 ], flag: 0, tc: [ 15286, -22 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 4096, 2406, -2559 ], flag: 0, tc: [ -42, -22 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 4096, 2090, -1038 ], flag: 0, tc: [ 15298, 990 ], color: [ 255, 255, 255, 255 ] },
]

const ccm_seg7_vertex_0700C8A8 = [
	{ pos: [ 2845, -1433, 2499 ], flag: 0, tc: [ 5078, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 2228, -1535, 3309 ], flag: 0, tc: [ 0, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 2391, -1535, 3433 ], flag: 0, tc: [ 0, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -2429, 2867, -636 ], flag: 0, tc: [ 0, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1995, 2824, -203 ], flag: 0, tc: [ 2012, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1706, 2824, -492 ], flag: 0, tc: [ 2012, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -2139, 2867, -926 ], flag: 0, tc: [ 0, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -3327, -1535, 3840 ], flag: 0, tc: [ -36, -36 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -3323, -1535, 4045 ], flag: 0, tc: [ 0, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1386, -1637, 4683 ], flag: 0, tc: [ 10154, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1407, -1637, 4480 ], flag: 0, tc: [ 10062, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1386, -1637, 4683 ], flag: 0, tc: [ -82, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 768, -1535, 5118 ], flag: 0, tc: [ 11216, -2 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1407, -1637, 4480 ], flag: 0, tc: [ -98, -36 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 805, -1535, 5320 ], flag: 0, tc: [ 11318, 990 ], color: [ 255, 255, 255, 255 ] },
]

const ccm_seg7_vertex_0700C998 = [
	{ pos: [ 4262, -1228, 975 ], flag: 0, tc: [ 0, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3605, -1228, 1500 ], flag: 0, tc: [ 3034, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3768, -1228, 1624 ], flag: 0, tc: [ 3034, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 2845, -1433, 2499 ], flag: 0, tc: [ 5078, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 2391, -1535, 3433 ], flag: 0, tc: [ 0, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3008, -1434, 2622 ], flag: 0, tc: [ 5078, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 4099, -1228, 851 ], flag: 0, tc: [ 0, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 2744, -4694, 857 ], flag: 0, tc: [ 0, 0 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 3132, -4694, 986 ], flag: 0, tc: [ 0, 990 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 3520, -4694, -179 ], flag: 0, tc: [ 3034, 990 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 3132, -4694, -308 ], flag: 0, tc: [ 3034, 0 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 4134, -4607, 1535 ], flag: 0, tc: [ 0, 0 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 3068, -4694, 1181 ], flag: 0, tc: [ 2012, 0 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 2938, -4694, 1569 ], flag: 0, tc: [ 2012, 990 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 4005, -4607, 1923 ], flag: 0, tc: [ 0, 990 ], color: [ 153, 153, 153, 255 ] },
]

const ccm_seg7_vertex_0700CA88 = [
	{ pos: [ -3323, -1433, 4045 ], flag: 0, tc: [ 0, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1386, -1740, 4683 ], flag: 0, tc: [ 10154, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1386, -1535, 4683 ], flag: 0, tc: [ 10156, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 805, -1433, 5320 ], flag: 0, tc: [ -1174, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 2566, -2405, 3621 ], flag: 0, tc: [ 7354, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 2566, -2201, 3621 ], flag: 0, tc: [ 7356, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 805, -1637, 5320 ], flag: 0, tc: [ -1176, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -3327, -1433, 3840 ], flag: 0, tc: [ 0, -30 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -3327, -1637, 3840 ], flag: 0, tc: [ 0, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1407, -1740, 4480 ], flag: 0, tc: [ 10080, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1407, -1535, 4480 ], flag: 0, tc: [ 10080, -30 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1407, -1740, 4480 ], flag: 0, tc: [ -1006, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 768, -1637, 5118 ], flag: 0, tc: [ 10320, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 768, -1433, 5118 ], flag: 0, tc: [ 10366, -30 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1407, -1535, 4480 ], flag: 0, tc: [ -960, -30 ], color: [ 255, 255, 255, 255 ] },
]

const ccm_seg7_vertex_0700CB78 = [
	{ pos: [ -2139, 2970, -926 ], flag: 0, tc: [ 0, -30 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -2139, 2765, -926 ], flag: 0, tc: [ 0, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1706, 2721, -492 ], flag: 0, tc: [ 3034, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -3323, -1433, 4045 ], flag: 0, tc: [ 0, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -3323, -1637, 4045 ], flag: 0, tc: [ 0, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1386, -1740, 4683 ], flag: 0, tc: [ 10154, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1386, -1740, 4683 ], flag: 0, tc: [ 0, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 805, -1637, 5320 ], flag: 0, tc: [ 11372, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 805, -1433, 5320 ], flag: 0, tc: [ 11378, -30 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1386, -1535, 4683 ], flag: 0, tc: [ -26, -30 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -2429, 2970, -636 ], flag: 0, tc: [ -30, -30 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1995, 2721, -203 ], flag: 0, tc: [ 3034, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1995, 2926, -203 ], flag: 0, tc: [ 3036, -30 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -2429, 2765, -636 ], flag: 0, tc: [ 0, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1706, 2926, -492 ], flag: 0, tc: [ 3032, -30 ], color: [ 255, 255, 255, 255 ] },
]

const ccm_seg7_vertex_0700CC68 = [
	{ pos: [ 3754, -1126, 1643 ], flag: 0, tc: [ 4158, -26 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 4262, -1330, 975 ], flag: 0, tc: [ 0, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 4262, -1125, 975 ], flag: 0, tc: [ 0, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 2385, -1433, 3441 ], flag: 0, tc: [ 0, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3015, -1536, 2614 ], flag: 0, tc: [ 5078, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3002, -1332, 2631 ], flag: 0, tc: [ 5078, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 2398, -1637, 3425 ], flag: 0, tc: [ 0, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 2222, -1433, 3317 ], flag: 0, tc: [ 0, -34 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 2852, -1535, 2490 ], flag: 0, tc: [ 5078, 988 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 2839, -1331, 2507 ], flag: 0, tc: [ 5078, -34 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 2235, -1637, 3301 ], flag: 0, tc: [ 0, 988 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3591, -1126, 1519 ], flag: 0, tc: [ 4158, -28 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3603, -1330, 1503 ], flag: 0, tc: [ 4056, 988 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 4099, -1330, 851 ], flag: 0, tc: [ 0, 988 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 4099, -1125, 851 ], flag: 0, tc: [ 0, -34 ], color: [ 255, 255, 255, 255 ] },
]

const ccm_seg7_vertex_0700CD58 = [
	{ pos: [ -4360, -1842, 5999 ], flag: 0, tc: [ -1630, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -4360, -1945, 5999 ], flag: 0, tc: [ -1630, 480 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -3892, -1945, 6605 ], flag: 0, tc: [ 2190, 480 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3754, -1126, 1643 ], flag: 0, tc: [ 4158, -26 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3766, -1330, 1627 ], flag: 0, tc: [ 4056, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 4262, -1330, 975 ], flag: 0, tc: [ 0, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -6398, -1637, 3943 ], flag: 0, tc: [ 7182, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -6398, -1740, 3943 ], flag: 0, tc: [ 7182, 480 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -5387, -1740, 4976 ], flag: 0, tc: [ 0, 478 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -5387, -1637, 4976 ], flag: 0, tc: [ 0, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -5387, -1637, 4976 ], flag: 0, tc: [ 6954, -26 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -5387, -1740, 4976 ], flag: 0, tc: [ 6918, 478 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -4360, -1945, 5999 ], flag: 0, tc: [ -386, 478 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -4360, -1842, 5999 ], flag: 0, tc: [ -348, -26 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -3892, -1842, 6605 ], flag: 0, tc: [ 2190, 0 ], color: [ 255, 255, 255, 255 ] },
]

const ccm_seg7_vertex_0700CE48 = [
	{ pos: [ 4005, -4505, 1923 ], flag: 0, tc: [ 990, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3682, -4505, 2895 ], flag: 0, tc: [ -4118, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3682, -4607, 2895 ], flag: 0, tc: [ -4118, 478 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 4005, -4607, 1923 ], flag: 0, tc: [ 990, 480 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 5000, -4504, -1074 ], flag: 0, tc: [ 12870, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 4134, -4505, 1535 ], flag: 0, tc: [ -850, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 4134, -4607, 1535 ], flag: 0, tc: [ -850, 478 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 5039, -4607, -1191 ], flag: 0, tc: [ 13484, 480 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3067, -4584, 1181 ], flag: 0, tc: [ 3036, -30 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 3067, -4789, 1181 ], flag: 0, tc: [ 3034, 990 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 4134, -4709, 1535 ], flag: 0, tc: [ 0, 990 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 4005, -4709, 1923 ], flag: 0, tc: [ 0, 990 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 2938, -4584, 1569 ], flag: 0, tc: [ 3032, -30 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 4005, -4505, 1923 ], flag: 0, tc: [ 0, -30 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 2938, -4789, 1569 ], flag: 0, tc: [ 3034, 990 ], color: [ 153, 153, 153, 255 ] },
]

const ccm_seg7_vertex_0700CF38 = [
	{ pos: [ 2744, -4592, 857 ], flag: 0, tc: [ 0, -30 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 2744, -4796, 857 ], flag: 0, tc: [ 0, 990 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 3132, -4796, -308 ], flag: 0, tc: [ 6100, 990 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 3132, -4591, -308 ], flag: 0, tc: [ 6100, -30 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 3132, -4591, 986 ], flag: 0, tc: [ 0, 0 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 3520, -4796, -179 ], flag: 0, tc: [ 6100, 990 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 3520, -4591, -179 ], flag: 0, tc: [ 6100, 0 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 3132, -4796, 986 ], flag: 0, tc: [ 0, 990 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 3067, -4584, 1181 ], flag: 0, tc: [ 3036, -30 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 4134, -4709, 1535 ], flag: 0, tc: [ 0, 990 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 4134, -4505, 1535 ], flag: 0, tc: [ -30, -30 ], color: [ 153, 153, 153, 255 ] },
]

const ccm_seg7_vertex_0700CFE8 = [
	{ pos: [ -1995, 2824, -203 ], flag: 0, tc: [ 0, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1727, 2670, 65 ], flag: 0, tc: [ 1330, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1437, 2670, -224 ], flag: 0, tc: [ 1330, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -1706, 2824, -492 ], flag: 0, tc: [ 0, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 2845, -1433, 2499 ], flag: 0, tc: [ 0, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3124, -1507, 2470 ], flag: 0, tc: [ 990, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 2961, -1506, 2346 ], flag: 0, tc: [ 990, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3008, -1434, 2622 ], flag: 0, tc: [ 0, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3500, -1337, 1638 ], flag: 0, tc: [ 990, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3663, -1337, 1762 ], flag: 0, tc: [ 990, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3768, -1228, 1624 ], flag: 0, tc: [ 0, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3605, -1228, 1500 ], flag: 0, tc: [ 0, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 3132, -4694, -308 ], flag: 0, tc: [ 0, -30 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 3520, -4694, -179 ], flag: 0, tc: [ 0, 990 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 3238, -4920, -632 ], flag: 0, tc: [ 990, 0 ], color: [ 153, 153, 153, 255 ] },
	{ pos: [ 3627, -4920, -503 ], flag: 0, tc: [ 990, 990 ], color: [ 153, 153, 153, 255 ] },
]

const ccm_seg7_vertex_0700D0E8 = [
	{ pos: [ 768, -1074, -4453 ], flag: 0, tc: [ 0, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -5119, -2047, -5375 ], flag: 0, tc: [ 24100, 0 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ -5119, -1842, -5375 ], flag: 0, tc: [ 24096, 990 ], color: [ 255, 255, 255, 255 ] },
	{ pos: [ 768, -1279, -4453 ], flag: 0, tc: [ -28, 0 ], color: [ 255, 255, 255, 255 ] },
]

export const ccm_seg7_dl_0700D128 = [
	Gbi.gsDPSetTextureImage(Gbi.G_IM_FMT_RGBA, Gbi.G_IM_SIZ_16b, 1, ccm_seg7_texture_07000900),
	Gbi.gsDPLoadBlock(Gbi.G_TX_LOADTILE, 0, 0, 32 * 32 - 1),
	Gbi.gsSPVertex(ccm_seg7_vertex_0700C438, 15, 0),
	...Gbi.gsSP2Triangles( 0,  1,  2, 0x0,  3,  4,  5, 0x0),
	...Gbi.gsSP2Triangles( 3,  6,  4, 0x0,  7,  8,  9, 0x0),
	...Gbi.gsSP2Triangles( 7,  9, 10, 0x0, 11, 12, 13, 0x0),
	Gbi.gsSP1Triangle(11, 13, 14, 0x0),
	Gbi.gsSPVertex(ccm_seg7_vertex_0700C528, 15, 0),
	...Gbi.gsSP2Triangles( 0,  1,  2, 0x0,  3,  4,  5, 0x0),
	...Gbi.gsSP2Triangles( 6,  7,  8, 0x0,  6,  9,  7, 0x0),
	...Gbi.gsSP2Triangles( 0, 10,  1, 0x0, 11, 12, 13, 0x0),
	Gbi.gsSP1Triangle(11, 13, 14, 0x0),
	Gbi.gsSPVertex(ccm_seg7_vertex_0700C618, 4, 0),
	...Gbi.gsSP2Triangles( 0,  1,  2, 0x0,  0,  2,  3, 0x0),
	Gbi.gsSPEndDisplayList(),
]

export const ccm_seg7_dl_0700D1E0 = [
	Gbi.gsDPSetTextureImage(Gbi.G_IM_FMT_RGBA, Gbi.G_IM_SIZ_16b, 1, snow_09005800),
	Gbi.gsDPLoadBlock(Gbi.G_TX_LOADTILE, 0, 0, 32 * 32 - 1),
	Gbi.gsSPVertex(ccm_seg7_vertex_0700C658, 15, 0),
	...Gbi.gsSP2Triangles( 0,  1,  2, 0x0,  3,  4,  5, 0x0),
	...Gbi.gsSP2Triangles( 3,  5,  6, 0x0,  7,  8,  9, 0x0),
	...Gbi.gsSP2Triangles( 7,  9, 10, 0x0, 11, 12, 13, 0x0),
	Gbi.gsSP1Triangle(11, 14, 12, 0x0),
	Gbi.gsSPVertex(ccm_seg7_vertex_0700C748, 15, 0),
	...Gbi.gsSP2Triangles( 0,  1,  2, 0x0,  3,  4,  5, 0x0),
	...Gbi.gsSP2Triangles( 6,  7,  8, 0x0,  9,  6,  8, 0x0),
	...Gbi.gsSP2Triangles(10, 11, 12, 0x0, 10, 13, 11, 0x0),
	Gbi.gsSP1Triangle( 0,  2, 14, 0x0),
	Gbi.gsSPVertex(ccm_seg7_vertex_0700C838, 7, 0),
	...Gbi.gsSP2Triangles( 0,  1,  2, 0x0,  0,  2,  3, 0x0),
	...Gbi.gsSP2Triangles( 4,  3,  5, 0x0,  4,  6,  3, 0x0),
	Gbi.gsSPEndDisplayList(),
]

export const ccm_seg7_dl_0700D2A8 = [
	Gbi.gsDPSetTextureImage(Gbi.G_IM_FMT_RGBA, Gbi.G_IM_SIZ_16b, 1, snow_09000000),
	Gbi.gsDPLoadBlock(Gbi.G_TX_LOADTILE, 0, 0, 32 * 32 - 1),
	Gbi.gsSPVertex(ccm_seg7_vertex_0700C8A8, 15, 0),
	...Gbi.gsSP2Triangles( 0,  1,  2, 0x0,  3,  4,  5, 0x0),
	...Gbi.gsSP2Triangles( 3,  5,  6, 0x0,  7,  8,  9, 0x0),
	...Gbi.gsSP2Triangles( 7,  9, 10, 0x0, 11, 12, 13, 0x0),
	Gbi.gsSP1Triangle(11, 14, 12, 0x0),
	Gbi.gsSPVertex(ccm_seg7_vertex_0700C998, 15, 0),
	...Gbi.gsSP2Triangles( 0,  1,  2, 0x0,  3,  4,  5, 0x0),
	...Gbi.gsSP2Triangles( 0,  6,  1, 0x0,  7,  8,  9, 0x0),
	...Gbi.gsSP2Triangles( 7,  9, 10, 0x0, 11, 12, 13, 0x0),
	Gbi.gsSP1Triangle(11, 13, 14, 0x0),
	Gbi.gsSPEndDisplayList(),
]

export const ccm_seg7_dl_0700D348 = [
	Gbi.gsDPSetTextureImage(Gbi.G_IM_FMT_RGBA, Gbi.G_IM_SIZ_16b, 1, snow_09006800),
	Gbi.gsDPLoadBlock(Gbi.G_TX_LOADTILE, 0, 0, 32 * 32 - 1),
	Gbi.gsSPVertex(ccm_seg7_vertex_0700CA88, 15, 0),
	...Gbi.gsSP2Triangles( 0,  1,  2, 0x0,  3,  4,  5, 0x0),
	...Gbi.gsSP2Triangles( 3,  6,  4, 0x0,  7,  8,  9, 0x0),
	...Gbi.gsSP2Triangles( 7,  9, 10, 0x0, 11, 12, 13, 0x0),
	Gbi.gsSP1Triangle(11, 13, 14, 0x0),
	Gbi.gsSPVertex(ccm_seg7_vertex_0700CB78, 15, 0),
	...Gbi.gsSP2Triangles( 0,  1,  2, 0x0,  3,  4,  5, 0x0),
	...Gbi.gsSP2Triangles( 6,  7,  8, 0x0,  6,  8,  9, 0x0),
	...Gbi.gsSP2Triangles(10, 11, 12, 0x0, 10, 13, 11, 0x0),
	Gbi.gsSP1Triangle( 0,  2, 14, 0x0),
	Gbi.gsSPVertex(ccm_seg7_vertex_0700CC68, 15, 0),
	...Gbi.gsSP2Triangles( 0,  1,  2, 0x0,  3,  4,  5, 0x0),
	...Gbi.gsSP2Triangles( 3,  6,  4, 0x0,  7,  8,  9, 0x0),
	...Gbi.gsSP2Triangles( 7, 10,  8, 0x0, 11, 12, 13, 0x0),
	Gbi.gsSP1Triangle(11, 13, 14, 0x0),
	Gbi.gsSPVertex(ccm_seg7_vertex_0700CD58, 15, 0),
	...Gbi.gsSP2Triangles( 0,  1,  2, 0x0,  3,  4,  5, 0x0),
	...Gbi.gsSP2Triangles( 6,  7,  8, 0x0,  6,  8,  9, 0x0),
	...Gbi.gsSP2Triangles(10, 11, 12, 0x0, 10, 12, 13, 0x0),
	Gbi.gsSP1Triangle( 0,  2, 14, 0x0),
	Gbi.gsSPVertex(ccm_seg7_vertex_0700CE48, 15, 0),
	...Gbi.gsSP2Triangles( 0,  1,  2, 0x0,  0,  2,  3, 0x0),
	...Gbi.gsSP2Triangles( 4,  5,  6, 0x0,  7,  4,  6, 0x0),
	...Gbi.gsSP2Triangles( 8,  9, 10, 0x0, 11, 12, 13, 0x0),
	Gbi.gsSP1Triangle(11, 14, 12, 0x0),
	Gbi.gsSPVertex(ccm_seg7_vertex_0700CF38, 11, 0),
	...Gbi.gsSP2Triangles( 0,  1,  2, 0x0,  0,  2,  3, 0x0),
	...Gbi.gsSP2Triangles( 4,  5,  6, 0x0,  4,  7,  5, 0x0),
	Gbi.gsSP1Triangle( 8,  9, 10, 0x0),
	Gbi.gsSPEndDisplayList(),
]

export const ccm_seg7_dl_0700D4D8 = [
	Gbi.gsDPSetTextureImage(Gbi.G_IM_FMT_RGBA, Gbi.G_IM_SIZ_16b, 1, ccm_seg7_texture_07000000),
	Gbi.gsDPLoadBlock(Gbi.G_TX_LOADTILE, 0, 0, 32 * 32 - 1),
	Gbi.gsSPVertex(ccm_seg7_vertex_0700CFE8, 16, 0),
	...Gbi.gsSP2Triangles( 0,  1,  2, 0x0,  0,  2,  3, 0x0),
	...Gbi.gsSP2Triangles( 4,  5,  6, 0x0,  4,  7,  5, 0x0),
	...Gbi.gsSP2Triangles( 8,  9, 10, 0x0,  8, 10, 11, 0x0),
	...Gbi.gsSP2Triangles(12, 13, 14, 0x0, 13, 15, 14, 0x0),
	Gbi.gsSPEndDisplayList(),
]

export const ccm_seg7_dl_0700D540 = [
	Gbi.gsDPSetTextureImage(Gbi.G_IM_FMT_RGBA, Gbi.G_IM_SIZ_16b, 1, snow_09007000),
	Gbi.gsDPLoadBlock(Gbi.G_TX_LOADTILE, 0, 0, 64 * 32 - 1),
	Gbi.gsSPVertex(ccm_seg7_vertex_0700D0E8, 4, 0),
	...Gbi.gsSP2Triangles( 0,  1,  2, 0x0,  0,  3,  1, 0x0),
	Gbi.gsSPEndDisplayList(),
]

export const ccm_seg7_dl_0700D578 = [
	Gbi.gsDPSetCombineMode(Gbi.G_CC_DECALRGBA),
	Gbi.gsSPClearGeometryMode(Gbi.G_LIGHTING | Gbi.G_CULL_BACK),
	Gbi.gsDPSetTile(Gbi.G_IM_FMT_RGBA, Gbi.G_IM_SIZ_16b, 0, 0, Gbi.G_TX_LOADTILE, 0, Gbi.G_TX_WRAP | Gbi.G_TX_NOMIRROR, Gbi.G_TX_NOMASK, Gbi.G_TX_NOLOD, Gbi.G_TX_WRAP | Gbi.G_TX_NOMIRROR, Gbi.G_TX_NOMASK, Gbi.G_TX_NOLOD),
	Gbi.gsSPTexture(0xFFFF, 0xFFFF, 0, Gbi.G_TX_RENDERTILE, Gbi.G_ON),
	Gbi.gsDPSetTile(Gbi.G_IM_FMT_RGBA, Gbi.G_IM_SIZ_16b, 8, 0, Gbi.G_TX_RENDERTILE, 0, Gbi.G_TX_WRAP | Gbi.G_TX_NOMIRROR, 5, Gbi.G_TX_NOLOD, Gbi.G_TX_CLAMP, 5, Gbi.G_TX_NOLOD),
	Gbi.gsDPSetTileSize(0, 0, 0, (32 - 1) << Gbi.G_TEXTURE_IMAGE_FRAC, (32 - 1) << Gbi.G_TEXTURE_IMAGE_FRAC),
	Gbi.gsSPDisplayList(ccm_seg7_dl_0700D128),
	Gbi.gsDPSetTile(Gbi.G_IM_FMT_RGBA, Gbi.G_IM_SIZ_16b, 8, 0, Gbi.G_TX_RENDERTILE, 0, Gbi.G_TX_CLAMP, 5, Gbi.G_TX_NOLOD, Gbi.G_TX_WRAP | Gbi.G_TX_NOMIRROR, 5, Gbi.G_TX_NOLOD),
	Gbi.gsDPSetTileSize(0, 0, 0, (32 - 1) << Gbi.G_TEXTURE_IMAGE_FRAC, (32 - 1) << Gbi.G_TEXTURE_IMAGE_FRAC),
	Gbi.gsSPDisplayList(ccm_seg7_dl_0700D1E0),
	Gbi.gsSPDisplayList(ccm_seg7_dl_0700D2A8),
	Gbi.gsSPDisplayList(ccm_seg7_dl_0700D348),
	Gbi.gsDPSetTile(Gbi.G_IM_FMT_RGBA, Gbi.G_IM_SIZ_16b, 8, 0, Gbi.G_TX_RENDERTILE, 0, Gbi.G_TX_CLAMP, 5, Gbi.G_TX_NOLOD, Gbi.G_TX_CLAMP, 5, Gbi.G_TX_NOLOD),
	Gbi.gsDPSetTileSize(0, 0, 0, (32 - 1) << Gbi.G_TEXTURE_IMAGE_FRAC, (32 - 1) << Gbi.G_TEXTURE_IMAGE_FRAC),
	Gbi.gsSPDisplayList(ccm_seg7_dl_0700D4D8),
	Gbi.gsDPSetTile(Gbi.G_IM_FMT_RGBA, Gbi.G_IM_SIZ_16b, 16, 0, Gbi.G_TX_RENDERTILE, 0, Gbi.G_TX_CLAMP, 5, Gbi.G_TX_NOLOD, Gbi.G_TX_WRAP | Gbi.G_TX_NOMIRROR, 6, Gbi.G_TX_NOLOD),
	Gbi.gsDPSetTileSize(0, 0, 0, (64 - 1) << Gbi.G_TEXTURE_IMAGE_FRAC, (32 - 1) << Gbi.G_TEXTURE_IMAGE_FRAC),
	Gbi.gsSPDisplayList(ccm_seg7_dl_0700D540),
	Gbi.gsSPTexture(0xFFFF, 0xFFFF, 0, Gbi.G_TX_RENDERTILE, Gbi.G_OFF),
	Gbi.gsDPSetCombineMode(Gbi.G_CC_SHADE),
	Gbi.gsSPSetGeometryMode(Gbi.G_LIGHTING | Gbi.G_CULL_BACK),
	Gbi.gsSPEndDisplayList(),
]

