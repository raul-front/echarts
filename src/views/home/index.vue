<template>
  <div class="home">
    <el-card>
      <template #header>
          <span>监控大屏</span>
      </template>
      <el-row :gutter="12">
        <el-col :span="6" v-for="item in largeScreenList" :key="item.id">
          <div @click="openScreenPage(item)">
            <el-card shadow="always">
              <template #header>
                  <span>{{item.title}}</span>
              </template>
              <img class="large-screen-item-img" :src="item.img" alt="">
            </el-card>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup () {
    const router = useRouter()

    const isFullScreen = computed(() => {
      return window.navigator.userAgent.indexOf('MSIE') < 0
    })
    const handleFullScreen = () => {
      if (!isFullScreen.value) return

      const main = document.body
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

    const largeScreenList = ref([
      // 为了打包后能方法，加上 publicDir
      { id: 1, title: '监控大屏1', routeName: 'Large_Screen_1', img: '/echarts/images/large-screen-page/large-screen-1.png' },
      { id: 2, title: '监控大屏2', routeName: 'Large_Screen_2', img: '/echarts/images/large-screen-page/large-screen-1.png' },
      { id: 3, title: '监控大屏3', routeName: 'Large_Screen_3', img: '/echarts/images/large-screen-page/large-screen-1.png' },
    ])

    const openScreenPage = (item) => {
      handleFullScreen()
      router.push({ name: item.routeName })
    }

    return {
      largeScreenList,
      openScreenPage,
    }
  },
})
</script>
<style lang="scss">
.home{
  padding: 30px;
  .large-screen-item-img{
    width: 100%;
  }
}
</style>
