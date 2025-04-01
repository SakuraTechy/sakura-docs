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
  #   details: "简单比复杂更难，你必须努力让你的想法变得清晰明了，让它变得简单。一旦你做到了简单，你就能搬动大山。" -- 乔布斯
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
import { onMounted, onBeforeUnmount, ref, h, createApp } from 'vue'
import VideoGlass from '/.vitepress/theme/components/Video/VideoGlass.vue'

// 使用ref跟踪视频是否已添加
const videoAdded = ref(false)
// 控制视频是否显示
const showVideo = ref(false)

// 标记是否是从语言切换过来的
if (typeof window !== 'undefined') {
  window.__fromLanguageSwitch = window.__fromLanguageSwitch || false
}

// 清理所有视频容器的函数
const cleanupAllVideos = () => {
  if (typeof window !== 'undefined') {
    // 查找所有视频容器
    const videoContainers = document.querySelectorAll('.video-container')
    videoContainers.forEach(container => {
      container.remove()
    })
    
    // 查找所有视频挂载点
    const videoMounts = document.querySelectorAll('[id^="video-mount-"]')
    videoMounts.forEach(mount => {
      if (mount.parentNode) {
        mount.parentNode.remove()
      }
    })
    
    // 重置标记
    videoAdded.value = false
    
    // 清除全局标记
    if (window.__sakuraVideoAdded) {
      window.__sakuraVideoAdded = false
    }
  }
}

// 添加视频的函数
const addVideo = () => {
  console.log('添加视频函数被调用')
  
  // 检查全局标记
  if (typeof window !== 'undefined' && window.__sakuraVideoAdded) {
    console.log('视频已全局添加')
    return true
  }
  
  // 如果已添加，则不重复添加
  if (videoAdded.value) {
    console.log('视频已本地添加')
    return true
  }
  
  // 获取hero和features容器
  const heroSection = document.querySelector('.VPHero')
  const featuresSection = document.querySelector('.VPFeatures')
  
  if (heroSection && featuresSection) {
    console.log('找到hero和features部分')
    
    // 先清理所有现有的视频容器
    cleanupAllVideos()
    
    // 创建视频容器
    const videoContainer = document.createElement('div')
    videoContainer.className = 'video-container'
    videoContainer.setAttribute('data-lang', 'zh')
    videoContainer.style.cssText = showVideo.value ? 'display: block !important;' : 'display: none !important;'
    console.log('视频容器显示设置为:', videoContainer.style.display)
    
    // 创建视频挂载点
    videoContainer.innerHTML = `
      <div class="video-wrapper">
        <div id="video-mount-zh"></div>
      </div>
    `
    
    // 插入到hero和features之间
    heroSection.parentNode.insertBefore(videoContainer, featuresSection)
    console.log('视频容器已插入DOM')
    
    // 确保挂载点存在
    const mountPoint = document.getElementById('video-mount-zh')
    if (!mountPoint) {
      console.error('挂载点未找到')
      return false
    }
    
    try {
      // 使用Vue的动态组件挂载VideoGlass
      const videoApp = createApp({
        render() {
          return h(VideoGlass, {
            src: "/video/sakura.mp4",
            poster: "/video/sakura.png",
            title: "科技成就未来",
            subtitle: "自动化使工作更简单高效",
            qr_subtitle: "请扫描二维码获取更多信息",
            width: "100%",
            height: "auto",
            maxWidth: "1200px",
            autoplay: false
          })
        }
      })
      
      videoApp.mount('#video-mount-zh')
      console.log('VideoGlass组件挂载成功')
    } catch (error) {
      console.error('挂载VideoGlass组件时出错:', error)
      
      // 如果挂载失败，使用原生视频元素作为备选方案
      mountPoint.innerHTML = `
        <video 
          id="fallback-video" 
          controls 
          width="100%" 
          style="max-width: 1200px; margin: 0 auto; display: block; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);"
          poster="/video/sakura.png"
        >
          <source src="/video/sakura.mp4" type="video/mp4">
          您的浏览器不支持视频标签。
        </video>
      `
      console.log('已添加备选视频元素')
    }
    
    // 设置全局标记
    if (typeof window !== 'undefined') {
      window.__sakuraVideoAdded = true
    }
    
    // 设置本地标记
    videoAdded.value = true
    
    // 确保视频容器显示
    if (showVideo.value) {
      setTimeout(() => {
        const videoContainer = document.querySelector('.video-container')
        if (videoContainer) {
          videoContainer.style.cssText = 'display: block !important;'
          console.log('延迟后视频容器显示设置为block')
        }
      }, 500)
    }
    
    return true
  }
  
  return false
}

