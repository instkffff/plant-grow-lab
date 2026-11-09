import { login, fetchTags, insertTags } from './tagManager.js';
import fs from 'fs';
import { COOLHUM, COOLHUM_BASE } from './COOLHUM.js';
import { PLANT } from './PLANT.js';

// login 
const baseUrl = 'http://192.168.50.127:7000';
const name = 'admin';
const password = '0000';

/* const token = await login(baseUrl, name, password);
console.log(token); */

const key = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJuZXVyb24iLCJib2R5RW5jb2RlIjowLCJleHAiOjE3OTQyMTUwNjgsImlhdCI6MTc5NDIxMTQ2OCwiaXNzIjoibmV1cm9uIn0.v9PKlwpOLCJI0S7etEBgXYh_rBlZ9eVvS5WtAjet3ZF30u49IafFkpI_G7KAuQEHVc82bc9vi_K4btZN1eDvXG0uhWXJG39U9wG8dKNrRUwB_PRnlM7-dubTDjFuImATPiFbKjAeHWz-ajU79kbcGxFQew0U23FoynM2TQBcAWI56I8w9tfR0uBc5jkUAb3on4gzfwT96N8Tg7NBfBGAzduXyhJf43Yzr_WlVLQInpEXa7sW3hsD_239gehjISCsONxuFFf_KSkybj73qAv2E_0p-55w3llTpW0hrQLHI3VGwPCk_-nLCVZDjBBFKDvnPAaD9diUJygF9a8tJKxZ9w';

/* const node = await fetchTags(baseUrl, key, 'PLANT', 'G11');

// Write output to temp file
const tempPath = './temp';
fs.writeFileSync(tempPath, JSON.stringify(node, null, 2), 'utf-8');
console.log('Written to', tempPath); */

/* const node = COOLHUM("17", "18", "19", "20", COOLHUM_BASE);

await insertTags(baseUrl, key, 'COOLHUM', 'S5', node); */

const node = PLANT(12);

await insertTags(baseUrl, key, 'PLANT', 'G43', node);
