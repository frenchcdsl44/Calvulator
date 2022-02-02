import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


const build = {
    outDir: 'docs'
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build
})


