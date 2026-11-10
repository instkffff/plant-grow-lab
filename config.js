const SENSOR = [
    'CO2', 'CO2CAL', 'PA1', 'PA2',
    'T1', 'H1', 'TCAL1', 'HCAL1'
]

const VALVE = [
    'W1', 'W2'
]

const NEWAIR = [
    { name: 'SENSOR', keys: SENSOR },
    { name: 'VALVE', keys: VALVE },
]

const SSHUM = [
    'PV', 'SV', 'OUTB', 'P', 'K',
    'HSET', 'TSET', 'HCAL', 'TCAL',
    'ST0', 'ST1', 'ST2', 'ST3', 'ST4', 'ST8',
    'H', 'T',
    'E0', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6',
    'E7', 'E8', 'E9', 'E10', 'E11', 'E12',
    'WR', 'WCSET', 'WOSET', 'WT',
    'K1', 'K2', 'K3', 'K4'
]

const HEATDEHUM = [
    { name: 'S1', keys: SSHUM },
    { name: 'S2', keys: SSHUM },
]

const SSCOOL = [
    'OPEN', 'CLOSE', 'RESET', 'SLIENT',
    'FORCEDF1', 'FORCEDF2', 'FORCEDF3', 'FORCEDF4', 
    'FORCEDF5', 'FORCEDF6', 'FORCEDF7', 'FORCEDF8',
    'ST0', 'ST1', 'ST2', 'ST3', 'ST4', 'ST8', 'ST9', 'ST10', 'ST11', 'ST15',
    'MODE', 'MODER', 'TSET', 'TCOOL', 'WSTC', 'K',
    'HSET', 'WSET', 'WSTh', 'HWET', 'TWET',
    'E0', 'E9', 'E11',
    'K1', 'K2', 'T', 'TCAL', 'HCAL'
]

const COOLHUM = [
    { name: 'S1', keys: SSCOOL },
    { name: 'S2', keys: SSCOOL },
    { name: 'S3', keys: SSCOOL },
    { name: 'S4', keys: SSCOOL },
    { name: 'S5', keys: SSCOOL },
]

const GT = ['ID', 'MODE', 'K', 'R', 'B', 'W', 'Y', 'M', 'D', 'HH', 'MM']

const PLANT = [
    { name: 'G11', keys: GT },
    { name: 'G12', keys: GT },
    { name: 'G13', keys: GT },
    { name: 'G21', keys: GT },
    { name: 'G22', keys: GT },
    { name: 'G23', keys: GT },
    { name: 'G31', keys: GT },
    { name: 'G32', keys: GT },
    { name: 'G33', keys: GT },
    { name: 'G41', keys: GT },
    { name: 'G42', keys: GT },
    { name: 'G43', keys: GT },
]

const ENV = [
    'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
    'T1', 'T2', 'T3', 'T4', 'T5', 'T6',
    'CO2', 'PA1', 'PA2'
]

const SETTING = [
    'TSET', 'HSET', 'KS', 'F'
]

const EQ = [
    'COOL1', 'COOL2', 'COOL3', 'COOL4', 'COOL5',
    'HUM1', 'HUM2', 'HUM3', 'HUM4', 'HUM5',
    'DEHUM1', 'DEHUM2',
    'WASH1', 'WASH2', 'WASH3', 'WASH4', 'WASH5'
]

const ENVSYSTEM = [
    { name: 'ENV', keys: ENV },
    { name: 'SETTING', keys: SETTING },
    { name: 'EQ', keys: EQ },
]

const mqttBroker = 'mqtt://192.168.50.127:1883';

const reqWrite = '/neuron/system/write/req';

const respWrite = '/neuron/system/write/resp';

const main = '/neuron/system';

export { NEWAIR, HEATDEHUM, COOLHUM, PLANT, ENVSYSTEM, mqttBroker, reqWrite, respWrite, main }
