const sharp = require('sharp')
const path = require('path')

const WIDTH = 250
const HEIGHT = 180

// Create a simple preview image with a white rounded rectangle and placeholder grid
const svgContent = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="${WIDTH}" height="${HEIGHT}" rx="16" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="2"/>
  <text x="125" y="24" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#424242" font-weight="bold">Type Matchup</text>
  <rect x="8" y="34" width="50" height="14" rx="7" fill="#FFA756"/>
  <rect x="62" y="34" width="50" height="14" rx="7" fill="#4C91B2"/>
  <rect x="215" y="34" width="28" height="14" rx="7" fill="#E0E0E0"/>
  ${generateGrid()}
</svg>
`

function generateGrid() {
  const colors = [
    '#B5B9C4','#E65100','#90CAF9','#E0E0E0','#42A5F5','#90CAF9',
    '#C62828','#E0E0E0','#E65100','#E0E0E0','#E0E0E0','#90CAF9',
    '#E0E0E0','#424242','#90CAF9','#E0E0E0','#42A5F5','#E65100',
  ]
  const cellW = 37
  const cellH = 38
  const startX = 8
  const startY = 54
  let rects = ''
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 6; c++) {
      const idx = r * 6 + c
      const x = startX + c * (cellW + 2)
      const y = startY + r * (cellH + 2)
      rects += `<rect x="${x}" y="${y}" width="${cellW}" height="${cellH}" rx="6" fill="${colors[idx]}"/>`
    }
  }
  return rects
}

sharp(Buffer.from(svgContent))
  .png()
  .toFile(path.join(__dirname, '..', 'assets', 'widget-preview.png'))
  .then(() => console.log('Widget preview generated!'))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
