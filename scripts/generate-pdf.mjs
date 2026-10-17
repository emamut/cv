import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const distDir = path.resolve('dist');
const publicDir = path.resolve('public');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist/ directory not found. Please run "astro build" first.');
  process.exit(1);
}

const possibleChromePaths = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);

let chromePath = possibleChromePaths.find((p) => fs.existsSync(p));

if (!chromePath) {
  console.warn('⚠️ Chrome executable not found. Checking for pre-generated PDFs in public/...');
  const esPdf = path.join(publicDir, 'cv-faber-vergara-es.pdf');
  const enPdf = path.join(publicDir, 'cv-faber-vergara-en.pdf');
  if (fs.existsSync(esPdf) && fs.existsSync(enPdf)) {
    fs.copyFileSync(esPdf, path.join(distDir, 'cv-faber-vergara-es.pdf'));
    fs.copyFileSync(enPdf, path.join(distDir, 'cv-faber-vergara-en.pdf'));
    fs.copyFileSync(esPdf, path.join(distDir, 'cv.pdf'));
    fs.copyFileSync(esPdf, path.join(publicDir, 'cv.pdf'));
    console.log('✓ Successfully copied pre-generated ATS PDFs to dist/');
    process.exit(0);
  } else {
    console.warn('No pre-generated PDFs found and Chrome is unavailable.');
    process.exit(0);
  }
}

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath.endsWith('/')) reqPath += 'index.html';
  let filePath = path.join(distDir, reqPath);

  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath += '.html';
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(0, '127.0.0.1', async () => {
  const port = server.address().port;

  const targets = [
    {
      url: `http://127.0.0.1:${port}/esp/`,
      filename: 'cv-faber-vergara-es.pdf',
      label: 'Spanish ATS CV (Hoja de Vida)',
    },
    {
      url: `http://127.0.0.1:${port}/`,
      filename: 'cv-faber-vergara-en.pdf',
      label: 'English ATS Resume',
    },
  ];

  try {
    for (const target of targets) {
      const publicOutput = path.join(publicDir, target.filename);
      const distOutput = path.join(distDir, target.filename);

      console.log(`Generating ${target.label}...`);
      await new Promise((resolve, reject) => {
        const proc = spawn(chromePath, [
          '--headless',
          '--disable-gpu',
          '--no-pdf-header-footer',
          `--print-to-pdf=${distOutput}`,
          target.url,
        ]);
        proc.on('close', (code) => {
          if (code === 0) resolve();
          else reject(new Error(`Chrome exited with code ${code}`));
        });
        proc.on('error', reject);
      });

      // Also copy to public/ so it is committed and available for dev
      fs.copyFileSync(distOutput, publicOutput);
      console.log(`✓ Generated ${target.label} (${target.filename})`);
    }

    // Also create convenient defaults cv.pdf and resume.pdf
    fs.copyFileSync(path.join(distDir, 'cv-faber-vergara-es.pdf'), path.join(distDir, 'cv.pdf'));
    fs.copyFileSync(path.join(distDir, 'cv-faber-vergara-es.pdf'), path.join(publicDir, 'cv.pdf'));
    fs.copyFileSync(path.join(distDir, 'cv-faber-vergara-en.pdf'), path.join(distDir, 'resume.pdf'));
    fs.copyFileSync(path.join(distDir, 'cv-faber-vergara-en.pdf'), path.join(publicDir, 'resume.pdf'));
  } catch (err) {
    console.error('Error generating PDF:', err);
  } finally {
    server.close(() => {
      console.log('✓ Automatic ATS PDF generation complete.');
    });
  }
});
