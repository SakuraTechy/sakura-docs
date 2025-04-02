<template>
  <div 
    class="video-container glass" 
    :class="{ 'is-playing': isPlaying, 'is-fullscreen': isFullscreen }"
    :style="{ 
      width: width, 
      height: height === 'auto' ? 'auto' : height,
      maxWidth: maxWidth
    }"
    ref="containerRef"
    @dblclick="toggleFullscreen"
  >
    <video 
      ref="videoRef"
      loop 
      :muted="isMuted" 
      playsinline 
      :poster="poster"
      class="video-element"
      preload="metadata"
      :autoplay="autoplay"
    >
      <source :src="src" type="video/mp4">
    </video>
    
    <div class="controls-overlay" @click="togglePlay">
      <div class="center-controls">
        <div class="play-button" v-if="!isPlaying && !hasPlayed">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"></path>
          </svg>
        </div>
        
        <!-- 只有在已经播放过且当前暂停时才显示视频信息 -->
        <div class="video-info" v-if="!isPlaying && hasPlayed">
          <p class="video-title">{{ title }}</p>
          <p class="video-subtitle">{{ subtitle }}</p>
          
          <!-- 二维码提示 -->
          <div class="qr-code-tip">
            <p>{{ qr_subtitle }}</p>
            <img src="/public/video/qrcode.png" alt="二维码" class="qr-code-image" />
          </div>
        </div>
      </div>
      
      <div class="control-bar">
        <button class="control-btn" @click.stop="togglePlay">
          <svg v-if="isPlaying" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"></path>
          </svg>
        </button>
        
        <div class="time-display">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</div>
        
        <div 
          class="progress-container" 
          ref="progressContainer"
          @mousedown.stop="handleProgressMouseDown"
          @mouseover="showProgressHandle = true"
          @mouseleave="showProgressHandle = isDragging ? true : false"
        >
          <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
          <div 
            class="progress-handle" 
            :style="{ left: `${progress}%` }" 
            :class="{ 'active': isDragging || showProgressHandle }"
          ></div>
        </div>
        
        <div class="volume-control">
          <button class="control-btn" @click.stop="toggleMute">
            <svg v-if="volumeIcon === 'muted'" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path>
            </svg>
            <svg v-else-if="volumeIcon === 'low'" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"></path>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
            </svg>
          </button>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.1" 
            v-model="volumeLevel" 
            class="volume-slider"
            @input="changeVolume"
          />
        </div>
        
        <div class="right-controls">
          <button class="control-btn speed-btn" @click.stop="toggleSpeedMenu">
            {{ playbackSpeed }}x
            <div class="speed-menu" v-if="showSpeedMenu">
              <div 
                v-for="speed in [0.5, 0.75, 1, 1.25, 1.5, 2]" 
                :key="speed"
                class="speed-option"
                :class="{ active: playbackSpeed === speed }"
                @click.stop="setPlaybackSpeed(speed)"
              >
                {{ speed }}x
              </div>
            </div>
          </button>
          
          <button class="control-btn fullscreen-btn" @click.stop="toggleFullscreen">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  poster: { type: String, default: '' },
  title: { type: String, default: '产品演示' },
  subtitle: { type: String, default: '探索创新科技' },
  qr_subtitle: { type: String, default: '更多请扫描二维码' },
  lazyLoad: { type: Boolean, default: true },
  width: { type: String, default: '100%' },
  height: { type: String, default: 'auto' },
  maxWidth: { type: String, default: '100%' },
  autoplay: { type: Boolean, default: false }
})

const videoRef = ref(null)
const containerRef = ref(null)
const progressContainer = ref(null)
const isPlaying = ref(false)
const hasPlayed = ref(false)
const isMuted = ref(true)
const isDragging = ref(false)
const showProgressHandle = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volumeLevel = ref(1)
const playbackSpeed = ref(1)
const showSpeedMenu = ref(false)
const isFullscreen = ref(false)
const cursorTimeout = ref(null)
const isCursorHidden = ref(false)

// 计算进度百分比
const progress = computed(() => {
  if (duration.value === 0) return 0
  return (currentTime.value / duration.value) * 100
})

// 格式化时间
const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

// 播放/暂停切换
const togglePlay = () => {
  const video = videoRef.value
  if (!video) return
  
  if (video.paused) {
    video.play()
    isPlaying.value = true
    hasPlayed.value = true
  } else {
    video.pause()
    isPlaying.value = false
  }
}

// 静音切换
const toggleMute = () => {
  isMuted.value = !isMuted.value
  if (videoRef.value) {
    videoRef.value.muted = isMuted.value
  }
}

