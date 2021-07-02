<template>
  <div class="home">
    <el-card>
      <template #header>
          <span>监控大屏</span>
      </template>
      <el-row :gutter="12">
        <el-col :span="6" v-for="item in largeScreenList" :key="item.id">
          <router-link :to="{name: item.routeName}">
            <el-card shadow="always">
              <template #header>
                  <span>{{item.title}}</span>
              </template>
              <img class="large-screen-item-img" :src="item.img" alt="">
            </el-card>
          </router-link>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const largeScreenList = ref([
      { id: 1, title: '监控大屏1', routeName: 'Large_Screen_1', img: 'public/images/large-screen-page/large-screen-1.png' },
    ])
    return {
      largeScreenList,
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
