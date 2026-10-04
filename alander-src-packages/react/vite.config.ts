import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Library build for publishing. Inside this repository the package is used
// straight from `src`; products install the built `dist`.
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
      cssFileName: 'styles',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
    sourcemap: true,
  },
})
