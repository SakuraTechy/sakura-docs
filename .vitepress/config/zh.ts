import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'
import versions from '../versions'

export const META_URL = 'https://pinia.vuejs.org'
export const META_TITLE = 'Pinia 🍍'
export const META_DESCRIPTION = '值得你喜欢的 Vue Store'
// TODO: translation of this
// 'Intuitive, type safe, light and flexible Store for Vue'

export const zhConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  lang: "zh-CN",
  description: META_DESCRIPTION,
  head: [
    ['meta', { property: 'og:url', content: META_URL }],
    ['meta', { property: 'og:description', content: META_DESCRIPTION }],
    ['meta', { property: 'twitter:url', content: META_URL }],
    ['meta', { property: 'twitter:title', content: META_TITLE }],
    ['meta', { property: 'twitter:description', content: META_DESCRIPTION }],
  ],

  themeConfig: {
    editLink: {
      pattern: 'https://github.com/SakuraTechy/sakura-docs/edit/dev/:path',
      text: '对本页提出修改建议',
    },

    outline: {
      level: 'deep', // 右侧大纲标题层级
      label: '本页内容', // 右侧大纲标题文本配置
    },

    returnToTopLabel: '返回顶部',
    lastUpdatedText: '最后更新', // 最后更新时间文本配置, 需先配置lastUpdated为true
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    nav: [
      // { text: 'Config', link: '/config/' },
      // { text: 'Plugins', link: '/plugins/' },
      {
        text: '使用指南',
        link: '/src/zh/1.使用指南/1.产品简介/index.md',
        activeMatch: '^/src/zh/1.使用指南/',
      },
      // {
      //   text: '使用手册',
      //   activeMatch: `^/([0-9]\.x)/`,
      //   items: versions.map((version) => ({
      //     text: version,
      //     link: `/${version}/`
      //   }))
      // },
      { text: '使用手册', link: '/src/zh/2.使用手册/0.流程图/index.html', activeMatch: '^/src/zh/2.使用手册/0.流程图/index.html' },
      { text: '常见问题', link: '/src/zh/3.其它/1.常见问题/index.html', activeMatch: '^/src/zh/3.其它/1.常见问题/index.html' },
      { text: '在线体验', link: 'https://www.sakura.hk.cn:28383/'},
      // {
      //   text: '相关链接',
      //   items: [
      //     {
      //       text: '论坛',
      //       link: 'https://github.com/vuejs/pinia/discussions',
      //     },
      //     {
      //       text: '更新日志',
      //       link: 'https://github.com/vuejs/pinia/blob/v2/packages/pinia/CHANGELOG.md',
      //     },
      //     {
      //       text: 'Vue.js 认证',
      //       link: 'https://certificates.dev/vuejs/?friend=VUEROUTER&utm_source=pinia_vuejs&utm_medium=link&utm_campaign=pinia_vuejs_links&utm_content=navbar',
      //     },
      //   ],
      // },
    ],
    sidebar: {
      '/src/zh/api/': [
        {
          text: 'packages',
          items: [
            { text: 'pinia', link: '/src/zh/api/modules/pinia.html' },
            { text: '@pinia/nuxt', link: '/src/zh/api/modules/pinia_nuxt.html' },
            {
              text: '@pinia/testing',
              link: '/src/zh/api/modules/pinia_testing.html',
            },
          ],
        },
      ],
      '/src/zh/': [
        {
          text: '使用指南',
          items: [
            {
              text: '产品简介',
              link: '/src/zh/1.使用指南/1.产品简介/index.html',
            },
            {
              text: '快速开始',
              link: '/src/zh/1.使用指南/2.快速开始/index.html',
            },
            {
              text: '本地开发',
              link: '/src/zh/1.使用指南/3.本地开发/index.html',
            },
            {
              text: '项目结构',
              link: '/src/zh/1.使用指南/4.项目结构/index.html',
            }
          ],
          collapsed: false,
        },
        {
          text: '使用手册',
          items: [
            { text: '流程图', link: '/src/zh/2.使用手册/0.流程图/index.html' },
            { text: '注册登录', link: '/src/zh/2.使用手册/1.注册登录/index.html' },
            {
              text: '项目管理',
              items: [
                { text: '项目配置', link: '/src/zh/2.使用手册/2.项目管理/1.项目配置/index.html' },
                { text: '环境配置', link: '/src/zh/2.使用手册/2.项目管理/2.环境配置/index.html' },
                { text: '自动化配置', link: '/src/zh/2.使用手册/2.项目管理/3.自动化配置/index.html' }
              ],
              collapsed: false,
            },
            {
              text: '测试管理',
              items: [
                { text: '测试场景', link: '/src/zh/2.使用手册/3.测试管理/1.测试场景/index.html' },
                { text: '测试计划', link: '/src/zh/2.使用手册/3.测试管理/2.测试计划/index.html' },
                { text: '测试报告', link: '/src/zh/2.使用手册/3.测试管理/3.测试报告/index.html' },
                { text: '定时任务', link: '/src/zh/2.使用手册/3.测试管理/4.定时任务/index.html' },
                { text: '测试度量', link: '/src/zh/2.使用手册/3.测试管理/5.测试度量/index.html' },
              ],
              collapsed: false,
            },
            {
              text: '接口管理',
              items: [
                { text: '接口测试', link: '/src/zh/2.使用手册/4.接口管理/1.接口测试/index.html' },
                // { text: '接口测试', link: 'https://wiki.runnergo.cn/docs' },
              ],
              collapsed: false,
            },
            {
              text: '自动化管理',
              items: [
                { text: 'UI自动化', link: '/src/zh/2.使用手册/5.自动化管理/1.UI自动化/index.html' },
              ],
              collapsed: false,
            }
          ],
          collapsed: false,
        },
        {
          text: '其它',
          items: [
            { text: '常见问题', link: '/src/zh/3.其它/1.常见问题/index.html' },
            { text: '问卷调查', link: '/src/zh/3.其它/2.问卷调查/index.html' },
          ],
          collapsed: false,
        },
      ],
    },
  },
}

export const zhSearch: DefaultTheme.AlgoliaSearchOptions['locales'] = {
  zh: {
    placeholder: '搜索',
    translations: {
      button: {
        buttonText: '搜索',
        buttonAriaLabel: '搜索',
      },
      modal: {
        searchBox: {
          resetButtonTitle: '清除查询条件',
          resetButtonAriaLabel: '清除查询条件',
          cancelButtonText: '取消',
          cancelButtonAriaLabel: '取消',
        },
        startScreen: {
          recentSearchesTitle: '搜索历史',
          noRecentSearchesText: '没有搜索历史',
          saveRecentSearchButtonTitle: '保存至搜索历史',
          removeRecentSearchButtonTitle: '从搜索历史中移除',
          favoriteSearchesTitle: '收藏',
          removeFavoriteSearchButtonTitle: '从收藏中移除',
        },
        errorScreen: {
          titleText: '无法获取结果',
          helpText: '你可能需要检查你的网络连接',
        },
        footer: {
          selectText: '选择',
          navigateText: '切换',
          closeText: '关闭',
          searchByText: '搜索供应商',
        },
        noResultsScreen: {
          noResultsText: '无法找到相关结果',
          suggestedQueryText: '你可以尝试查询',
          reportMissingResultsText: '你认为该查询应该有结果？',
          reportMissingResultsLinkText: '点击反馈',
        },
      },
    },
  },
}
