import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true
    }),
    AutoImport({ 
      imports: ['vue'],
      dts: 'src/auto-import.d.ts'
     }),
    Unocss({})
  ]
})
