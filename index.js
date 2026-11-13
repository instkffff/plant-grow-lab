import { startHttpServer as PH } from './devices/plantLight/server.js'
import { startServer as PS } from './devices/plantLight/modbus/modbusSlave.js'

import { startHttpServer as EH } from './devices/env/server.js'
import { startServer as ES } from './devices/env/modbus/modbusSlave.js'

import {
    initMqtt,
    mqttPublish,
    getMqttClient,
} from './mqtt/mqtt.js';

// PlantLight
PH();
PS();

// ENV
EH();
ES();

// system
setTimeout(initMqtt, 10000);


