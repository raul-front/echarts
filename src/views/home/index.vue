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
            </el-card>
          </router-link>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  setup () {
    const largeScreenList = ref([
      { id: 1, title: '监控大屏1', routeName: 'Large_Screen_1' },
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
}
</style>
