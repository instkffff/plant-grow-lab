import { msgMaker } from '../../../mqtt/msgMaker.js'
import { mqttPublish, reqWrite } from '../../../mqtt/mqtt.js'

/**
 * 新风阀控制模块
 * @module airValve
 * @description 通过 MQTT 发布指令控制新风阀的开度。
 * @path w1 /NEWAIR/VALVE/W1 新风机1
 * @path w2 /NEWAIR/VALVE/W2 新风机2
 * @range F 0-10V 对应 0-10000
 */

/**
 * 控制新风阀的开度。
 * @param {string} valve - 阀门标识，如 "W1" 或 "W2"。
 * @param {number} F - 阀门开度值，范围 0–10000（对应 0–10V）。
 * @returns {void}
 */
function newAirValve(valve, F) {
    const msg = {
        node: "NEWAIR",
        group: "VALVE",
        tag: valve,
        value: F
    }
    const msgobj = msgMaker(msg)
    try {
        mqttPublish(reqWrite, JSON.stringify(msgobj))
    } catch (error) {
        console.error(`Error publishing message newAirValve (${valve}):`, error);
    }
}

export { newAirValve }