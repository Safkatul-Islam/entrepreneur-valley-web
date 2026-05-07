#!/usr/bin/env node
/**
 * Generate a high-resolution QR code for print materials (banners, flyers).
 *
 * Usage:
 *   npm run qr:print
 *   npm run qr:print -- https://your-url.com   # override target
 *
 * Output: web/public/qr-register-print.png  (2048×2048, error-correction H)
 *
 * Error-correction level H (highest) is chosen so the QR remains scannable
 * even when partially obstructed or printed on textured banner material.
 */
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import QRCode from "qrcode";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const url =
  process.argv[2] ??
  process.env.NEXT_PUBLIC_REGISTER_URL ??
  "https://entrepreneursvalley.club/register/sharks-valley";

const out = resolve(ROOT, "public", "qr-register-print.png");

const buffer = await QRCode.toBuffer(url, {
  errorCorrectionLevel: "H",
  type: "png",
  width: 2048,
  margin: 4,
  color: {
    dark: "#000000",
    light: "#ffffff",
  },
});

await writeFile(out, buffer);

console.log(`Generated print QR (2048×2048):`);
console.log(`  URL: ${url}`);
console.log(`  Out: ${out}`);
