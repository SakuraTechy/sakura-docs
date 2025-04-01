<template>
  <div class="hero-video-container" :class="{ 'is-playing': isPlaying }">
    <video 
      ref="videoRef"
      loop 
      :muted="isMuted" 
      playsinline 
      :poster="poster"
      class="video-element"
      preload="metadata"
    >
      <source :src="src" type="video/mp4">
    </video>
    
    <div class="hero-overlay">
      <div class="hero-content" v-if="!isPlaying">
        <h1 class="hero-title">{{ title }}</h1>
        <p class="hero-subtitle">{{ subtitle }}</p>
        <button class="play-button" @click="togglePlay">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"></path>
          </svg>
          <span>观看视频</span>
        </button>
      </div>
      
      <div class="hero-controls" v-if="isPlaying">
        <button class="control-btn" @click="togglePlay">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
          </svg>
        </button>
        
        <div class="progress-container" @click="seekVideo">
          <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
        </div>
        
        <button class="control-btn" @click="toggleMute">
          <svg v-if="isMuted" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
          </svg>
        </button>
        
        <button class="control-btn fullscreen-btn" @click="toggleFullscreen">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

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
const progress = ref(0)

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

const seekVideo = (event) => {
  if (!videoRef.value) return
  const rect = event.currentTarget.getBoundingClientRect()
  const pos = (event.clientX - rect.left) / rect.width
  videoRef.value.currentTime = pos * videoRef.value.duration
}

const updateProgress = () => {
  if (!videoRef.value) return
  const value = (videoRef.value.currentTime / videoRef.value.duration) * 100
  progress.value = isNaN(value) ? 0 : value
}

const toggleFullscreen = () => {
  const container = videoRef.value.parentElement
  
  if (!document.fullscreenElement) {
    container.requestFullscreen().catch(err => {
      console.warn(`全屏请求失败: ${err.message}`)
    })
  } else {
    document.exitFullscreen()
  }
}

onMounted(() => {
  if (!videoRef.value) return
  
  videoRef.value.addEventListener('timeupdate', updateProgress)
  
  if (props.lazyLoad) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 只预加载，不自动播放
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })
    
    observer.observe(videoRef.value)
  }
})

onUnmounted(() => {
  if (videoRef.value) {
    videoRef.value.removeEventListener('timeupdate', updateProgress)
  }
})
</script>

<style scoped>
.hero-video-container {
  position: relative;
  width: 100%;
  height: 80vh;
  min-height: 500px;
  max-height: 800px;
  overflow: hidden;
  margin-bottom: 40px;
}

.video-element {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%);
  transition: background 0.5s ease;
}

.is-playing .hero-overlay {
  background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 100%);
  justify-content: flex-end;
}

.hero-content {
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 20px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  background: linear-gradient(120deg, #ffffff, #e0e0e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 40px;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  opacity: 0.9;
}

.play-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 30px;
  background: linear-gradient(90deg, #6f68e0, #9c64a6);
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 5px 15px rgba(111, 104, 224, 0.4);
}

.play-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(111, 104, 224, 0.6);
}

.play-button svg {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.hero-controls {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px 40px;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
}

.control-btn {
  width: 44px;
  height: 44px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease;
}

.control-btn:hover {
  transform: scale(1.1);
}

.control-btn svg {
  width: 28px;
  height: 28px;
}

.progress-container {
  flex: 1;
  height: 6px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  margin: 0 20px;
  cursor: pointer;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #6f68e0, #9c64a6);
  border-radius: 3px;
  transition: width 0.1s linear;
}

@media (max-width: 768px) {
  .hero-video-container {
    height: 60vh;
    min-height: 400px;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .hero-controls {
    padding: 15px 20px;
  }
  
  .control-btn {
    width: 40px;
    height: 40px;
  }
  
  .control-btn svg {
    width: 24px;
    height: 24px;
  }
}
</style> 
