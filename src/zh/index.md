---
layout: home

title: Sakura
titleTemplate: Automation Testing，Can Be Simpler

hero:
  name: Sakura Automation Platform
  # text: "自动化测试，可以更简单"
  text: "科技成就未来，自动化将使工作更简单，高效"
  tagline: "每一个细节，都经过精心打磨，只为提供更好的用户体验"
  # image:
  #   src: /logo.svg
  #   alt: Pinia
  actions:
    - theme: brand
      text: 产品介绍
      link: /src/zh/1.使用指南/1.产品简介/index.md
    - theme: alt
      text: 快速开始
      link: /src/zh/1.使用指南/2.快速开始/index.md
    - theme: alt
      text: 在线体验
      link: https://www.sakura.hk.cn:28383
    # - theme: cta mastering-pinia
    #   text: ' '
    #   link: https://masteringpinia.com
    # - theme: cta vueschool
    #   text: 观看视频介绍
    #   link: https://vueschool.io/lessons/introduction-to-pinia?friend=vuerouter&utm_source=pinia&utm_medium=link&utm_campaign=homepage
    # - theme: cta vue-mastery
    #   text: 获取 Pinia 速查表
    #   link: https://www.vuemastery.com/pinia?coupon=PINIA-DOCS&via=eduardo

features:
  # - icon:
  #     src: /logo.svg
  #   title: 保持专注
  #   details: “简单比复杂更难，你必须努力让你的想法变得清晰明了，让它变得简单。一旦你做到了简单，你就能搬动大山。” -- 乔布斯
  - title: ⚙️ 系统管理
    details: 管理系统，包括系统设置、系统监控、系统日志等
  - title: 👤 用户管理
    details: 管理用户，包括用户信息、用户角色、用户权限等
  - title: 📦 项目管理
    details: 管理项目，包括项目配置，环境配置，自动化配置等
  - title: 📋 测试管理
    details: 管理测试，包括测试用例，测试计划，测试报告，测试度量等
  - title: 📊 接口管理
    details: 管理接口，包括接口文档，接口调试，接口自动化测试等
  - title: 💡 自动化管理
    details: 管理自动化测试，包括APP自动化，WEB自动化，API自动化，性能自动化等
---

<script setup>
import HomeSponsors from '/.vitepress/theme/components/HomeSponsors.vue'
</script>

<!-- <HomeSponsors /> -->

<style>
/* .VPImage.logo{
  width: 35px !important;
  height: 35px !important;
  margin-right: 0px !important;
} */
.VPContent.is-home{
  padding-top: 40px;
  /* background: url("/bg.svg") center center / cover no-repeat; */
  .VPHome {
    margin-bottom: 30px;
  }
  .main {
    .name {
      max-width: 100%;
      font-size: 50px;
      margin: 30px 0;
      .clip {
        background: linear-gradient(120deg, #f16d9c 0%, #5D67E8);
        /* background: var(--vp-home-hero-name-background); */
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .text {
      max-width: 100%;
      font-size: 30px;
    }
    .tagline {
      max-width: 100%;
      font-size: 22px;
    }
  }
}
.VPButton.brand {
    border-color: #e5e7eb !important;
    color: #ffffff !important;
    background-color: #6f68e0 !important;
    border-width: 1px !important;
}
.VPButton.alt{
    border-color: #e5e7eb !important;
    color: #3c3c43 !important;
    background-color: #ffffff !important;
    border-width: 1px !important;
}
.VPButton.alt:hover {
    border-color: #0000 !important;
    color: #3c3c43 !important;
    background-color: #e4e4e9 !important;
}
.VPFooter {
    padding: 12px !important;
}

:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #f16d9c 0%, #5D67E8);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);

  --vp-button-alt-bg: var(--vp-c-default-4);
  --vp-button-brand-active-border: #453fa4;
  --c-yellow-1: #453fa4;
  --c-yellow-2: #6f68e0;
  --c-black-darker: #f8f8f8;
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
