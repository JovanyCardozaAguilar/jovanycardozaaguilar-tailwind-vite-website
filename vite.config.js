import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import fg from 'fast-glob';

export default defineConfig({
  plugins: [tailwindcss()],
  base: '/',
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        fg.sync(['**/*.html'], { ignore: ['dist/**', 'node_modules/**'] }).map(file => [
          // This creates a key like "blog/post1" from "blog/post1.html"
          file.slice(0, -5).replace(/\\/g, '/'),
          resolve(__dirname, file)
        ])
      )
    }
  }
});
