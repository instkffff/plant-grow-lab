import { msgMaker } from '../../../mqtt/msgMaker.js'
import { mqttPublish, reqWrite } from '../../../mqtt/mqtt.js'

/**
 * 加湿器控制模块
 * @module wet
 * @description 通过 MQTT 发布指令控制加湿器的开关、湿度设置及注水/放水操作。
 * @path /COOLHUM/S1/K 加湿器 开启 1 / 关闭 0
 * @path /COOLHUM/S1/HSET 加湿器 设置湿度 10–70%（对应值 10–70）
 * @path /COOLHUM/S1/K1 加湿器 注水
 * @path /COOLHUM/S1/K2 加湿器 放水
 */

/**
 * 切换指定加湿器的开关状态。
 * @param {string} group - 加湿器组标识，如 "S1"。
 * @param {number} state - 开关状态，1 为开启，0 为关闭。
 * @returns {void}
 */
function wetToggle(group, state) {
    const msg = {
        node: "COOLHUM",
        group: group,
        tag: "K",
        value: state
    }
    const msgobj = msgMaker(msg)
    try {
        mqttPublish(reqWrite, JSON.stringify(msgobj))
    } catch (error) {
        console.error(`Error publishing message wetToggle:`, error);
    }
}

/**
 * 设置指定加湿器的目标湿度。
 * @param {string} group - 加湿器组标识，如 "S1"。
 * @param {number} humidity - 目标湿度值，范围 10–70（对应 10%–70%）。
 * @returns {void}
 */
function wetSetH(group, humidity) {
    const msg = {
        node: "COOLHUM",
        group: group,
        tag: "HSET",
        value: humidity
    }
    const msgobj = msgMaker(msg)
    try {
        mqttPublish(reqWrite, JSON.stringify(msgobj))
    } catch (error) {
        console.error(`Error publishing message wetSetH:`, error);
    }
}

/**
 * 控制指定加湿器注水。
 * @param {string} group - 加湿器组标识，如 "S1"。
 * @param {number} state - 注水状态，1 为开启注水，0 为停止。
 * @returns {void}
 */
function wetAdd(group, state) {
    const msg = {
        node: "COOLHUM",
        group: group,
        tag: "K1",
        value: state
    }
    const msgobj = msgMaker(msg)
    try {
        mqttPublish(reqWrite, JSON.stringify(msgobj))
    } catch (error) {
        console.error(`Error publishing message wetAdd:`, error);
    }
}

/**
 * 控制指定加湿器放水。
 * @param {string} group - 加湿器组标识，如 "S1"。
 * @param {number} state - 放水状态，1 为开启放水，0 为停止。
 * @returns {void}
 */
function wetDrain(group, state) {
    const msg = {
        node: "COOLHUM",
        group: group,
        tag: "K2",
        value: state
    }
    const msgobj = msgMaker(msg)
    try {
        mqttPublish(reqWrite, JSON.stringify(msgobj))
    } catch (error) {
        console.error(`Error publishing message wetDrain:`, error);
    }
}

export { wetToggle, wetSetH, wetAdd, wetDrain }