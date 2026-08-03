const fs = require('fs');
const path = require('path');
const https = require('https');

const root = path.join(__dirname, '..');

// Ensure directories exist
const dirs = [
  path.join(root, 'public/photos/nandu'),
  path.join(root, 'public/audio'),
  path.join(root, 'public/book/pages'),
  path.join(root, 'public/book/elements'),
  path.join(root, 'public/book/frames'),
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// 1. Copy photos from Assets-hbd
const assetsDir = path.join(root, 'Assets-hbd');
const photosTargetDir = path.join(root, 'public/photos/nandu');

if (fs.existsSync(assetsDir)) {
  const photoFiles = fs.readdirSync(assetsDir).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
  console.log(`Found ${photoFiles.length} photos in Assets-hbd`);

  photoFiles.forEach((file, index) => {
    const paddedNum = String(index + 1).padStart(2, '0');
    const ext = path.extname(file);
    const targetName = `${paddedNum}.jpg`;
    fs.copyFileSync(path.join(assetsDir, file), path.join(photosTargetDir, targetName));
    console.log(`Copied ${file} -> public/photos/nandu/${targetName}`);
  });
}

// 2. Copy audio file
const rootFiles = fs.readdirSync(root);
const audioFile = rootFiles.find(f => f.includes('WhatsApp Audio') || f.endsWith('.mpeg') || f.endsWith('.mp3'));

if (audioFile) {
  const targetAudio = path.join(root, 'public/audio/nandu-theme.mp3');
  fs.copyFileSync(path.join(root, audioFile), targetAudio);
  console.log(`Copied audio ${audioFile} -> public/audio/nandu-theme.mp3`);
}

// Helper to download binary files from GitHub
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest)) {
      console.log(`Already exists: ${path.basename(dest)}`);
      return resolve();
    }
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        console.warn(`Failed to download ${url}: status ${response.statusCode}`);
        return resolve(); // non-fatal
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    }).on('error', (err) => {
      fs.unlinkSync(dest);
      console.warn(`Error downloading ${url}:`, err.message);
      resolve(); // non-fatal
    });
  });
}

async function fetchBookAssets() {
  const baseUrl = 'https://raw.githubusercontent.com/sujal661/page-flip/main/public';

  const pages = ['pages/front.png', 'pages/back.png', 'pages/left.jpg', 'pages/right.jpg'];
  const frames = ['frames/frame1.png', 'frames/frame2.png', 'frames/frame3.png', 'frames/frame4.png', 'frames/frame5.png', 'frames/frame6.png'];
  const elements = [
    'elements/tape.png', 'elements/tape2.png', 'elements/lovetape.png',
    'elements/stamp.png', 'elements/badge.png', 'elements/rosel.png',
    'elements/starB.png', 'elements/start.png', 'elements/starem.png', 'elements/twoStar.png',
    'elements/billa.png', 'elements/billa2.png', 'elements/billa3.png', 'elements/billa4.png',
    'elements/boqey.png', 'elements/butter.png', 'elements/cam.png', 'elements/lovey.png',
    'elements/moon.png', 'elements/paper.png', 'elements/rabbit.png', 'elements/ted.png'
  ];

  console.log('Downloading book assets from reference repo...');

  for (const p of pages) {
    await downloadFile(`${baseUrl}/${p}`, path.join(root, 'public/book', p));
  }

  for (const f of frames) {
    await downloadFile(`${baseUrl}/${f}`, path.join(root, 'public/book', f));
  }

  for (const e of elements) {
    await downloadFile(`${baseUrl}/${e}`, path.join(root, 'public/book', e));
  }

  console.log('Assets setup completed!');
}

fetchBookAssets().catch(console.error);
