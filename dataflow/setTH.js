import { ENVSETTH } from './trigger.js';
import { getValue, getRow } from '../sqlite/read.js'

import { newAirValve } from './tools/devices/airValve.js'
import { coolerOpen, coolerClose, coolerSetTemp } from './tools/devices/cooler.js'
import { heaterSetT, heaterToggle } from './tools/devices/heater.js'
import { dryToggle, drySetH, drySetT } from './tools/devices/dry.js'
import { wetToggle, wetSetH, wetAdd, wetDrain } from './tools/devices/wet.js'
import { midValve } from './tools/devices/midValve.js'

function getSystemSetting() {
    const TSET = getValue('ENVSYSTEM', 'SETTING', 'TSET')
    const HSET = getValue('ENVSYSTEM', 'SETTING', 'HSET')
    const F = getValue('ENVSYSTEM', 'SETTING', 'F')
    return { TSET, HSET, F }
}

function setTH(data) {
    if ( ENVSETTH(data) ){
        const { TSET, HSET, F } = getSystemSetting()
        
        // 设温度
        heaterSetT('S1', TSET-1)
        heaterSetT('S2', TSET-1)

        coolerSetTemp('S1', TSET)
        coolerSetTemp('S2', TSET)
        coolerSetTemp('S3', TSET)
        coolerSetTemp('S4', TSET)
        coolerSetTemp('S5', TSET)


        // 设湿度
        drySetH('S1', HSET+1)
        drySetT('S1', TSET)

        drySetH('S2', HSET+1)
        drySetT('S2', TSET)

        wetSetH('S1', HSET)
        wetSetH('S2', HSET)
        wetSetH('S3', HSET)
        wetSetH('S4', HSET)
        wetSetH('S5', HSET)
    }
}

export { setTH }