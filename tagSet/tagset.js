import { login, fetchTags, insertTags } from './tagManager.js';
import fs from 'fs';
import { COOLHUM, COOLHUM_BASE } from './COOLHUM.js';
import { PLANT } from './PLANT.js';
import { SETTING } from './SETTING.js';
import { ENV } from './ENV.js';
import { EQ } from './EQ.js';



// login 
const baseUrl = 'http://192.168.50.127:7000';
const name = 'admin';
const password = '0000';

/* const token = await login(baseUrl, name, password);
console.log(token); */

const key = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJuZXVyb24iLCJib2R5RW5jb2RlIjowLCJleHAiOjE3OTQyMjkzMzIsImlhdCI6MTc5NDIyNTczMiwiaXNzIjoibmV1cm9uIn0.m8t3kOIFnfeCs4J_qcq6nkDjtcMKekuI4NsLBIzySteEFDb-fwUl1uaDkmL2yFmWKlZemZ9mqDryGTtRnQmp2uIYNpFQPRP_SaVkKTm2XlDy5j5FuRisKjy2pMhZRA0qW4uIANMknZta7EtPzYajh6M9iiQY2oE0r3sv0NfH5OLfY_ZXoAJa8_uvUSVbhgY3SWwvwo9O3L3R0YtfjGcsafIMqI1d8gKkP9zAQAUO6qWDPlqSDTTX_lBE7HrkmY20To2jVuElkhIGNYMG4wdBjw1KO5uM2icnf_e99m4dCg6Adgq78kyw5KiypCW0lGcvAjtCGLY7s4ylsylSR46GXw';

/* const node = await fetchTags(baseUrl, key, 'ENVSYSTEM', 'SETTING');

// Write output to temp file
const tempPath = './temp';
fs.writeFileSync(tempPath, JSON.stringify(node, null, 2), 'utf-8');
console.log('Written to', tempPath); */

/* const node = COOLHUM("17", "18", "19", "20", COOLHUM_BASE);

await insertTags(baseUrl, key, 'COOLHUM', 'S5', node); */

/* const node = PLANT(12);

await insertTags(baseUrl, key, 'PLANT', 'G43', node); */

await insertTags(baseUrl, key, 'ENVSYSTEM', 'EQ', EQ);
