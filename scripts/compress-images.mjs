import sharp from 'sharp'
import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs'
import { join, extname } from 'path'

const INPUT_DIR = './public/Assest'
const MAX_WIDTH = 1200
const JPEG_Q    = 78
const PNG_Q     = 80

let totalBefore = 0
let totalAfter  = 0

async function processDir(dir) {
  const entries = readdirSync(dir)
  for (const entry of entries) {
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)
    if (stat.isDirectory()) { await processDir(fullPath); continue }

    const ext = extname(entry).toLowerCase()
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue

    const sizeBefore = stat.size
    totalBefore += sizeBefore

    try {
      // Read file into buffer first — avoids path issues
      const inputBuf = readFileSync(fullPath)

      let pipeline = sharp(inputBuf, { failOn: 'none' })
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })

      const buf = ext === '.png'
        ? await pipeline.png({ quality: PNG_Q, compressionLevel: 9 }).toBuffer()
        : await pipeline.jpeg({ quality: JPEG_Q, progressive: true, mozjpeg: true }).toBuffer()

      totalAfter += buf.length

      if (buf.length < sizeBefore) {
        writeFileSync(fullPath, buf)
        const pct = (((sizeBefore - buf.length) / sizeBefore) * 100).toFixed(0)
        console.log(`✓ ${entry.padEnd(48)} ${(sizeBefore/1024).toFixed(0).padStart(6)}KB → ${(buf.length/1024).toFixed(0).padStart(5)}KB  (-${pct}%)`)
      } else {
        totalAfter = totalAfter - buf.length + sizeBefore
        console.log(`  ${entry.padEnd(48)} already optimal`)
      }
    } catch (e) {
      totalAfter += sizeBefore
      console.error(`✗ ${entry}: ${e.message}`)
    }
  }
}

console.log('Compressing images...\n')
await processDir(INPUT_DIR)
console.log(`\nTotal: ${(totalBefore/1024/1024).toFixed(1)}MB → ${(totalAfter/1024/1024).toFixed(1)}MB  (saved ${((totalBefore-totalAfter)/1024/1024).toFixed(1)}MB)`)
