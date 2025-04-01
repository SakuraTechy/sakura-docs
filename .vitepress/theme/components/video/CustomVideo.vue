<template>
    <div 
      class="custom-video-container" 
      :class="{ 'is-playing': isPlaying }"
      :style="{ width: width, height: height }"
    >
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
      
      <div class="controls-overlay" @click="togglePlay">
        <div class="center-controls">
          <div class="video-info" v-if="!isPlaying">
            <h2 class="video-title">{{ title }}</h2>
            <p class="video-subtitle">{{ subtitle }}</p>
            
            <button class="play-button" @click.stop="togglePlay">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"></path>
              </svg>
              <span>观看视频</span>
            </button>
          </div>
        </div>
        
        <div class="control-bar">
          <div class="control-buttons">
            <button class="control-btn" @click.stop="togglePlay">
              <svg v-if="isPlaying" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"></path>
              </svg>
            </button>
            
            <div class="time-display">{{ formatTime(currentTime) }}</div>
            
            <div 
              class="progress-container" 
              @click.stop="seekVideo"
              @mousedown="startDrag"
              @mousemove="onDrag"
              @mouseup="stopDrag"
              @mouseleave="stopDrag"
              @touchstart="startDrag"
              @touchmove="onDrag"
              @touchend="stopDrag"
            >
              <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
              <div class="progress-handle" :style="{ left: `${progress}%` }"></div>
              <div class="progress-hover" :style="{ left: `${hoverPosition}%` }" v-if="isHovering">
                <div class="preview-time">{{ formatTime(previewTime) }}</div>
              </div>
            </div>
            
            <div class="time-display">{{ formatTime(duration) }}</div>
            
            <div class="volume-control">
              <button class="control-btn" @click.stop="toggleMute">
                <svg v-if="isMuted" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path>
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
  import { ref, onMounted, onUnmounted, watch } from 'vue'
  
  const props = defineProps({
    src: { type: String, required: true },
    poster: { type: String, default: '' },
    title: { type: String, default: '产品演示' },
    subtitle: { type: String, default: '探索创新科技' },
    width: { type: String, default: '100%' },
    height: { type: String, default: 'auto' },
    autoplay: { type: Boolean, default: false }
  })
  
  const videoRef = ref(null)
  const isPlaying = ref(false)
  const isMuted = ref(true)
  const progress = ref(0)
  const currentTime = ref(0)
  const duration = ref(0)
  const volumeLevel = ref(1)
  const isHovering = ref(false)
  const hoverPosition = ref(0)
  const previewTime = ref(0)
  const isDragging = ref(false)
  
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
  
  const seekVideo = (event) => {
    if (!videoRef.value) return
    const rect = event.currentTarget.getBoundingClientRect()
    const pos = (event.clientX - rect.left) / rect.width
    videoRef.value.currentTime = pos * videoRef.value.duration
  }
  
  const startDrag = (event) => {
    isDragging.value = true
    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', stopDrag)
    document.addEventListener('touchmove', onDrag)
    document.addEventListener('touchend', stopDrag)
    onDrag(event)
  }
  
  const onDrag = (event) => {
    if (!videoRef.value) return
    
    const clientX = event.touches ? event.touches[0].clientX : event.clientX
    const rect = event.currentTarget.getBoundingClientRect()
    const pos = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    
    if (isDragging.value) {
      videoRef.value.currentTime = pos * videoRef.value.duration
    } else {
      hoverPosition.value = pos * 100
      previewTime.value = pos * duration.value
      isHovering.value = true
    }
  }
  
  const stopDrag = () => {
    isDragging.value = false
    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', stopDrag)
    document.removeEventListener('touchmove', onDrag)
    document.removeEventListener('touchend', stopDrag)
  }
  
  const hidePreview = () => {
    if (!isDragging.value) {
      isHovering.value = false
    }
  }
  
  const changeVolume = () => {
    if (!videoRef.value) return
    videoRef.value.volume = volumeLevel.value
    if (volumeLevel.value > 0) {
      videoRef.value.muted = false
      isMuted.value = false
    }
  }
  
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === Infinity) return '00:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  const toggleFullscreen = () => {
    const container = document.querySelector('.custom-video-container')
    
    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen()
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen()
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
    }
  }
  
  onMounted(() => {
    if (!videoRef.value) return
    
    videoRef.value.addEventListener('timeupdate', updateProgress)
    videoRef.value.addEventListener('loadedmetadata', updateProgress)
    
    if (props.autoplay) {
      videoRef.value.play()
        .then(() => { isPlaying.value = true })
        .catch(err => console.warn('自动播放失败:', err))
    }
  })
  
  onUnmounted(() => {
    if (!videoRef.value) return
    
    videoRef.value.removeEventListener('timeupdate', updateProgress)
    videoRef.value.removeEventListener('loadedmetadata', updateProgress)
  })
  </script>
  
  <style scoped>
  .custom-video-container {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    background-color: #000;
  }
  
  .custom-video-container[style*="height:auto"] {
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
  
  .controls-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%, rgba(0,0,0,0.4) 100%);
    opacity: 1;
    transition: opacity 0.3s ease;
  }
  
  .is-playing .controls-overlay {
    opacity: 0;
  }
  
  .is-playing:hover .controls-overlay {
    opacity: 1;
  }
  
  .center-controls {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 8px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  .video-subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    margin-bottom: 20px;
  }
  
  .play-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 25px;
    background: linear-gradient(90deg, #6f68e0, #9c64a6);
    color: white;
    border: none;
    border-radius: 30px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 4px 12px rgba(111, 104, 224, 0.4);
  }
  
  .play-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(111, 104, 224, 0.6);
  }
  
  .play-button svg {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
  
  .control-bar {
    width: calc(100% - 40px);
    margin: 0 auto 20px;
    height: 60px;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    background-color: rgba(20, 20, 20, 0.6);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .control-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
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
    transition: transform 0.2s ease;
  }
  
  .control-btn:hover {
    transform: scale(1.1);
  }
  
  .control-btn svg {
    width: 24px;
    height: 24px;
  }
  
  .time-display {
    color: white;
    font-size: 14px;
    margin: 0 10px;
    font-family: monospace;
    min-width: 50px;
  }
  
  .progress-container {
    width: 100%;
    height: 8px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    margin: 0 15px;
    cursor: pointer;
    position: relative;
  }
  
  .progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #6f68e0, #9c64a6);
    border-radius: 4px;
    transition: width 0.1s linear;
  }
  
  .progress-handle {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  
  .progress-container:hover .progress-handle,
  .progress-container:active .progress-handle {
    opacity: 1;
  }
  
  .progress-hover {
    position: absolute;
    top: -30px;
    transform: translateX(-50%);
  }
  
  .preview-time {
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-family: monospace;
  }
  
  .volume-control {
    display: flex;
    align-items: center;
    margin: 0 10px;
  }
  
  .volume-slider {
    width: 0;
    height: 4px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    appearance: none;
    outline: none;
    transition: width 0.3s ease;
    margin-left: 5px;
  }
  
  .volume-control:hover .volume-slider {
    width: 80px;
  }
  
  .volume-slider::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: white;
    cursor: pointer;
  }
  
  @media (max-width: 768px) {
    .video-info {
      padding: 15px 20px;
      max-width: 90%;
    }
    
    .video-title {
      font-size: 1.5rem;
    }
    
    .video-subtitle {
      font-size: 1rem;
      margin-bottom: 15px;
    }
    
    .play-button {
      padding: 10px 20px;
      font-size: 0.9rem;
    }
    
    .control-bar {
      height: 50px;
      padding: 0 10px;
    }
    
    .time-display {
      display: none;
    }
    
    .volume-control {
      display: none;
    }
  }
  </style>