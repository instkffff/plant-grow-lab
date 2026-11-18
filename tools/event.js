// 创建一个新的 EventEmitter 实例
function createEventEmitter() {
    let events = {}; // 移到这里，每个实例拥有独立的事件存储

    return {
        // 监听事件
        on: function (eventName, callback) {
            if (!events[eventName]) {
                events[eventName] = [];
            }
            events[eventName].push(callback);
            return this; // 支持链式调用
        },

        // 只监听一次事件
        once: function (eventName, callback) {
            const onceWrapper = (...args) => {
                this.off(eventName, onceWrapper);
                callback(...args);
            };
            return this.on(eventName, onceWrapper);
        },

        // 发射事件
        emit: function (eventName, ...args) {
            if (events[eventName]) {
                events[eventName].forEach(callback => callback(...args));
            }
            return this; // 支持链式调用
        },

        // 移除事件监听
        off: function (eventName, callback) {
            if (!events[eventName]) return this;

            if (!callback) {
                // 如果没有提供回调函数，则移除该事件的所有监听器
                delete events[eventName];
            } else {
                // 移除指定的回调函数
                events[eventName] = events[eventName].filter(cb => cb !== callback);
            }
            return this;
        },

        // 移除所有事件监听
        removeAllListeners: function () {
            events = {};
            return this;
        }
    };
}

export { createEventEmitter }


/* example

import { createEventEmitter } from './event.js';

// 创建事件发射器实例
const emitter = createEventEmitter();

// 1. 监听事件
emitter.on('greet', (name) => {
    console.log(`你好, ${name}!`);
});

// 2. 发射事件
emitter.emit('greet', '小明'); // 输出: 你好, 小明!

// 3. 只监听一次事件
emitter.once('welcome', (name) => {
    console.log(`欢迎, ${name}!`);
});

emitter.emit('welcome', '小红'); // 输出: 欢迎, 小红!
emitter.emit('welcome', '小红'); // 不会输出，once 只触发一次

// 4. 链式调用
emitter
    .on('data', (msg) => console.log('收到数据:', msg))
    .on('data', (msg) => console.log('数据长度:', msg.length))
    .emit('data', 'Hello');

// 5. 移除指定监听
const handler = (msg) => console.log('临时监听:', msg);
emitter.on('temp', handler);
emitter.emit('temp', '还在'); // 输出: 临时监听: 还在
emitter.off('temp', handler);
emitter.emit('temp', '已移除'); // 不会输出

// 6. 移除所有监听
emitter.removeAllListeners();
emitter.emit('greet', '没人听到'); // 不会有输出 
// 

*/