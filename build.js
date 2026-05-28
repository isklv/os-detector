const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { minify } = require('terser');

const src = path.resolve(__dirname, 'src', 'os-detector.js');
const dist = path.resolve(__dirname, 'dist');

fs.mkdirSync(dist, { recursive: true });

const srcCode = fs.readFileSync(src, 'utf8');

// Unminified copy
fs.writeFileSync(path.join(dist, 'os-detector.js'), srcCode);

// Minified version
minify(srcCode, { compress: true, mangle: true}).then(result => {
  fs.writeFileSync(path.join(dist, 'os-detector.min.js'), result.code);
  const raw = Buffer.byteLength(result.code);
  const gz = zlib.gzipSync(result.code).length;
  console.log(`✓ os-detector.min.js ${raw} bytes (${gz} gzipped)`);
});

const raw = Buffer.byteLength(srcCode);
const gz = zlib.gzipSync(srcCode).length;
console.log(`✓ os-detector.js      ${raw} bytes (${gz} gzipped)`);
