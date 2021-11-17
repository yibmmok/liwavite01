import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join, parse, resolve } from "path"

// https://vitejs.dev/config/
export default {
  plugins: [vue()],
  resolve: {
    alias: {
      "~": __dirname,
    }
  },
  build: {
    rollupOptions: {
      input: entryPoints(
        "index.html",
      ),
    },
  },
};

function entryPoints(...paths) {
  const entries = paths.map(parse).map(entry => {
    const { dir, base, name, ext } = entry;
    const key = join(dir, name);
    const path = resolve(__dirname, dir, base);
    return [key, path];
  });
  
  const config = Object.fromEntries(entries);
  console.log('config = ', config)
  return config;
}

