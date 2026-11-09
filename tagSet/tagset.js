import { login, fetchTags, insertTags } from './tagManager.js';

// login 
const baseUrl = 'http://192.168.50.127:7000';
const name = 'admin';
const password = '0000';

/* const token = await login(baseUrl, name, password);
console.log(token); */

const key = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJuZXVyb24iLCJib2R5RW5jb2RlIjowLCJleHAiOjE3OTQyMTA3NDgsImlhdCI6MTc5NDIwNzE0OCwiaXNzIjoibmV1cm9uIn0.dt7q_eVpeCatPoWYQIaU9NWswbZ9qrw5HKEzSHh8QUHDWqdHhU6gXGk8beGScijXzsdYr5czprFjAcSWqq21MCV5O6nxH1gy4XUrLR5A_VumOiYgz5hXwUbrVunatxdjaAE7DxMm4gYXN1yCT6K3AKbkolhT3PRFCOJbWuFHUYM--Ss535GfgXg19j-uL4NvL6DpQ7r67GWa1AQcZ9LLUEuVhFJAtP5xt1q1uZfCQO54tMUIMMjAeoSZVmQlc-vfSYfiruZAOecMAnKVHwdF-N0Lm5NgHVp4rwjQ7PdIhR-rW80GnP9fMRhCZB1GjehFII6WPJ6rSqG1puZy5y-42w';


fetchTags(baseUrl, key, 'PF6W', 'CONSOLE');