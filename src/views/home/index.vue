<template>
  <div class="component-flex-page">
    <el-button type="primary">xxx</el-button>
    <i class="el-icon-edit"></i>
    <i class="iconfont icon-reload"></i>
  </div>
</template>
<script>
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  setup () {
    const selectedKeys = ref(['1'])
    const openKeys = ref(['sub1'])

    const handleClick = e => {
      console.log('click', e)
    }

    const titleClick = e => {
      console.log('titleClick', e)
    }
    const clickHandle = (e) => {
      console.log('e', e)
    }

    watch(
      () => openKeys,
      val => {
        console.log('openKeys', val)
      },
    )
    const defaultSelectedKeys = ref([])
    const defaultOpenKeys = ref([])
    return {
      defaultSelectedKeys,
      defaultOpenKeys,
      selectedKeys,
      openKeys,
      handleClick,
      titleClick,
      clickHandle,
    }
  },
})
</script>
<style lang="scss">

</style>