// 尝试添加视频的函数
const tryAddVideo = () => {
  console.log('尝试添加视频')
  
  // 如果是从语言切换过来的，直接添加视频
  if (typeof window !== 'undefined' && window.__fromLanguageSwitch) {
    console.log('从语言切换过来，直接添加视频')
    window.__fromLanguageSwitch = false
    addVideo()
    return
  }
  
  // 延迟添加视频，确保DOM已完全加载
  setTimeout(() => {
    addVideo()
  }, 500)
}

// 切换视频显示状态的函数
const toggleVideoDisplay = () => {
  console.log('切换视频显示状态')
  
  // 如果视频未添加，先添加视频
  if (!videoAdded.value) {
    console.log('视频未添加，先添加视频')
    if (!addVideo()) {
      console.error('添加视频失败')
      return
    }
  }
  
  // 切换显示状态
  showVideo.value = !showVideo.value
  console.log('视频显示状态切换为:', showVideo.value)
  
  // 获取视频容器
  const videoContainer = document.querySelector('.video-container')
  if (videoContainer) {
    // 设置显示状态
    if (showVideo.value) {
      videoContainer.style.cssText = 'display: block !important;'
    } else {
      videoContainer.style.cssText = 'display: none !important;'
    }
    console.log('视频容器显示设置为:', videoContainer.style.display)
  } else {
    console.error('未找到视频容器')
  }
}

// 设置语言切换监听器
const setupLanguageChangeListener = () => {
  if (typeof window !== 'undefined') {
    // 监听语言切换事件
    window.addEventListener('languagechange', () => {
      console.log('检测到语言切换')
      // 标记为从语言切换过来
      window.__fromLanguageSwitch = true
    })
  }
}

// 添加自定义按钮
const addCustomButton = () => {
  if (typeof window !== 'undefined') {
    // 获取按钮容器
    const buttonContainer = document.querySelector('.VPHero .actions')
    if (buttonContainer) {
      // 先移除所有已存在的自定义按钮
      const existingButtons = buttonContainer.querySelectorAll('.pinia-style-btn')
      existingButtons.forEach(button => {
        button.remove()
        console.log('已移除现有自定义按钮')
      })
      
      // 创建自定义按钮
      const customButton = document.createElement('button')
      customButton.className = 'pinia-style-btn ripple-btn'
      customButton.innerHTML = '<span class="btn-icon">▶</span><span class="btn-text">观看演示</span>'
      customButton.setAttribute('data-lang', 'zh') // 标记按钮语言
      customButton.onclick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log('自定义按钮被点击')
        toggleVideoDisplay()
        return false
      }
      
      // 添加到按钮容器
      buttonContainer.appendChild(customButton)
      console.log('已添加中文自定义按钮')
    }
  }
}

// 在组件挂载时
onMounted(() => {
  // 首先清理所有现有的视频容器
  cleanupAllVideos()
  
  // 然后添加当前语言的视频
  tryAddVideo()
  
  // 添加自定义按钮
  setTimeout(addCustomButton, 500)
  
  // 设置语言切换监听器
  setupLanguageChangeListener()
  
  // 监听路由变化
  if (typeof window !== 'undefined' && window.history) {
    // 保存原始方法
    const originalPushState = window.history.pushState
    
    // 重写pushState方法
    window.history.pushState = function() {
      const result = originalPushState.apply(this, arguments)
      // 在路由变化后清理所有视频
      cleanupAllVideos()
      // 尝试重新添加视频
      setTimeout(() => {
        tryAddVideo()
      }, 300)
      return result
    }
    
    // 添加全局调试函数
    window.toggleSakuraVideo = toggleVideoDisplay
    console.log('已添加全局调试函数: toggleSakuraVideo()')
  }
})

