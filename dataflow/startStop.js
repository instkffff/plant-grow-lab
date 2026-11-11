import { SYSSTART } from './trigger.js'
import { getValue, getRow } from '../sqlite/read.js'

import { newAirValve } from './tools/devices/airValve.js'
import { coolerOpen, coolerClose, coolerSetTemp } from './tools/devices/cooler.js'
import { heaterSetT, heaterToggle } from './tools/devices/heater.js'
import { dryToggle, drySetH, drySetT } from './tools/devices/dry.js'
import { wetToggle, wetSetH, wetAdd, wetDrain } from './tools/devices/wet.js'
import { midValve } from './tools/devices/midValve.js'

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

function startStop(data) {
    if ( SYSSTART(data) ){
        if ( data.values.KS === 1 ){
            // 系统启动
            const { TSET, HSET, F } = getSystemSetting()
            // 1. 打开正压风机
            newAirValve('W1', F)
            newAirValve('W2', F)

            // 2. 打开制冷器
            coolerOpen('S1')
            coolerOpen('S2')
            coolerOpen('S3')
            coolerOpen('S4')
            coolerOpen('S5')

            coolerSetTemp('S1', TSET)
            coolerSetTemp('S2', TSET)
            coolerSetTemp('S3', TSET)
            coolerSetTemp('S4', TSET)
            coolerSetTemp('S5', TSET)
            // 3. 打开温控器
            heaterToggle('S1', 12)
            heaterToggle('S2', 12)
            
            heaterSetT('S1', TSET-1)
            heaterSetT('S2', TSET-1)

            // 4. 打开除湿机
            dryToggle('S1', 1)
            dryToggle('S2', 1)

            drySetH('S1', HSET+1)
            drySetT('S1', TSET)

            drySetH('S2', HSET+1)
            drySetT('S2', TSET)

            // 5. 打开加湿机
            wetToggle('S1', 1)
            wetToggle('S2', 1)
            wetToggle('S3', 1)
            wetToggle('S4', 1)
            wetToggle('S5', 1)

            wetSetH('S1', HSET)
            wetSetH('S2', HSET)
            wetSetH('S3', HSET)
            wetSetH('S4', HSET)
            wetSetH('S5', HSET)
            
            // 6. 打开隔断风阀
            midValve('S1', 1)
            midValve('S2', 1)

        }
        else{
            // 系统关闭
            // 1. 关闭正压风机
            newAirValve('W1', 0)
            newAirValve('W2', 0)

            // 2. 关闭制冷器
            coolerClose('S1')
            coolerClose('S2')
            coolerClose('S3')
            coolerClose('S4')
            coolerClose('S5')

            // 3. 关闭温控器
            heaterToggle('S1', 22)
            heaterToggle('S2', 22)

            // 4. 关闭除湿机
            dryToggle('S1', 0)
            dryToggle('S2', 0)

            // 5. 关闭加湿机
            wetToggle('S1', 0)
            wetToggle('S2', 0)
            wetToggle('S3', 0)
            wetToggle('S4', 0)
            wetToggle('S5', 0)

            // 6. 关闭隔断风阀
            midValve('S1', 0)
            midValve('S2', 0)

        }
    }
}

export { startStop }
