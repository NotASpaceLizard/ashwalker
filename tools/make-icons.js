// Generates PWA/apple-touch icons as raw PNGs with zero dependencies (npm's registry auth is broken on
// this machine, so no image libraries). Draws a simple ember/flame glyph procedurally and hand-encodes
// PNG chunks (IHDR/IDAT/IEND) using Node's built-in zlib for the deflate step.
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crcInput = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(crcInput), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

function encodePng(width, height, rgba) {
  const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; ihdrData[9] = 6; ihdrData[10] = 0; ihdrData[11] = 0; ihdrData[12] = 0;
  const ihdr = chunk('IHDR', ihdrData);

  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0; // filter: none
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }
  const idat = chunk('IDAT', deflateSync(raw, { level: 9 }));
  const iend = chunk('IEND', Buffer.alloc(0));
  return Buffer.concat([sig, ihdr, idat, iend]);
}

function smin(a, b, k) {
  const h = Math.max(k - Math.abs(a - b), 0) / k;
  return Math.min(a, b) - h * h * k * 0.25;
}

function lerp(a, b, t) { return a + (b - a) * t; }

function drawIcon(size) {
  const rgba = Buffer.alloc(size * size * 4);
  const bg = [26, 18, 16]; // ash-black
  const cx = size * 0.5;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      // Normalized coords, 0..1, origin top-left.
      const nx = (x - cx) / size;
      const nyTop = y / size; // 0 top, 1 bottom

      // Flame silhouette: union of two circles (body + head) via smooth-min of signed distances.
      const bodyCx = 0, bodyCy = 0.68, bodyR = 0.30;
      const headCx = 0, headCy = 0.40, headR = 0.19;
      const dBody = Math.hypot(nx - bodyCx, nyTop - bodyCy) - bodyR;
      const dHead = Math.hypot(nx - headCx, nyTop - headCy) - headR;
      const d = smin(dBody, dHead, 0.14);

      // Slight taper/waver for a flame-like silhouette rather than a perfect blob.
      const waver = Math.sin(nyTop * 9.0) * 0.012;
      const dist = d + waver;

      const inside = dist < 0;
      const edgeSoft = Math.max(0, Math.min(1, 0.02 - dist) / 0.02); // AA over ~0.02 units

      if (!inside && edgeSoft <= 0) {
        rgba[i] = bg[0]; rgba[i + 1] = bg[1]; rgba[i + 2] = bg[2]; rgba[i + 3] = 255;
        continue;
      }

      // Flame color gradient: deep red at the base, bright ember-yellow at the tip.
      const heightT = Math.max(0, Math.min(1, (bodyCy + bodyR - nyTop) / (bodyCy + bodyR - (headCy - headR))));
      const r = lerp(120, 255, heightT);
      const g = lerp(30, 170, Math.pow(heightT, 1.3));
      const b = lerp(20, 60, heightT * 0.5);

      const t = inside ? 1 : edgeSoft;
      rgba[i] = Math.round(lerp(bg[0], r, t));
      rgba[i + 1] = Math.round(lerp(bg[1], g, t));
      rgba[i + 2] = Math.round(lerp(bg[2], b, t));
      rgba[i + 3] = 255;
    }
  }
  return rgba;
}

const outDir = path.resolve(process.cwd(), 'assets', 'icons');
mkdirSync(outDir, { recursive: true });

const sizes = [32, 180, 192, 512];
const results = {};
for (const size of sizes) {
  const png = encodePng(size, size, drawIcon(size));
  const file = path.join(outDir, `icon-${size}.png`);
  writeFileSync(file, png);
  results[size] = { file, bytes: png.length };
}

console.log('ICON_RESULT_JSON ' + JSON.stringify({ ok: true, results }));
