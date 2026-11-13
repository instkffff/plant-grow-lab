import { SENSORENV, SENSORPLANT } from './trigger.js'
import { msgMaker } from '../mqtt/msgMaker.js'
import { mqttPublish, reqWrite } from '../mqtt/mqtt.js'

/* 
data example
{
    "node": "开关",
    "group": "switch1",
    "values": { "k1": 1, "k2": 2, "k3": 3, "k4": 4, "k5": 5 }
} */

function makeMsg(data, key, value) {
    return msgMaker({ node: "ENVSYSTEM", group: "ENV", tag: key, value })
}

function publish(msg) {
    mqttPublish(reqWrite, JSON.stringify(msg))
}

function syncEnv(data) {
    const map = { CO2: 'CO2', PA1: 'PA1', PA2: 'PA2', T1: 'T6', H1: 'H6', O2: 'O2' }
    for (const [src, dst] of Object.entries(map)) {
        if (data.values?.[src] !== undefined) {
            publish(makeMsg(data, dst, data.values[src]))
        }
    }
}

function syncPlant(data) {
    const groupNum = data.group?.replace('S', '')
    if (!groupNum) return
    const tKey = `T${groupNum}`
    const hKey = `H${groupNum}`
    for (const [key, val] of Object.entries(data.values ?? {})) {
        if (key === 'T') publish(makeMsg(data, tKey, val))
        else if (key === 'H') publish(makeMsg(data, hKey, val))
    }
}

function syncData(data) {
    if (SENSORENV(data)) syncEnv(data)
    if (SENSORPLANT(data)) syncPlant(data)
}

export { syncData }