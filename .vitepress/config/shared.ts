import { defineConfig, HeadConfig } from 'vitepress'
import { zhSearch } from './zh'
import mdItCustomAttrs  from 'markdown-it-custom-attrs'

export const META_IMAGE = 'https://pinia.vuejs.org/social.png'
export const isProduction =
  process.env.NETLIFY && process.env.CONTEXT === 'production'

if (process.env.NETLIFY) {
  console.log('Netlify build', process.env.CONTEXT)
}

const productionHead: HeadConfig[] = []

const rControl = /[\u0000-\u001f]/g
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g
const rCombining = /[\u0300-\u036F]/g

/**
 * Default slugification function
 */
export const slugify = (str: string): string =>
  str
    .normalize('NFKD')
    // Remove accents
    .replace(rCombining, '')
    // Remove control characters
    .replace(rControl, '')
    // Replace special characters
    .replace(rSpecial, '-')
    // ensure it doesn't start with a number
    .replace(/^(\d)/, '_$1')

export const sharedConfig = defineConfig({
  base: '/',

  lang: 'zh-CN',
  title: 'Sakura',
  appearance: 'dark',
  
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  ignoreDeadLinks: true, // 忽略死链检查

  markdown: {
    //vitepress 图片放大预览配置:https://www.npmjs.com/package/markdown-it-custom-attrs
    config: (md) => {
      md.use(mdItCustomAttrs, 'image', {
          'data-fancybox': "gallery"
      })
    },
    theme: {
      dark: 'dracula-soft',
      light: 'vitesse-light',
    },

    attrs: {
      leftDelimiter: '%{',
      rightDelimiter: '}%',
    },

    anchor: {
      slugify,
    },
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],
    [
      "link",
      { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css" },
    ],
    ["script", { src: "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js" }],
    [
      'meta',
      { name: 'wwads-cn-verify', content: '5878a7ab84fb43402106c575658472fa' },
    ],

    [
      'meta',
      {
        property: 'og:type',
        content: 'website',
      },
    ],

    [
      'meta',
      {
        property: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    [
      'meta',
      {
        property: 'twitter:image',
        content: META_IMAGE,
      },
    ],

    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'KFPPRRIS',
        'data-spa': 'auto',
        defer: '',
      },
    ],

    // Vue School Top banner
    // [
    //   'script',
    //   {
    //     src: 'https://vueschool.io/banner.js?affiliate=vuerouter&type=top',
    //     // @ts-expect-error: vitepress bug
    //     async: true,
    //     type: 'text/javascript',
    //   },
    // ],

    ...(isProduction ? productionHead : []),
  ],

  themeConfig: {
    logo: '/logo.svg',
    outline: [2, 3],

    socialLinks: [
      // { icon: 'x', link: 'https://twitter.com/posva' },
      {
        icon: 'github',
        // link: 'https://github.com/vuejs/pinia',
        link: 'https://github.com/SakuraTechy/Sakura.Automation.Platform.Api',
      },
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>码云</title><path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z"/></svg>'
        },
        // link: 'https://gitee.com/Charles7c/charles7c'
        link: 'https://gitee.com/SakuraTech/Sakura.Automation.Platform.Api'
      },
    ],

    footer: {
      message: 'Released under the Apache-2.0 License.',
      copyright: 'Copyright © 2019-2025 SakuraTechy',
      // copyright: 'Copyright © 2019-present Eduardo San Martin Morote',
      // copyright: 'Copyright © 2013-2024 微擎 皖ICP备19002904号-6',
      // copyright: '©2021 深圳昂楷科技有限公司 版权所有 | 粤ICP备09174373号',
    },

    editLink: {
      pattern: 'https://github.com/vuejs/pinia/edit/v2/packages/docs/:path',
      text: 'Suggest changes',
    },

    search: {
      provider: "local",
      options: {
        locales: { ...zhSearch },
        // translations: {
        //   button: {
        //     buttonText: "搜索",
        //     buttonAriaLabel: "搜索",
        //   },
        //   modal: {
        //     noResultsText: "无法找到相关结果",
        //     resetButtonTitle: "清除查询条件",
        //     footer: {
        //       selectText: "选择",
        //       navigateText: "切换",
        //       closeText: '关闭'
        //     },
        //   },
        // },
      },
    },

    // algolia: {
    //   appId: '69Y3N7LHI2',
    //   apiKey: '45441f4b65a2f80329fd45c7cb371fea',
    //   indexName: 'pinia',
    // },
    
    // search: {
    //   provider: 'algolia',
    //   options: {
    //     appId: '69Y3N7LHI2',
    //     apiKey: '45441f4b65a2f80329fd45c7cb371fea',
    //     indexName: 'pinia',
    //     locales: { ...zhSearch },
    //   },
    // },

    carbonAds: {
      code: 'CEBICK3I',
      // custom: 'CEBICK3M',
      placement: 'routervuejsorg',
    },
  },
})
