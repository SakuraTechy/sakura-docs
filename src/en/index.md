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
      link: /src/zh/1.使用指南/1.产品简介/index.md
    - theme: alt
      text: Quick Start
      link: /src/zh/1.使用指南/2.快速开始/index.md
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
import { onMounted, onBeforeUnmount, ref, h, createApp, defineAsyncComponent } from 'vue'
// import VideoGlass from '/.vitepress/theme/components/Video/VideoGlass.vue'
// import CustomVideo from '/.vitepress/theme/components/video/CustomVideo.vue'
import VideoGlass from '/public/icon/VideoGlass.vue'

onMounted(() => {
  // 获取hero和features容器
  const heroSection = document.querySelector('.VPHero')
  const featuresSection = document.querySelector('.VPFeatures')
  const videoContainer = document.querySelector('.video-container')
  
  if (heroSection && featuresSection && videoContainer) {
    // 将视频容器移动到hero和features之间
    heroSection.parentNode.insertBefore(videoContainer, featuresSection)
  }
})
</script>

<div class="video-container" style="display:none;">
  <div class="video-wrapper">
    <VideoGlass
      src="https://thumbs-eu-west-1.myalbum.io/video/1k0_h264/98e67050-f5fd-4fd3-bd58-802a37e92a13.mp4",
      poster="/video/sakura.png"
      title="科技成就未来"
      subtitle="自动化将使工作更简单高效"
      width="100%"
      height="auto"
      maxWidth="1200px"
      :autoplay="false"
    />
  </div>
</div>

<style>

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

.VPHero {
  padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px) 64px 40px !important;
}

.VPContent.is-home{
  padding-top: 40px;
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

.video-container {
  display: block !important;
}

.video-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 40px;
}

.VPFeatures {
  position: relative;
  z-index: 10;
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

@media (min-width: 640px) {
  .video-wrapper {
    padding: 0 48px 40px;
  }
}

@media (min-width: 960px) {
  .video-wrapper {
    padding: 0 64px 40px;
  }
}
</style>
