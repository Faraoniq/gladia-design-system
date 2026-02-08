import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

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
  plugins: [react(), prototypesApi()],
  server: {
    strictPort: false
  },
  build: {
    rollupOptions: {
      input: 'ds-viewer.html'
    }
  }
})
