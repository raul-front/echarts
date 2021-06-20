import { ref, onMounted, onUnmounted } from 'vue'

const useClickOutside = (elementRef) => {
  const isClickOutside = ref(false)
  // 点击事件
  const handler = (e) => {
    if (elementRef.value) {
      console.log('click', e.target)
      if (elementRef.value.contains(e.target)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.addEventListener('click', handler)
  })

  return { isClickOutside }
}

export default useClickOutside
