const fs = require('fs');
const path = require('path');

async function compress() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (err) {
    console.log('Sharp not installed yet, skipping compression script');
    return;
  }

  const photosDir = path.join(__dirname, '..', 'public', 'photos', 'nandu');
  if (!fs.existsSync(photosDir)) return;

  const files = fs.readdirSync(photosDir).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg'));
  console.log(`Compressing ${files.length} photos in ${photosDir}...`);

  for (const file of files) {
    const filePath = path.join(photosDir, file);
    const tempPath = path.join(photosDir, `temp_${file}`);

    try {
      const metadata = await sharp(filePath).metadata();
      const longEdge = Math.max(metadata.width || 0, metadata.height || 0);

      if (longEdge > 1200) {
        await sharp(filePath)
          .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 82, progressive: true })
          .toFile(tempPath);

        fs.unlinkSync(filePath);
        fs.renameSync(tempPath, filePath);
        const newStats = fs.statSync(filePath);
        console.log(`Compressed ${file}: ${Math.round(newStats.size / 1024)} KB`);
      } else {
        console.log(`Skipped ${file}: already small (${longEdge}px)`);
      }
    } catch (err) {
      console.warn(`Error compressing ${file}:`, err.message);
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
  }

  console.log('Image compression finished!');
}

compress().catch(console.error);