// 更改音量
const changeVolume = () => {
  if (videoRef.value) {
    videoRef.value.volume = volumeLevel.value
  }
}

// 切换播放速度菜单
const toggleSpeedMenu = () => {
  showSpeedMenu.value = !showSpeedMenu.value
}

// 设置播放速度
const setPlaybackSpeed = (speed) => {
  playbackSpeed.value = speed
  if (videoRef.value) {
    videoRef.value.playbackRate = speed
  }
  showSpeedMenu.value = false
}

// 处理进度条点击
const handleProgressMouseDown = (e) => {
  isDragging.value = true
  showProgressHandle.value = true
  updateProgress(e)
  
  const handleMouseMove = (e) => {
    if (isDragging.value) {
      updateProgress(e)
    }
  }
  
  const handleMouseUp = () => {
    isDragging.value = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    
    // 如果鼠标不在进度条上，隐藏进度手柄
    if (!showProgressHandle.value) {
      showProgressHandle.value = false
    }
  }
  
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

// 更新进度
const updateProgress = (e) => {
  if (!progressContainer.value) return
  
  const rect = progressContainer.value.getBoundingClientRect()
  const offsetX = e.clientX - rect.left
  const percentage = Math.min(Math.max(offsetX / rect.width, 0), 1)
  
  if (videoRef.value) {
    videoRef.value.currentTime = percentage * duration.value
    currentTime.value = percentage * duration.value
  }
}

// 切换全屏
const toggleFullscreen = () => {
  if (!containerRef.value) return
  
  if (document.fullscreenElement) {
    document.exitFullscreen()
    isFullscreen.value = false
  } else {
    containerRef.value.requestFullscreen()
    isFullscreen.value = true
  }
  
  // 添加全屏状态类
  if (containerRef.value) {
    if (isFullscreen.value) {
      containerRef.value.classList.add('is-fullscreen')
    } else {
      containerRef.value.classList.remove('is-fullscreen')
    }
  }
}

// 修复音量图标显示问题
const volumeIcon = computed(() => {
  if (isMuted.value || volumeLevel.value === 0) {
    return 'muted'
  } else if (volumeLevel.value < 0.5) {
    return 'low'
  } else {
    return 'high'
  }
})

// 处理鼠标移动事件
const handleMouseMove = () => {
  if (!isFullscreen.value || !isPlaying.value) return
  
  // 清除之前的定时器
  if (cursorTimeout.value) {
    clearTimeout(cursorTimeout.value)
  }
  
  // 显示光标和控制条
  isCursorHidden.value = false
  if (containerRef.value) {
    containerRef.value.classList.remove('cursor-hidden')
  }
  
  // 设置新的定时器，3秒后隐藏光标和控制条
  cursorTimeout.value = setTimeout(() => {
    if (isFullscreen.value && isPlaying.value) {
      isCursorHidden.value = true
      if (containerRef.value) {
        containerRef.value.classList.add('cursor-hidden')
      }
    }
  }, 3000)
}

// 监听视频事件
onMounted(() => {
  const video = videoRef.value
  if (!video) return
  
  // 监听时间更新
  video.addEventListener('timeupdate', () => {
    currentTime.value = video.currentTime
  })
  
  // 监听元数据加载
  video.addEventListener('loadedmetadata', () => {
    duration.value = video.duration
  })
  
  // 监听播放状态变化
  video.addEventListener('play', () => {
    isPlaying.value = true
    hasPlayed.value = true
  })
  
  video.addEventListener('pause', () => {
    isPlaying.value = false
  })
  
  // 监听点击外部关闭速度菜单
  document.addEventListener('click', () => {
    showSpeedMenu.value = false
  })
  
  // 设置初始音量
  video.volume = volumeLevel.value
  video.muted = isMuted.value
  
  // 添加全屏变化监听
  document.addEventListener('fullscreenchange', () => {
    isFullscreen.value = !!document.fullscreenElement
    if (containerRef.value) {
      if (isFullscreen.value) {
        containerRef.value.classList.add('is-fullscreen')
      } else {
        containerRef.value.classList.remove('is-fullscreen')
      }
    }
  })
  
  // 添加鼠标移动事件监听
  if (containerRef.value) {
    containerRef.value.addEventListener('mousemove', handleMouseMove)
  }
})

// 清理事件监听
onUnmounted(() => {
  const video = videoRef.value
  if (!video) return
  
  video.removeEventListener('timeupdate', () => {})
  video.removeEventListener('loadedmetadata', () => {})
  video.removeEventListener('play', () => {})
  video.removeEventListener('pause', () => {})
  
  document.removeEventListener('click', () => {})
  document.removeEventListener('fullscreenchange', () => {})
  
  // 清理鼠标移动事件监听
  if (containerRef.value) {
    containerRef.value.removeEventListener('mousemove', handleMouseMove)
  }
  
  // 清理定时器
  if (cursorTimeout.value) {
    clearTimeout(cursorTimeout.value)
  }
})
</script>

<style scoped>
.video-container {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background-color: #000;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.glass {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.video-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.controls-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(to bottom, 
    rgba(0, 0, 0, 0.3) 0%, 
    rgba(0, 0, 0, 0) 30%,
    rgba(0, 0, 0, 0) 70%,
    rgba(0, 0, 0, 0.7) 100%);
  opacity: 1;
  transition: opacity 0.3s ease;
}

