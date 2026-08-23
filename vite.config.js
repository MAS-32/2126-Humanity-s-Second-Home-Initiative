import { defineConfig } from 'vite';

// base 相对路径:产物可部署在任意子路径(GitHub Pages 项目页 / 嵌套路由),
// 域名根路径部署同样成立。跨页链接(outpost/、mars/)均为相对路径,与此一致。
export default defineConfig({
  base: './',
});
