import { defineConfig } from 'dumi';

//https://d.umijs.org
export default defineConfig({
  base:'react-book-reader',
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'react-book-reader',
    logo: "/logo.png",
    nav: [{ title: 'guide', link: '/introduction' }],
  },
  jsMinifierOptions: {
    target: 'es2020',
  },
});