.video-container.is-playing.is-fullscreen .controls-overlay {
  opacity: 0;
}

.video-container.is-playing.is-fullscreen:hover .controls-overlay {
  opacity: 1;
}

.center-controls {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.play-button {
  width: 80px;
  height: 80px;
  background-color: rgba(111, 104, 224, 0.8);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.play-button:hover {
  transform: scale(1.1);
  background-color: rgba(111, 104, 224, 1);
}

.play-button svg {
  width: 40px;
  height: 40px;
  fill: white;
}

.video-info {
    text-align: center;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    padding: 25px 35px;
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    max-width: 80%;
  }

.video-title {
  font-size: 1.5rem;
  margin: 0 0 10px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.video-subtitle {
  font-size: 1rem;
  margin-top: 20px;
  opacity: 0.9;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.qr-code-tip {
  display: flex;
  margin-top: 10px;
  /* background-color: rgba(255, 255, 255, 0.9); */
  border-radius: 10px;
  padding: 15px;
  /* box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); */
  color: white;
  text-align: center;
  align-items: center;
  flex-direction: column;
}

.qr-code-tip p {
  margin: 0 0 10px;
  font-weight: bold;
}

.qr-code-image {
  width: 150px;
  height: 150px;
  border: 4px solid white;
  border-radius: 8px;
}

.control-bar {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0 0 12px 12px;
}

.control-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-btn svg {
  width: 24px;
  height: 24px;
}

.time-display {
  margin: 0 12px;
  font-size: 14px;
  color: white;
  min-width: 80px;
}

.progress-container {
  flex: 1;
  height: 6px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  position: relative;
  cursor: pointer;
  margin: 0 12px;
}

.progress-bar {
  height: 100%;
  background-color: #6f68e0;
  border-radius: 3px;
  position: absolute;
  top: 0;
  left: 0;
}

.progress-handle {
  width: 12px;
  height: 12px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.progress-handle.active {
  opacity: 1;
}

.volume-control {
  display: flex;
  align-items: center;
  margin: 0 8px;
}

.volume-slider {
  width: 60px;
  margin-left: 4px;
  cursor: pointer;
  -webkit-appearance: none;
  background-color: rgba(255, 255, 255, 0.2);
  height: 4px;
  border-radius: 2px;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: white;
}

.right-controls {
  display: flex;
  align-items: center;
}

.speed-btn {
  position: relative;
  min-width: 40px;
  font-size: 14px;
}

.speed-menu {
  position: absolute;
  bottom: 100%;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  padding: 8px 0;
  margin-bottom: 8px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  min-width: 80px;
}

.speed-option {
  padding: 6px 12px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.speed-option:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.speed-option.active {
  color: #6f68e0;
  font-weight: bold;
}

@media (max-width: 640px) {
  .time-display {
    display: none;
  }
  
  .volume-control {
    display: none;
  }
  
  .control-bar {
    padding: 8px 12px;
  }
  
  .play-button {
    width: 60px;
    height: 60px;
  }
  
  .play-button svg {
    width: 30px;
    height: 30px;
  }
  
  .video-title {
    font-size: 20px;
  }
  
  .video-subtitle {
    font-size: 14px;
  }
  
  .qr-code-image {
    width: 80px;
    height: 80px;
  }
}

/* 修改控制条隐藏样式 */
.video-container.is-playing.is-fullscreen.cursor-hidden .controls-overlay {
  opacity: 0;
  pointer-events: none; /* 防止隐藏时仍能点击 */
  transition: opacity 0.3s ease;
}

.video-container.is-playing.is-fullscreen .controls-overlay {
  opacity: 1;
  transition: opacity 0.3s ease;
}

/* 确保鼠标悬停时控制条显示 */
.video-container.is-playing.is-fullscreen:not(.cursor-hidden):hover .controls-overlay {
  opacity: 1;
}

/* 光标样式 */
.video-container.is-playing.is-fullscreen {
  cursor: default;
}

.video-container.is-playing.is-fullscreen.cursor-hidden {
  cursor: none;
}
</style>