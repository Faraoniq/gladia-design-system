import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

function copyStaticFiles() {
  return {
    name: 'copy-static-files',
    closeBundle() {
      const dist = path.resolve('dist');
      const root = path.resolve('.');
      // Copy static HTML files
      for (const file of ['index.html', 'builder.html']) {
        const src = path.join(root, file);
        if (fs.existsSync(src)) fs.copyFileSync(src, path.join(dist, file));
      }
      // Copy fonts directory
      const fontsDir = path.join(root, 'fonts');
      const distFonts = path.join(dist, 'fonts');
      if (fs.existsSync(fontsDir)) {
        if (!fs.existsSync(distFonts)) fs.mkdirSync(distFonts, { recursive: true });
        for (const f of fs.readdirSync(fontsDir)) {
          fs.copyFileSync(path.join(fontsDir, f), path.join(distFonts, f));
        }
      }
    }
  };
}

function prototypesApi() {
  const file = path.resolve('prototypes.json');
  return {
    name: 'prototypes-api',
    configureServer(server) {
      server.middlewares.use('/api/prototypes', (req, res) => {
        if (req.method === 'GET') {
          let data = '[]';
          try { data = fs.readFileSync(file, 'utf-8'); } catch {}
          res.setHeader('Content-Type', 'application/json');
          res.end(data);
        } else if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            fs.writeFileSync(file, body, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end('{"ok":true}');
          });
        } else {
          res.statusCode = 405;
          res.end();
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), prototypesApi(), copyStaticFiles()],
  server: {
    strictPort: false
  },
  build: {
    rollupOptions: {
      input: 'ds-viewer.html'
    }
  }
})
