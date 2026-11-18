/* {
    "func": "bridge",
    "node": "PLANT",
    "group": "G11",
    "tag": "K",
    "value": 0,
} 
*/

/* 
data example
{
    "node": "开关",
    "group": "switch1",
    "values": { "k1": 1, "k2": 2, "k3": 3, "k4": 4, "k5": 5 }
} 
*/

import { LightID, LightMode, LightK, LightR, LightB, LightW } from './trigger.js'
import { emitter } from '../ws/bridgeEvent.js'


function msgBridge( data, tag ) {
    const res = {
        func: "bridge",
        node: data.node,
        group: data.group,
        tag: tag,
        value: data.values[tag],
    }
    emitter.emit("bridge", res)
}

function lightBridge(data) {
    if (LightK(data)) {
        msgBridge(data, "K")
    }
    if (LightR(data)) {
        msgBridge(data, "R")
    }
    if (LightB(data)) {
        msgBridge(data, "B")
    }
    if (LightW(data)) {
        msgBridge(data, "W")
    }
    if (LightMode(data)) {
        msgBridge(data, "MODE")
    }
    if (LightID(data)) {
        msgBridge(data, "ID")
    }
}

export { lightBridge }
