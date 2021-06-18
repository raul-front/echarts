<template>
  <teleport to="body">
    <transition
      name="dialog-zoom"
      :appear="true"
      @after-enter="afterEnter"
      @after-leave="afterLeave">
      <div class="preview-image-wrap" v-show="visible">
        <div class="preview-image-mask"></div>
        <div class="preview-image" @click="handleClose">
          <ul class="preview-image-handle" @click.stop>
            <li class="preview-image-handle-item" @click="handleRotateLeft"><i class="iconfont icon-rotate-left"></i></li>
            <li class="preview-image-handle-item" @click="handleRotateRight"><i class="iconfont icon-rotate-right"></i></li>
            <li class="preview-image-handle-item" :class="{'preview-image-handle-item-disabled': scaleMinusDisabled}" @click="handleScaleMinus"><i class="iconfont icon-zoomout"></i></li>
            <li class="preview-image-handle-item" @click="handleScalePlus"><i class="iconfont icon-zoomin"></i></li>
            <li class="preview-image-handle-item" @click="handleClose"><i class="iconfont icon-close"></i></li>
          </ul>
          <div class="preview-image-content">
            <img class="preview-image-content-img" @click.stop ref="imgRef"
              :src="currentUrl" :style="imageStyle" :alt="title">
          </div>
          <div class="preview-image-switch-left" :class="{'preview-image-switch-disabled': prevSwitchDisabled}" @click.stop="handlePrev">
            <i class="iconfont icon-left"></i>
          </div>
          <div class="preview-image-switch-right" :class="{'preview-image-switch-disabled': nextSwitchDisabled}" @click.stop="handleNext">
            <i class="iconfont icon-right"></i>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
/**
 * TODO:
 * 1. 展示图片信息
 * 2. 图片切换loading
 * 3. esc关闭弹框
 */
import { computed, onMounted, ref, watch } from 'vue'
import { getImageObjectURL } from 'utils/file'

export default {
  name: 'preview-image',
  components: {
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '图片预览',
    },
    current: {
      type: Number,
      default: 0,
    },
    // 图片类型：url、file
    type: {
      type: String,
      default: 'url',
    },
    list: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  setup (props, { emit }) {
    // visible控制
    const visible = ref(false)
    watch(() => props.modelValue, val => {
      if (visible.value !== val) {
        visible.value = val
      }
    })
    watch(visible, (val) => {
      emit('update:modelValue', val)
      if (visible.value) {
        resetStyle()
      }
    })
    const handleClose = () => {
      visible.value = false
    }
    const afterEnter = () => {
      emit('opened')
    }
    const afterLeave = () => {
      emit('closed')
    }

    // 图片数据
    const imageList = computed(() => {
      if (props.type === 'file') {
        return props.list.map(x => x.file)
      } else {
        return props.list
      }
    })
    const currentIndex = ref(0)
    watch(() => props.current, val => {
      currentIndex.value = val
    })
    const currentUrl = computed(() => {
      if (!imageList.value.length) {
        return ''
      }
      if (props.type === 'file') {
        return getImageObjectURL(imageList.value[currentIndex.value])
      } else {
        return imageList.value[currentIndex.value]
      }
    })

    // 图片切换
    const prevSwitchDisabled = computed(() => {
      return currentIndex.value === 0
    })
    const nextSwitchDisabled = computed(() => {
      return currentIndex.value === imageList.value.length - 1
    })
    const handlePrev = () => {
      if (currentIndex.value > 0) {
        currentIndex.value--
      }
    }
    const handleNext = () => {
      if (currentIndex.value < imageList.value.length - 1) {
        currentIndex.value++
      }
    }

    // 样式设置
    const rotate = ref(0)
    const handleRotateLeft = () => {
      rotate.value -= 90
    }
    const handleRotateRight = () => {
      rotate.value += 90
    }
    const scale = ref(1)
    const scaleMinusDisabled = ref(false)
    const handleScaleMinus = () => {
      if (scale.value === 1) {
        scale.value = 0.5
        scaleMinusDisabled.value = true
      } else if (scale.value > 1) {
        scale.value--
      }
    }
    const handleScalePlus = () => {
      if (scale.value === 0.5) {
        scale.value = 1
        scaleMinusDisabled.value = false
      } else {
        scale.value++
      }
    }
    const imageStyle = computed(() => {
      return `transform: scale3d(${scale.value}, ${scale.value}, 1) rotate(${rotate.value}deg)`
    })
    const resetStyle = () => {
      scale.value = 1
      rotate.value = 0
    }

    const imgRef = ref(null)

    onMounted(() => {
      // 切换图片后获取图片基本信息
      // TODO:
      imgRef.value.addEventListener('load', (e) => {
        const img = e.target
        console.log('img info', img.width, img.height)
      })
    })

    return {
      imgRef,
      visible,
      currentIndex,
      currentUrl,
      prevSwitchDisabled,
      nextSwitchDisabled,
      handlePrev,
      handleNext,
      imageStyle,
      scaleMinusDisabled,
      handleRotateLeft,
      handleRotateRight,
      handleScaleMinus,
      handleScalePlus,
      handleClose,
      imageList,
      afterEnter,
      afterLeave,
    }
  },
}
</script>

<style lang="scss">
.preview-image-wrap{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99999;
  // background: #Fff;
  .preview-image-mask{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    background: rgba(0, 0, 0, .45);
  }
  .preview-image{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    background: transparent;
    .preview-image-handle{
      width: 100%;
      height: 46px;
      background: rgba(0, 0, 0, .1);
      color: rgba(255, 255, 255, .85);
      margin: 0;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      &-item{
        font-size: 18px;
        padding: 0 10px;
        margin-left: 15px;
        cursor: pointer;
        .iconfont{
          font-size: 24px;
        }
      }
      &-item-disabled{
        color: rgba(255, 255, 255, .45);
        cursor: not-allowed;
      }
    }
    .preview-image-content{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .preview-image-content-img{
        max-width: 100%;
        max-height: 100%;
        transform: scale3d(1,1,1) rotate(0);
        transition: transform .3s cubic-bezier(.215,.61,.355,1) 0s;
        cursor: grab;
        user-select: none;
        pointer-events: auto;
      }
    }
    .preview-image-switch-left, .preview-image-switch-right{
      width: 44px;
      height: 44px;
      position: absolute;
      top: 50%;
      z-index: 2;
      margin-top: -22px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, .1);
      color: rgba(255, 255, 255, .85);
      font-size: 18px;
      cursor: pointer;
      pointer-events: auto;
      .iconfont{
        font-size: 24px;
      }
    }
    .preview-image-switch-disabled{
      color: rgba(255, 255, 255, .45);
      cursor: not-allowed;
    }
    .preview-image-switch-left{
      left: 10px;
    }
    .preview-image-switch-right{
      right: 10px;
    }
  }
}
</style>
