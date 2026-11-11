import { waterLow, waterHigh } from './trigger.js'

import { wetToggle, wetSetH, wetAdd, wetDrain } from './tools/devices/wet.js'

function waterFill(data) {
    if (waterLow(data)) {
        const group = data.group
        const state = data.values['E11']

        if (state === 0) {
            return
        }

        switch (group) {
            case 'S1':
                wetAdd('S1', 1)
                break
            case 'S2':
                wetAdd('S2', 1)
                break
            case 'S3':
                wetAdd('S3', 1)
                break
            case 'S4':
                wetAdd('S4', 1)
                break
            case 'S5':
                wetAdd('S5', 1)
                break
        }
    }

    if (waterHigh(data)) {
        // 停止填水
        const group = data.group
        const state = data.values['E9']

        if (state === 0) {
            return
        }

        switch (group) {
            case 'S1':
                wetAdd('S1', 0)
                break
            case 'S2':
                wetAdd('S2', 0)
                break
            case 'S3':
                wetAdd('S3', 0)
                break
            case 'S4':
                wetAdd('S4', 0)
                break
            case 'S5':
                wetAdd('S5', 0)
                break
        }
    }
}

export { waterFill }