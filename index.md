---
layout: home

title: Sakura
titleTemplate: Automation Testing, Can Be Simpler

hero:
  name: Sakura Automation Platform
  text: "Technology achieve the future, automation make work simpler and more efficient"
  tagline: "Every detail is carefully crafted, only to provide a better user experience"
  actions:
    - theme: brand
      text: Product Introduction
      link: /1.使用指南/1.产品简介/index.md
    - theme: alt
      text: Quick Start
      link: /1.使用指南/2.快速开始/index.md
    - theme: alt
      text: Online Experience
      link: https://www.sakura.hk.cn:28383
    # - theme: cta mastering-pinia
    #   text: ' '
    #   link: https://masteringpinia.com

features:
  - title: ⚙️ System Management
    details: Manage systems, including system settings, system monitoring, system logs, etc.
  - title: 👤 User Management
    details: Manage users, including user information, user roles, user permissions, etc.
  - title: 📦 Project Management
    details: Manage projects, including project configuration, environment configuration, automation configuration, etc.
  - title: 📋 Test Management
    details: Manage tests, including test cases, test plans, test reports, test metrics, etc.
  - title: 📈 Interface Management
    details: Manage interfaces, including interface documentation, interface debugging, interface automation testing, etc.
  - title: 💡 Automation Management
    details: Manage automation testing, including WEB automation, APP automation, API automation, performance automation, etc.
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
/* node_modules\vitepress\dist\client\theme-default\components\VPNavBarTitle.vue --:deep(.logo)
node_modules\.pnpm\@arco-design+web-vue@2.55.3_vue@3.4.33\node_modules\@arco-design\web-vue\es\style\index.css --body {
node_modules\.pnpm\@arco-design+web-vue@2.55.3_vue@3.4.33\node_modules\@arco-design\web-vue\es\message\style\css.js --注释所有*/
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
