import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { SourceMap } from 'module'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {SourceMap:true},
})