// 在组件卸载前清理
onBeforeUnmount(() => {
  cleanupAllVideos()
})
</script>

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

/* 视频容器样式 */
.video-container {
  /* display: none !important;
  position: relative;
  z-index: 20;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px 0;
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); */
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

/* Pinia 风格按钮 */
.pinia-style-btn {
  height: 40px;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  background-color: #222 !important;
  color: #fff !important;
  border-radius: 9999px !important;
  padding: 10px 15px !important;
  font-weight: 600 !important;
  font-size: 14px !important;
  line-height: 24px !important;
  border: none !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
  margin-left: 8px !important;
  position: relative !important;
  overflow: hidden !important;
  /* animation: button-shine 3s infinite !important; */
}

/* 按钮图标 */
.pinia-style-btn .btn-icon {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 20px !important;
  height: 20px !important;
  background-color: #f7df1e !important; /* 黄色背景 */
  color: #000 !important;
  border-radius: 50% !important;
  font-size: 11px !important;
  font-weight: bold !important;
}

/* 按钮文本 */
.pinia-style-btn .btn-text {
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
}

/* 按钮悬停效果 */
.pinia-style-btn:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4) !important;
  background-color: #000 !important;
}

/* 按钮激活效果 */
.pinia-style-btn:active {
  transform: translateY(1px) !important;
}

/* 光效动画 */
@keyframes button-shine {
  0% {
    background-image: linear-gradient(90deg, #222 0%, #222 100%);
  }
  15% {
    background-image: linear-gradient(90deg, #222 0%, #222 75%, rgba(255,255,255,0.5) 85%, #222 95%, #222 100%);
  }
  25% {
    background-image: linear-gradient(90deg, #222 0%, #222 65%, rgba(255,255,255,0.5) 75%, #222 85%, #222 100%);
  }
  35% {
    background-image: linear-gradient(90deg, #222 0%, #222 55%, rgba(255,255,255,0.5) 65%, #222 75%, #222 100%);
  }
  45% {
    background-image: linear-gradient(90deg, #222 0%, #222 45%, rgba(255,255,255,0.5) 55%, #222 65%, #222 100%);
  }
  55% {
    background-image: linear-gradient(90deg, #222 0%, #222 35%, rgba(255,255,255,0.5) 45%, #222 55%, #222 100%);
  }
  65% {
    background-image: linear-gradient(90deg, #222 0%, #222 25%, rgba(255,255,255,0.5) 35%, #222 45%, #222 100%);
  }
  75% {
    background-image: linear-gradient(90deg, #222 0%, #222 15%, rgba(255,255,255,0.5) 25%, #222 35%, #222 100%);
  }
  85% {
    background-image: linear-gradient(90deg, #222 0%, rgba(255,255,255,0.5) 15%, #222 25%, #222 100%);
  }
  100% {
    background-image: linear-gradient(90deg, #222 0%, #222 100%);
  }
}

/* 波纹扩散效果 - 更明显的版本 */
.ripple-btn {
  position: relative;
  z-index: 1;
  overflow: visible !important; /* 确保波纹可见 */
}

.ripple-btn::before,
.ripple-btn::after {
  content: '';
  position: absolute;
  top: 1px;
  left: 11px;
  right: 11px;
  bottom: 1px;
  border-radius: 9999px;
  background: linear-gradient(90deg, #f7df1e, #f16d9c, #5D67E8);
  z-index: -1;
  opacity: 0;
  transform: scale(0.8);
}

.ripple-btn::before {
  animation: ripple-border 2s ease-out infinite;
}

.ripple-btn::after {
  /* animation: ripple-border 2s ease-out 1s infinite; */
}

@keyframes ripple-border {
  0% {
    transform: scale(0.8);
    opacity: 0.8;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
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

@media (min-width: 640px) {
  .video-wrapper {
    padding: 0 48px 40px;
  }
  .actions {
    display: flex;
    align-items: center;
    margin: -6px;
    padding-top: 24px;
}
}

@media (min-width: 960px) {
  .video-wrapper {
    padding: 0 64px 40px;
  }
}
</style>