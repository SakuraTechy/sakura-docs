<template>
  <div class="video-card" :class="{ 'is-playing': isPlaying }">
    <div class="video-container">
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
      
      <div class="overlay" @click="togglePlay">
        <div class="play-icon" v-if="!isPlaying">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"></path>
          </svg>
        </div>
      </div>
      
      <div class="controls">
        <div class="progress-bar-container">
          <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
        </div>
        
        <div class="control-buttons">
          <button class="control-btn" @click.stop="togglePlay">
            <svg v-if="isPlaying" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"></path>
            </svg>
          </button>
          
          <div class="time">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</div>
          
          <button class="control-btn" @click.stop="toggleMute">
            <svg v-if="isMuted" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
            </svg>
          </button>
          
          <button class="control-btn fullscreen-btn" @click.stop="toggleFullscreen">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <div class="video-info">
      <h3 class="video-title">{{ title }}</h3>
      <p class="video-subtitle">{{ subtitle }}</p>
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
const currentTime = ref(0)
const duration = ref(0)

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

const updateProgress = () => {
  if (!videoRef.value) return
  currentTime.value = videoRef.value.currentTime
  duration.value = videoRef.value.duration
  const value = (currentTime.value / duration.value) * 100
  progress.value = isNaN(value) ? 0 : value
}

const formatTime = (seconds) => {
  if (isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
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
  videoRef.value.addEventListener('loadedmetadata', () => {
    duration.value = videoRef.value.duration
  })
  
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

onUnmounted(() => {
  if (videoRef.value) {
    videoRef.value.removeEventListener('timeupdate', updateProgress)
  }
})
</script>

<style scoped>
.video-card {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.video-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.video-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 比例 */
  overflow: hidden;
}

.video-element {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.4));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-container:hover .overlay,
.is-playing .overlay {
  opacity: 1;
}

.play-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.play-icon:hover {
  transform: scale(1.1);
  background-color: rgba(255, 255, 255, 0.3);
}

.play-icon svg {
  width: 30px;
  height: 30px;
  color: white;
  margin-left: 3px;
}

.controls {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-container:hover .controls,
.is-playing .controls {
  opacity: 1;
}

.progress-bar-container {
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.3);
}

.progress-bar {
  height: 100%;
  background-color: #6f68e0;
  transition: width 0.1s linear;
}

.control-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
}

.control-btn {
  width: 36px;
  height: 36px;
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

.time {
  color: white;
  font-size: 12px;
  font-family: monospace;
}

.video-info {
  padding: 15px 20px;
}

.video-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 5px 0;
  color: #333;
}

.video-subtitle {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

@media (max-width: 768px) {
  .play-icon {
    width: 50px;
    height: 50px;
  }
  
  .play-icon svg {
    width: 25px;
    height: 25px;
  }
  
  .time {
    display: none;
  }
  
  .control-buttons {
    padding: 8px 12px;
  }
  
  .control-btn {
    width: 32px;
    height: 32px;
  }
  
  .control-btn svg {
    width: 18px;
    height: 18px;
  }
}
</style> 