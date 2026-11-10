import { SENSORENV, SENSORPLANT, ENVSET, WATER, PLANT } from './trigger.js'
import { msgMaker } from '../mqtt/msgMaker.js'

import { mqttPublish, reqWrite } from '../mqtt/mqtt.js';


/* 
data example
{
    "node": "开关",
    "group": "switch1",
    "values": { "k1": 1, "k2": 2, "k3": 3, "k4": 4, "k5": 5 }
} */

function makeMsgTemplate(data, key) {
    let msg = {
        node: "ENVSYSTEM",
        group: "ENV",
        key: key,
        value: data.values[key] || 0,
    }
    return msg;
}

function syncData(data) {
    if (SENSORENV(data)) {
        /* value key list 'CO2', 'PA1', 'PA2', 'T1', 'T2', 'H1', 'H2' */
        const envKeys = ['CO2', 'PA1', 'PA2', 'T1', 'T2', 'H1', 'H2'];
        let msg = {};
        let json = '';
        for (const key of envKeys) {
            if (data.values && data.values[key] !== undefined) {
                switch (key) {
                    case 'CO2':
                        msg = makeMsgTemplate(data, key);
                        json = JSON.stringify(msgMaker(msg));
                        mqttPublish(json);
                        break;
                    case 'PA1':
                        msg = makeMsgTemplate(data, key);
                        json = JSON.stringify(msgMaker(msg));
                        mqttPublish(json);
                        break;
                    case 'PA2':
                        msg = makeMsgTemplate(data, key);
                        json = JSON.stringify(msgMaker(msg));
                        mqttPublish(json);
                        break;
                    case 'T1':
                        msg = makeMsgTemplate(data, 'T5');
                        json = JSON.stringify(msgMaker(msg));
                        mqttPublish(json);
                        break;
                    case 'H1':
                        msg = makeMsgTemplate(data, 'H5');
                        json = JSON.stringify(msgMaker(msg));
                        mqttPublish(json);
                        break;
                }
            }
        }
    }

    if (SENSORPLANT(data)) {
        switch (data.group) {
            case 'S1':
                if (data.values) {
                    for (const key of Object.keys(data.values)) {
                        if (key === 'T') {
                            msg = makeMsgTemplate(data, 'T1');
                        } else if (key === 'H') {
                            msg = makeMsgTemplate(data, 'H1');
                        }
                        json = JSON.stringify(msgMaker(msg));
                        mqttPublish(json);
                    }
                }
                break;
            case 'S2':
                if (data.values) {
                    for (const key of Object.keys(data.values)) {
                        if (key === 'T') {
                            msg = makeMsgTemplate(data, 'T2');
                        } else if (key === 'H') {
                            msg = makeMsgTemplate(data, 'H2');
                        }
                        json = JSON.stringify(msgMaker(msg));
                        mqttPublish(json);
                    }
                }
                break;
            case 'S3':
                if (data.values) {
                    for (const key of Object.keys(data.values)) {
                        if (key === 'T') {
                            msg = makeMsgTemplate(data, 'T3');
                        } else if (key === 'H') {
                            msg = makeMsgTemplate(data, 'H3');
                        }
                        json = JSON.stringify(msgMaker(msg));
                        mqttPublish(json);
                    }
                }
                break;
            case 'S4':
                if (data.values) {
                    for (const key of Object.keys(data.values)) {
                        if (key === 'T') {
                            msg = makeMsgTemplate(data, 'T4');
                        } else if (key === 'H') {
                            msg = makeMsgTemplate(data, 'H4');
                        }
                        json = JSON.stringify(msgMaker(msg));
                        mqttPublish(json);
                    }
                }
                break;
            case 'S5':
                if (data.values) {
                    for (const key of Object.keys(data.values)) {
                        if (key === 'T') {
                            msg = makeMsgTemplate(data, 'T5');
                        } else if (key === 'H') {
                            msg = makeMsgTemplate(data, 'H5');
                        }
                        json = JSON.stringify(msgMaker(msg));
                        mqttPublish(json);
                    }
                }
                break;
        }
    }
}

export { syncData }