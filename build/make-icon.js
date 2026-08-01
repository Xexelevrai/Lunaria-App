// Convertit build/icon.png en build/icon.ico multi-résolution (16/24/32/48/64/128/256px).
// Chaque taille est ré-échantillonnée séparément à partir de l'image d'origine, sans aucun
// autre traitement (pas de dilatation, pas de contraste) : le dessin reste tel quel.
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const pngPath = path.join(__dirname, 'icon.png');
const icoPath = path.join(__dirname, 'icon.ico');
const SIZES = [16, 24, 32, 48, 64, 128, 256];

if (!fs.existsSync(pngPath)) {
  console.log('[make-icon] build/icon.png absent, génération ico ignorée.');
  process.exit(0);
}

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'lunaria-icon-'));

try {
  const psScript = `
Add-Type -AssemblyName System.Drawing
$src = [System.Drawing.Image]::FromFile('${pngPath.replace(/\\/g, '\\\\')}')
$sizes = @(${SIZES.join(',')})
foreach ($size in $sizes) {
  $bmp = New-Object System.Drawing.Bitmap $size, $size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $g.Clear([System.Drawing.Color]::Transparent)
  $ratio = [Math]::Min($size / $src.Width, $size / $src.Height)
  $w = [int]([Math]::Round($src.Width * $ratio))
  $h = [int]([Math]::Round($src.Height * $ratio))
  $x = [int]([Math]::Round(($size - $w) / 2))
  $y = [int]([Math]::Round(($size - $h) / 2))
  $g.DrawImage($src, $x, $y, $w, $h)
  $g.Dispose()
  $bmp.Save('${tmpDir.replace(/\\/g, '\\\\')}\\' + $size + '.png', [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
}
$src.Dispose()
`;
  execFileSync('powershell', ['-NoProfile', '-NonInteractive', '-Command', psScript], { stdio: 'inherit' });

  const images = SIZES.map((size) => ({ size, data: fs.readFileSync(path.join(tmpDir, `${size}.png`)) }));

  const dirHeader = Buffer.alloc(6);
  dirHeader.writeUInt16LE(0, 0); // reserved
  dirHeader.writeUInt16LE(1, 2); // type: icon
  dirHeader.writeUInt16LE(images.length, 4); // image count

  let offset = dirHeader.length + images.length * 16;
  const entries = [];
  const dataBlocks = [];
  for (const { size, data } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    entries.push(entry);
    dataBlocks.push(data);
  }

  fs.writeFileSync(icoPath, Buffer.concat([dirHeader, ...entries, ...dataBlocks]));
  console.log(`[make-icon] build/icon.ico généré avec ${images.length} résolutions (${SIZES.join(', ')}px).`);
} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
