import fixReactVirtualized from 'esbuild-plugin-react-virtualized'
import { defineConfig, AliasOptions } from "vite";
import react from "@vitejs/plugin-react-swc";
//@ts-expect-error import
import path from "path";
//@ts-expect-error import
const root = path.resolve(__dirname, "src");
// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      plugins: [fixReactVirtualized],
    },
  },
  build:{
    outDir: './site',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      "@": root
    } as AliasOptions
  },
  plugins: [react(),fixReactVirtualized],
  server:{
    port: 1232
  }
})
