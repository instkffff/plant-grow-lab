import { SYSSTART } from './trigger.js'
import { msgMaker } from '../mqtt/msgMaker.js'
import { mqttPublish, reqWrite } from '../mqtt/mqtt.js'
import { getValue, getRow } from '../sqlite/read.js'

/* 
data example
{
    "node": "开关",
    "group": "switch1",
    "values": { "k1": 1, "k2": 2, "k3": 3, "k4": 4, "k5": 5 }
} */

// console.log(getValue('System1', 'valve1', 'windSet'));

/* { node: "ENVSYSTEM", group: "ENV", tag: key, value } */

function getSystemSetting() {
    const TSET = getValue('ENVSYSTEM', 'SETTING', 'TSET')
    const HSET = getValue('ENVSYSTEM', 'SETTING', 'HSET')
    const F = getValue('ENVSYSTEM', 'SETTING', 'F')
    return { TSET, HSET, F }
}

function valveSET (F) {
    const msg1 = {
        node: "NEWAIR",
        group: "VALVE",
        tag: "W1",
        value: F
    }
    const msg2 = {
        node: "NEWAIR",
        group: "VALVE",
        tag: "W2",
        value: F
    }

    const msg1obj = msgMaker(msg1)
    const msg2obj = msgMaker(msg2)

    mqttPublish( reqWrite, JSON.stringify(msg1obj) )
    mqttPublish( reqWrite, JSON.stringify(msg2obj) )
}

function coolOPEN () {
    const msg1 = {
        node: "COOLHUM",
        group: "S1",
        tag: "OPEN",
        value: 1
    }
    const msg2 = {
        node: "COOLHUM",
        group: "S2",
        tag: "OPEN",
        value: 1
    }
    const msg3 = {
        node: "COOLHUM",
        group: "S3",
        tag: "OPEN",
        value: 1
    }
    const msg4 = {
        node: "COOLHUM",
        group: "S4",
        tag: "OPEN",
        value: 1
    }
    const msg5 = {
        node: "COOLHUM",
        group: "S5",
        tag: "OPEN",
        value: 1
    }

    const msg1obj = msgMaker(msg1)
    const msg2obj = msgMaker(msg2)
    const msg3obj = msgMaker(msg3)
    const msg4obj = msgMaker(msg4)
    const msg5obj = msgMaker(msg5)

    mqttPublish( reqWrite, JSON.stringify(msg1obj) )
    mqttPublish( reqWrite, JSON.stringify(msg2obj) )
    mqttPublish( reqWrite, JSON.stringify(msg3obj) )
    mqttPublish( reqWrite, JSON.stringify(msg4obj) )
    mqttPublish( reqWrite, JSON.stringify(msg5obj) )
}

function heaterOpen () {
    const msg1 = {
        node: "HEATDEHUM",
        group: "S1",
        tag: "P",
        value: 12
    }
    
    const msg2 = {
        node: "HEATDEHUM",
        group: "S2",
        tag: "P",
        value: 12
    }

    const msg1obj = msgMaker(msg1)
    const msg2obj = msgMaker(msg2)

    mqttPublish( reqWrite, JSON.stringify(msg1obj) )
    mqttPublish( reqWrite, JSON.stringify(msg2obj) )
}

function dehumOpen () {
    const msg1 = {
        node: "HEATDEHUM",
        group: "S1",
        tag: "K",
        value: 1
    }
    const msg2 = {
        node: "HEATDEHUM",
        group: "S2",
        tag: "K",
        value: 1
    }

    const msg1obj = msgMaker(msg1)
    const msg2obj = msgMaker(msg2)

    mqttPublish( reqWrite, JSON.stringify(msg1obj) )
    mqttPublish( reqWrite, JSON.stringify(msg2obj) )
}

function wetOpen () {
    const msg1 = {
        node: "COOLHUM",
        group: "S1",
        tag: "K",
        value: 1
    }
    const msg2 = {
        node: "COOLHUM",
        group: "S2",
        tag: "K",
        value: 1
    }
    const msg3 = {
        node: "COOLHUM",
        group: "S3",
        tag: "K",
        value: 1
    }
    const msg4 = {
        node: "COOLHUM",
        group: "S4",
        tag: "K",
        value: 1
    }
    const msg5 = {
        node: "COOLHUM",
        group: "S5",
        tag: "K",
        value: 1
    }

    const msg1obj = msgMaker(msg1)
    const msg2obj = msgMaker(msg2)
    const msg3obj = msgMaker(msg3)
    const msg4obj = msgMaker(msg4)
    const msg5obj = msgMaker(msg5)

    mqttPublish( reqWrite, JSON.stringify(msg1obj) )
    mqttPublish( reqWrite, JSON.stringify(msg2obj) )
    mqttPublish( reqWrite, JSON.stringify(msg3obj) )
    mqttPublish( reqWrite, JSON.stringify(msg4obj) )
    mqttPublish( reqWrite, JSON.stringify(msg5obj) )
}
    
function partValveOpen () {
    const msg1 = {
        node: "HEATDEHUM",
        group: "S1",
        tag: "K3",
        value: 1
    }
    const msg2 = {
        node: "HEATDEHUM",
        group: "S2",
        tag: "K3",
        value: 1
    }

    const msg1obj = msgMaker(msg1)
    const msg2obj = msgMaker(msg2)

    mqttPublish( reqWrite, JSON.stringify(msg1obj) )
    mqttPublish( reqWrite, JSON.stringify(msg2obj) )
}

function systemStart(data) {
    if ( SYSSTART(data) ){
        if ( data.values.KS === 1 ){
            // 系统启动
            const { TSET, HSET, F } = getSystemSetting()
            // 1. 打开正压风机
            valveSET(F)
            // 2. 打开制冷器
            coolOPEN()
            // 3. 打开温控器
            heaterOpen()
            // 4. 打开除湿机
            dehumOpen()
            // 5. 打开加湿机
            wetOpen()
            // 7. 打开隔断风阀
            partValveOpen()
        }
        else{
            // 系统关闭
        }
    }
}

export { systemStart }
