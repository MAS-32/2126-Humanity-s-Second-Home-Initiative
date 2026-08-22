import { defineConfig } from 'vite';

// 《2126：人类第二家园计划》· 火星子模块
// base 默认 './'：产物使用相对路径，可部署在任意子路径（GitHub Pages / 总工程嵌套路由）。
// 若部署在域名根目录或自有平台，可设 VITE_BASE='/' 或具体子路径。
export default defineConfig({
  base: process.env.VITE_BASE || './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
  },
  server: {
    host: true,        // 允许局域网/容器访问
    port: 5173,
    open: false,
  },
  preview: {
    host: true,
    port: 4173,
  },
});
