<template>
  <div class="video-card" :class="{ 'expanded': expanded }">
    <div class="card-header" @click="toggleExpand">
      <div class="card-title">
        <h3>{{ title }}</h3>
        <p>{{ subtitle }}</p>
      </div>
      <div class="expand-icon">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path v-if="expanded" d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path>
          <path v-else d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
        </svg>
      </div>
    </div>
    
    <div class="card-content">
      <div class="video-wrapper">
        <video 
          ref="videoRef"
          loop 
          muted 
          playsinline 
          :poster="poster"
          class="video-element"
          preload="metadata"
        >
          <source :src="src" type="video/mp4">
        </video>
        
        <div class="video-controls">
          <button class="control-btn" @click="togglePlay">
            <svg v-if="isPlaying" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"></path>
            </svg>
          </button>
          
          <div class="progress-bar-container">
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
      
      <div class="card-description">
        <p>{{ description }}</p>
      </div>
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
  description: { type: String, default: '这是一段关于视频内容的详细描述，可以包含产品特点、使用场景等信息。' },
  lazyLoad: { type: Boolean, default: true }
})

const videoRef = ref(null)
const isPlaying = ref(false)
const isMuted = ref(true)
const progress = ref(0)
const expanded = ref(false)

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

const toggleExpand = () => {
  expanded.value = !expanded.value
  
  // 如果展开并且视频没有播放，则开始播放
  if (expanded.value && !isPlaying.value && videoRef.value) {
    videoRef.value.play()
      .then(() => { isPlaying.value = true })
      .catch(err => console.warn('视频播放失败:', err))
  }
}

const toggleFullscreen = () => {
  if (!videoRef.value) return
  
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    videoRef.value.requestFullscreen()
  }
}

const updateProgress = () => {
  if (!videoRef.value) return
  const value = (videoRef.value.currentTime / videoRef.value.duration) * 100
  progress.value = isNaN(value) ? 0 : value
}

onMounted(() => {
  if (!videoRef.value) return
  
  videoRef.value.addEventListener('timeupdate', updateProgress)
  
  if (props.lazyLoad) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && expanded.value) {
          videoRef.value.play()
            .then(() => { isPlaying.value = true })
            .catch(err => console.warn('视频自动播放失败:', err))
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })
    
    observer.observe(videoRef.value)
  }
})
</script>

<style scoped>
.video-card {
  width: 100%;
  max-width: 800px;
  margin: 0 auto 30px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.video-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: #f8f9fa;
  cursor: pointer;
  border-bottom: 1px solid #eaeaea;
}

.card-title h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

.card-title p {
  margin: 4px 0 0;
  font-size: 0.9rem;
  color: #666;
}

.expand-icon {
  width: 24px;
  height: 24px;
  color: #666;
  transition: transform 0.3s ease;
}

.expanded .expand-icon {
  transform: rotate(180deg);
}

.card-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease;
}

.expanded .card-content {
  max-height: 1000px;
}

.video-wrapper {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 比例 */
}

.video-element {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-wrapper:hover .video-controls {
  opacity: 1;
}

.control-btn {
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.control-btn svg {
  width: 20px;
  height: 20px;
}

.progress-bar-container {
  flex: 1;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  margin: 0 10px;
  cursor: pointer;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #6f68e0;
  border-radius: 2px;
}

.card-description {
  padding: 16px 20px;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #444;
}
</style> 