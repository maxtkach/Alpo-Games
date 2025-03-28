const https = require('https');
const fs = require('fs');
const path = require('path');

const icons = {
  'unreal-engine': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/unrealengine/unrealengine-original.svg',
  'unity': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/unity/unity-original.svg',
  'react': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
  'threejs': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/threejs/threejs-original.svg',
  'nodejs': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg',
  'mongodb': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg'
};

const outputDir = path.join(__dirname, '../public/images/tech');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

Object.entries(icons).forEach(([name, url]) => {
  https.get(url, (response) => {
    const filePath = path.join(outputDir, `${name}.png`);
    const fileStream = fs.createWriteStream(filePath);
    response.pipe(fileStream);
    
    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`Downloaded: ${name}`);
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${name}:`, err.message);
  });
}); 