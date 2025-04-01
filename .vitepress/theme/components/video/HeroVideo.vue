<template>
  <div class="hero-video-container">
    <video 
      ref="videoRef"
      loop 
      muted 
      playsinline 
      :poster="poster"
      class="hero-video"
      preload="metadata"
    >
      <source :src="src" type="video/mp4">
    </video>
    
    <div class="hero-content">
      <div class="hero-text">
        <h1 class="hero-title">{{ title }}</h1>
        <p class="hero-subtitle">{{ subtitle }}</p>
        <div class="hero-buttons">
          <slot name="buttons">
            <button class="hero-btn primary" @click="scrollToContent">了解更多</button>
            <button class="hero-btn secondary" @click="togglePlay">
              {{ isPlaying ? '暂停' : '播放' }}
            </button>
          </slot>
        </div>
      </div>
      
      <div class="scroll-indicator" @click="scrollToContent">
        <span>向下滚动</span>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
        </svg>
      </div>
    </div>
    
    <div class="video-controls">
      <button class="control-btn" @click="togglePlay">
        <svg v-if="isPlaying" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"></path>
        </svg>
      </button>
      
      <button class="control-btn" @click="toggleMute">
        <svg v-if="isMuted" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path>
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  poster: { type: String, default: '' },
  title: { type: String, default: '产品演示' },
  subtitle: { type: String, default: '探索创新科技' },
  lazyLoad: { type: Boolean, default: true }
})

const videoRef = ref(null)
const isPlaying = ref(false)
const isMuted = ref(true)

const togglePlay = () => {
  if (!videoRef.value) return
  
  if (isPlaying.value) {
    videoRef.value.pause()
    isPlaying.value = false
  } else {
    videoRef.value.play()
      .then(() => { isPlaying.value = true })
      .catch(err => console.warn('视频播放失败:', err))
  }
}

const toggleMute = () => {
  if (!videoRef.value) return
  videoRef.value.muted = !videoRef.value.muted
  isMuted.value = videoRef.value.muted
}

const scrollToContent = () => {
  const contentElement = document.querySelector('.features')
  if (contentElement) {
    contentElement.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  if (!videoRef.value) return
  
  if (props.lazyLoad) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          videoRef.value.play()
            .then(() => { isPlaying.value = true })
            .catch(err => console.warn('视频自动播放失败:', err))
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })
    
    observer.observe(videoRef.value)
  } else {
    videoRef.value.play()
      .then(() => { isPlaying.value = true })
      .catch(err => console.warn('视频自动播放失败:', err))
  }
})
</script>

<style scoped>
.hero-video-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.6);
}

.hero-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.hero-text {
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 20px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  background: linear-gradient(120deg, #f16d9c 0%, #5D67E8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.hero-subtitle {
  font-size: 1.5rem;
  line-height: 1.5;
  margin-bottom: 40px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.hero-btn {
  padding: 12px 28px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.primary {
  background-color: #6f68e0;
  color: white;
}

.secondary {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
}

.video-controls {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
}

.control-btn {
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.control-btn svg {
  width: 24px;
  height: 24px;
}

.scroll-indicator {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  cursor: pointer;
}

.scroll-indicator span {
  font-size: 1.2rem;
  font-weight: 600;
}

.scroll-indicator svg {
  width: 24px;
  height: 24px;
}
</style> 