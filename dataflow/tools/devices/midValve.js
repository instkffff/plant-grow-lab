import { msgMaker } from '../../../mqtt/msgMaker.js'
import { mqttPublish, reqWrite } from '../../../mqtt/mqtt.js'

/**
 * 中间阀控制模块
 * @module midValve
 * @description 通过 MQTT 发布指令控制中间阀的开关状态。
 * @path /HEATDEHUM/S1/K3 中间阀开启（值 1001）
 * @path /HEATDEHUM/S1/K4 中间阀关闭（值 1001）
 */

/**
 * 控制指定中间阀的开关状态。
 * @param {string} group - 中间阀组标识，如 "S1"。
 * @param {number} state - 开关状态，1 为开启（使用标签 K3），0 为关闭（使用标签 K4）。
 * @returns {void}
 */
function midValve(group, state) {
    let tagName = ""
    if (state === 1) {
        tagName = "K3"
    } else if (state === 0) {
        tagName = "K4"
    } else {
        console.error(`Error: Invalid state (${state}) for midValve`);
        return;
    }
    const msg = {
        node: "HEATDEHUM",
        group: group,
        tag: tagName,
        value: 1001
    }
    const msgobj = msgMaker(msg)
    try {
        mqttPublish(reqWrite, JSON.stringify(msgobj))
    } catch (error) {
        console.error(`Error publishing message midValve:`, error);
    }
}

export { midValve }