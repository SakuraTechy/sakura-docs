import { defineConfig } from 'vitepress'
import { enConfig } from './en'
import { sharedConfig } from './shared'
import { zhConfig } from './zh'
import { chineseSearchOptimize, pagefindPlugin } from 'vitepress-plugin-pagefind'

export default defineConfig({
  ...sharedConfig,

  vite: {
    // https://github.com/ATQQ/sugar-blog/blob/master/packages/vitepress-plugin-pagefind/README-zh.md
    // plugins: [pagefindPlugin({
    //   //国际化
    //   locales: {
    //     root:{
    //       btnPlaceholder: 'Search',
    //       placeholder: 'Search Docs...',
    //       emptyText: 'No results',
    //       heading: 'Total: {{searchResult}} search results.',
    //     },
    //     zh: {
    //       btnPlaceholder: '搜索',
    //       placeholder: '搜索文档',
    //       emptyText: '空空如也',
    //       heading: '共: {{searchResult}} 条结果',
    //       // 搜索结果不展示最后修改日期日期
    //       showDate: false
    //     }
    //   },
    //   //生成文章检索时排除一些元素
    //   excludeSelector:['img','a.header-anchor'],
    //   //中文，推荐做以下设置，优化一下搜索
    //   customSearchQuery: chineseSearchOptimize,
    //   //搜索结果优化
    //   resultOptimization: false,
    //   //自定义搜索结果过滤规则
    //   filter(searchItem, idx, originArray) {
    //     console.log(searchItem);
    //     return !searchItem.route.includes('404') 
    //   }
    // })],
    server: {
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ['../..']
      }
    },
  },
  locales: {
    root: { label: 'English', lang: 'en-US', link: '/', ...enConfig },
    zh: { label: '简体中文', lang: 'zh-CN', link: '/src/zh', ...zhConfig },
    // es: {
    //   label: 'Español',
    //   lang: 'es-ES',
    //   link: 'https://es-pinia.vercel.app/',
    // },
    // ko: {
    //   label: '한국어',
    //   lang: 'ko-KR',
    //   link: 'https://pinia.vuejs.kr/',
    // },
    // pt: {
    //   label: 'Português',
    //   lang: 'pt-PT',
    //   link: 'https://pinia-docs-pt.netlify.app/',
    // },
    // uk: {
    //   label: 'Українська',
    //   lang: 'uk-UA',
    //   link: 'https://pinia-ua.netlify.app',
    // },
    // ru: {
    //   label: 'Русский',
    //   lang: 'ru-RU',
    //   link: 'https://pinia-ru.netlify.app',
    // },
  },
})
