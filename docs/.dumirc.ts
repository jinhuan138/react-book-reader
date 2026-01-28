import { defineConfig } from 'dumi';

//https://d.umijs.org
export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'react-book-reader',
    logo: "/logo.png",
    nav: false
  },
  jsMinifierOptions: {
    target: 'es2020',
  },
});
