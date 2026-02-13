import DefaultTheme from 'vitepress/theme'
import { EnhanceAppContext } from 'vitepress'
import pkg from '../../../package.json'
import '../styles/index.css'
console.log(
  `%c ${pkg.name} %c v`.concat(pkg.version, ' '),
  'background: #f44336; padding: 1px; border-radius: 3px 0 0 3px; color: #fff',
  'background: skyblue; padding: 1px; border-radius: 0 3px 3px 0; color: #fff'
)

export default {
  ...DefaultTheme,
  enhanceApp(ctx: EnhanceAppContext) {
    DefaultTheme.enhanceApp(ctx)
    const { app } = ctx
  },
}
