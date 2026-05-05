import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'fs'

const files = [
  'public/Assest/Signature Masterpieces/1000280627.jpg.jpeg',
  'public/Assest/Signature Masterpieces/1000280629.jpg.jpeg',
]

for (const f of files) {
  const input = readFileSync(f)
  // Manually rotate 90° clockwise to fix portrait orientation
  const buf = await sharp(input)
    .rotate(90)
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toBuffer()
  writeFileSync(f, buf)
  const meta = await sharp(buf).metadata()
  console.log(`Fixed: ${f.split('/').pop()}  →  ${meta.width}x${meta.height}`)
}
