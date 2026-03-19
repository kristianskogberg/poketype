const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const INPUT_DIR = path.join(__dirname, '..', 'assets', 'images', 'type_icons')
const OUTPUT_DIR = path.join(__dirname, '..', 'assets', 'images', 'type_icons_png')

const TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy',
]

const SIZE = 48

async function convert() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  for (const type of TYPES) {
    const input = path.join(INPUT_DIR, `${type}.svg`)
    const output = path.join(OUTPUT_DIR, `${type}.png`)

    if (!fs.existsSync(input)) {
      console.warn(`Skipping ${type}: SVG not found at ${input}`)
      continue
    }

    await sharp(input)
      .resize(SIZE, SIZE)
      .png()
      .toFile(output)

    console.log(`Converted ${type}.svg -> ${type}.png`)
  }

  console.log('Done!')
}

convert().catch((err) => {
  console.error(err)
  process.exit(1)
})
