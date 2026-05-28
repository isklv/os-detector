const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const src = path.resolve(__dirname, 'src', 'os-detector.js');
const dist = path.resolve(__dirname, 'dist');

fs.mkdirSync(dist, { recursive: true });

const srcCode = fs.readFileSync(src, 'utf8');

// Copy as-is (file is tiny; use terser/esbuild for production minification)
fs.writeFileSync(path.join(dist, 'os-detector.js'), srcCode);
fs.writeFileSync(path.join(dist, 'os-detector.min.js'), srcCode);

const raw = Buffer.byteLength(srcCode);
const gz = zlib.gzipSync(srcCode).length;

console.log(`✓ os-detector.js      ${raw} bytes (${gz} gzipped)`);
