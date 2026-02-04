import { defineConfig } from 'vitepress'
import { resolve } from 'path'
import { vitepressDemoPlugin } from 'vitepress-demo-plugin';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "react-book-reader",
  description: "react-book-reader document",
  base: '/react-book-reader/',
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    nav: [{
      text: "Guide", link: "/guide/introduction"
    }],
    sidebar: [
      {
        text: 'Guide',
        items: [
          {
            text: "Introduction", link: '/guide'
          },
        ],
      },
      {
        text: "Tips",
        items: [
          { text: 'page number', link: 'tips/page_number' },
          { text: 'custom css', link: 'tips/custom_css' },
          { text: 'smooth scroll', link: 'tips/smooth_scroll' },
          { text: 'scrolled', link: 'tips/scrolled' },
          { text: 'book information', link: 'tips/book_information' },
          { text: 'import file', link: 'tips/import_file' },
          { text: 'pdf file', link: 'tips/pdf_file' },
        ],
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/jinhuan138/react-book-reader' }
    ],
    search: {
      provider: 'local',
    },

  },
  markdown: {
    config(md) {
      md.use(vitepressDemoPlugin, {
        lightTheme: 'github-light',
        darkTheme: 'github-dark',
      });
    },
  },
  vite: {
    publicDir: resolve(__dirname, "../../public"),
  }
})
