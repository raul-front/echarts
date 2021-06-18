<template>
  <div class="page-full-screen-btn" v-if="showFullScreenBtn" @click="handleChange">
    <el-tooltip effect="dark" :content="text" placement="bottom">
      <i :class="['iconfont', isFullScreen ? 'icon-fullscreen-exit' : 'icon-fullscreen']"></i>
    </el-tooltip>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'fullScreen',
  setup () {
    // 判断浏览器是否支持全屏
    const showFullScreenBtn = computed(() => {
      return window.navigator.userAgent.indexOf('MSIE') < 0
    })

    const isFullScreen = ref(false)
    const text = computed(() => {
      return isFullScreen.value ? '退出全屏' : '全屏'
    })

    const handleChange = () => {
      const main = document.body
      if (isFullScreen.value) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (main.requestFullscreen) {
          main.requestFullscreen()
        } else if (main.mozRequestFullScreen) {
          main.mozRequestFullScreen()
        } else if (main.webkitRequestFullScreen) {
          main.webkitRequestFullScreen()
        } else if (main.msRequestFullscreen) {
          main.msRequestFullscreen()
        }
      }
    }
    const bandEvent = () => {
      // 判断浏览器当前状态
      let is = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen
      is = !!is
      isFullScreen.value = is
      document.addEventListener('fullscreenchange', () => {
        isFullScreen.value = !isFullScreen.value
      })
      document.addEventListener('mozfullscreenchange', () => {
        isFullScreen.value = !isFullScreen.value
      })
      document.addEventListener('webkitfullscreenchange', () => {
        isFullScreen.value = !isFullScreen.value
      })
      document.addEventListener('msfullscreenchange', () => {
        isFullScreen.value = !isFullScreen.value
      })
    }

    bandEvent()

    return {
      showFullScreenBtn,
      isFullScreen,
      text,
      handleChange,
    }
  },
}
</script>
<style lang="scss">
.page-full-screen-btn{
  .iconfont{
    height: 100%;
    @include flex-center();
    font-size: 16px;
  }
}
</style>
