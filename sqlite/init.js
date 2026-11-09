import Database from 'better-sqlite3';
import { NEWAIR, HEATDEHUM, COOLHUM, PLANT, ENVSYSTEM, mqttBroker, reqWrite, respWrite, main } from '../config.js';

const db = new Database('control_system.db');

function initDatabase() {
    db.exec('CREATE TABLE IF NOT EXISTS NEWAIR (name TEXT PRIMARY KEY, value TEXT)');
    db.exec('CREATE TABLE IF NOT EXISTS HEATDEHUM (name TEXT PRIMARY KEY, value TEXT)');
    db.exec('CREATE TABLE IF NOT EXISTS COOLHUM (name TEXT PRIMARY KEY, value TEXT)');
    db.exec('CREATE TABLE IF NOT EXISTS PLANT (name TEXT PRIMARY KEY, value TEXT)');
    db.exec('CREATE TABLE IF NOT EXISTS ENVSYSTEM (name TEXT PRIMARY KEY, value TEXT)');

    function insertTable(tableName, entries) {
        const stmt = db.prepare(`INSERT OR REPLACE INTO "${tableName}" (name, value) VALUES (?, ?)`);
        entries.forEach((entry) => {
            const obj = {};
            entry.keys.forEach(key => { obj[key] = 0; });
            stmt.run(entry.name, JSON.stringify(obj));
        });
    }

    insertTable('NEWAIR', NEWAIR);
    insertTable('HEATDEHUM', HEATDEHUM);
    insertTable('COOLHUM', COOLHUM);
    insertTable('PLANT', PLANT);
    insertTable('ENVSYSTEM', ENVSYSTEM);
}

initDatabase();