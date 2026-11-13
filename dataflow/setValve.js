import { newAirValve } from './tools/devices/airValve.js'
import { getValue, getRow } from '../sqlite/read.js'

import { CO2 } from './trigger.js'

/* 
data example
{
    "node": "开关",
    "group": "switch1",
    "values": { "k1": 1, "k2": 2, "k3": 3, "k4": 4, "k5": 5 }
} */


function getSystemSetting() {
    const TSET = getValue('ENVSYSTEM', 'SETTING', 'TSET')
    const HSET = getValue('ENVSYSTEM', 'SETTING', 'HSET')
    const F = getValue('ENVSYSTEM', 'SETTING', 'F')
    return { TSET, HSET, F }
}

function setValve(data) {
    if (CO2(data)) {
        const { TSET, HSET, F } = getSystemSetting()

        const CO2Value = data.values['CO2']
        console.log(CO2Value)

        if (CO2Value > 1000) {
            newAirValve('W1', F*2)
            newAirValve('W2', F*2)
        } else if (CO2Value < 800) {
            newAirValve('W1', F)
            newAirValve('W2', F)
        }
    }
}

export { setValve }