import { wsSend } from './ws.js';
import { getValue } from '../sqlite/read.js';
import { mqttPublish, reqWrite } from '../mqtt/mqtt.js';
import { msgMaker } from '../mqtt/msgMaker.js';

/* 
{
    "func": "read",
    "node": "PLANT",
    "group": "G11",
    "tag": "Y"
} 
*/

/**
 * 处理 read 请求 - 读取数据库
 * @param {Object} data - 请求数据
 */
const handleRead = (ws, data) => {
    const { node, group, tag } = data;
    const value = getValue(node, group, tag);
    wsSend(ws, { func: 'read', node, group, tag, value });
    console.log('read:', node, group, tag, value);
};

/* 
{
    "func": "write",
    "node": "PLANT",
    "group": "G11",
    "tag": "Y",
    "value": "2000"
} 
*/

/**
 * 处理 write 请求 - 写入 MQTT
 * @param {Object} data - 请求数据
 */
const handleWrite = (ws, data) => {
    let { node, group, tag, value } = data;

    console.log(value);
    const msg = {
        node: node,
        group: group,
        tag: tag,
        value: value,
    }
    const msgobj = msgMaker(msg)
    try {
        mqttPublish(reqWrite, JSON.stringify(msgobj))
        wsSend(ws, { func: 'write', node, group, tag, value, status: 'success' });
    } catch (error) {
        console.error(`Error publishing message write (${node}, ${group}, ${tag}, ${value}):`, error);
        wsSend(ws, { func: 'write', node, group, tag, value, status: 'error' });
    }
};

/**
 * API 路由分发 - 根据 func 分流
 * @param {WebSocket} ws - WebSocket 连接
 * @param {Object} data - 请求数据
 */
const apiRoute = (ws, data) => {
    const { func } = data;
    switch (func) {
        case 'read':
            handleRead(ws, data);
            break;
        case 'write':
            handleWrite(ws, data);
            break;
        default:
            console.warn('Unknown API func:', func);
    }
};

export { apiRoute, handleRead, handleWrite };
