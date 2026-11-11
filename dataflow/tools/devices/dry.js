import { msgMaker } from '../../../mqtt/msgMaker.js'
import { mqttPublish, reqWrite } from '../../../mqtt/mqtt.js'

/**
 * 除湿器控制模块
 * @module dry
 * @description 通过 MQTT 发布指令控制除湿器的开关、湿度与温度设置。
 * @path /HEATDEHUM/S1/K 开启 1 / 关闭 0
 * @path /HEATDEHUM/S1/HSET 设置湿度 10–70%（对应值 10–70）
 * @path /HEATDEHUM/S1/TSET 设置温度 10–30℃（对应值 10–30）
 */

/**
 * 切换指定除湿器的开关状态。
 * @param {string} group - 除湿器组标识，如 "S1"。
 * @param {number} state - 开关状态，1 为开启，0 为关闭。
 * @returns {void}
 */
function dryToggle(group, state) {
    const msg = {
        node: "HEATDEHUM",
        group: group,
        tag: "K",
        value: state
    }
    const msgobj = msgMaker(msg)
    try {
        mqttPublish(reqWrite, JSON.stringify(msgobj))
    } catch (error) {
        console.error("Error publishing message dryOpen:", error);
    }
}

/**
 * 设置指定除湿器的目标湿度。
 * @param {string} group - 除湿器组标识，如 "S1"。
 * @param {number} humidity - 目标湿度值，范围 10–70（对应 10%–70%）。
 * @returns {void}
 */
function drySetH(group, humidity) {
    const msg = {
        node: "HEATDEHUM",
        group: group,
        tag: "HSET",
        value: humidity
    }
    const msgobj = msgMaker(msg)
    try {
        mqttPublish(reqWrite, JSON.stringify(msgobj))
    } catch (error) {
        console.error("Error publishing message drySetH:", error);
    }
}

/**
 * 设置指定除湿器的目标温度。
 * @param {string} group - 除湿器组标识，如 "S1"。
 * @param {number} temperature - 目标温度值，范围 10–30（对应 10℃–30℃）。
 * @returns {void}
 */
function drySetT(group, temperature) {
    const msg = {
        node: "HEATDEHUM",
        group: group,
        tag: "TSET",
        value: temperature
    }
    const msgobj = msgMaker(msg)
    try {
        mqttPublish(reqWrite, JSON.stringify(msgobj))
    } catch (error) {
        console.error("Error publishing message drySetT:", error);
    }
}

export { dryToggle, drySetH, drySetT }
