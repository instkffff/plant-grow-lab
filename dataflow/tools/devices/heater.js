import { msgMaker } from '../../../mqtt/msgMaker.js'
import { mqttPublish, reqWrite } from '../../../mqtt/mqtt.js'

/* 
路径

系统包含 S1 -S2 2个加热器 示例路径为S1

/HEATDEHUM/S1/SV 设定温度 10-30℃ 10-30

/HEATDEHUM/S1/P 开启 12/关闭 22 

*/

function heaterSetT(group, temperature) {
    const msg = {
        node: "HEATDEHUM",
        group: group,
        tag: "SV",
        value: temperature
    }
    const msgobj = msgMaker(msg)
    try {
        mqttPublish(reqWrite, JSON.stringify(msgobj))
    } catch (error) {
        console.error("Error publishing message heaterSetT:", error);
    }
}

function heaterToggle(group, state) {
    const msg = {
        node: "HEATDEHUM",
        group: group,
        tag: "P",
        value: state
    }
    const msgobj = msgMaker(msg)
    try {
        mqttPublish(reqWrite, JSON.stringify(msgobj))
    } catch (error) {
        console.error("Error publishing message heaterToggle:", error);
    }
}

export { heaterSetT, heaterToggle }
