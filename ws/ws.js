/* 
localhost:30000 ws 服务器端

封装 wsSend() 函数 方便我在别处用

初始化封装一下 我好在入口启动服务器
*/

import { WebSocketServer, WebSocket } from 'ws';
import { apiRoute } from './api.js';
import { emitter } from './bridgeEvent.js';

let wss = null;

/**
 * 初始化 WebSocket 服务器
 * @param {number} [port=30000] - 监听端口
 * @returns {WebSocketServer} WebSocket 服务器实例
 */
const wsInit = (port = 30000) => {
    wss = new WebSocketServer({ port });

    wss.on('listening', () => {
        console.log(`WebSocket bridge server is running on ws://localhost:${port}`);
    });

    wss.on('connection', (ws) => {
        console.log('New client connected');

        ws.on('message', (message) => {
            try {
                const data = JSON.parse(message.toString());
                apiRoute(ws, data);
            } catch (err) {
                console.error('Failed to parse message:', err);
            }
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });

        ws.on('error', (err) => {
            console.error('WebSocket error:', err);
        });
    });

    return wss;
};

/**
 * 发送消息给指定的 WebSocket 客户端
 * @param {WebSocket} ws - WebSocket 连接实例
 * @param {*} data - 要发送的数据（会自动 JSON.stringify）
 * @returns {boolean} 是否发送成功
 */
const wsSend = (ws, data) => {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
        console.warn('WebSocket is not open, cannot send message');
        return false;
    }

    try {
        const message = typeof data === 'string' ? data : JSON.stringify(data);
        ws.send(message);
        return true;
    } catch (err) {
        console.error('Failed to send WebSocket message:', err);
        return false;
    }
};

emitter.on("bridge", (data) => {
    if (!wss) return;
    const message = typeof data === 'string' ? data : JSON.stringify(data);
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
});

export { wsInit, wsSend };