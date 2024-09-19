import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fixReactVirtualized from 'esbuild-plugin-react-virtualized'
// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      plugins: [fixReactVirtualized],
    },
  },
  plugins: [react(),fixReactVirtualized],
  server:{
    port: 1232
  }
})
