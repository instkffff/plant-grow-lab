import { msgMaker } from '../../../mqtt/msgMaker.js'
import { mqttPublish, reqWrite } from '../../../mqtt/mqtt.js'

/**
 * 制冷器控制模块
 * @module cooler
 * @description 通过 MQTT 发布指令控制制冷器的开关与温度设置。
 * @path COOLHUM/S1/OPEN 制冷器1 开
 * @path COOLHUM/S1/CLOSE 制冷器1 关
 * @path COOLHUM/S1/TSET 设置温度 10–30℃（对应值 10–30）
 */

/**
 * 打开指定制冷器。
 * @param {string} group - 制冷器组标识，如 "S1"。
 * @returns {void}
 */
function coolerOpen(group) {
    const msg = {
        node: "COOLHUM",
        group: group,
        tag: "OPEN",
        value: 1
    }
    const msgobj = msgMaker(msg)
    try {
        mqttPublish(reqWrite, JSON.stringify(msgobj))
    } catch (error) {
        console.error("Error publishing message coolerOpen:", error);
    }
}

/**
 * 关闭指定制冷器。
 * @param {string} group - 制冷器组标识，如 "S1"。
 * @returns {void}
 */
function coolerClose(group) {
    const msg = {
        node: "COOLHUM",
        group: group,
        tag: "ClOSE",
        value: 1
    }
    const msgobj = msgMaker(msg)
    try {
        mqttPublish(reqWrite, JSON.stringify(msgobj))
    } catch (error) {
        console.error("Error publishing message coolerClose:", error);
    }
}

/**
 * 设置指定制冷器的目标温度。
 * @param {string} group - 制冷器组标识，如 "S1"。
 * @param {number} temp - 目标温度值，范围 10–30（对应 10–30℃）。
 * @returns {void}
 */
function coolerSetTemp(group, temp) {
    const msg = {
        node: "COOLHUM",
        group: group,
        tag: "TSET",
        value: temp *10
    }
    const msgobj = msgMaker(msg)
    try {
        mqttPublish(reqWrite, JSON.stringify(msgobj))
    } catch (error) {
        console.error("Error publishing message coolerSetTemp:", error);
    }
}

export { coolerOpen, coolerClose, coolerSetTemp }