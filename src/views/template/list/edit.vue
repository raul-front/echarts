<template>
  <div class="component-flex-page template-list-edit">
    template-list-edit
    <el-button type="primary">button</el-button>
  </div>
</template>

<script>
import { ref, onMounted, computed, toRaw, reactive, h, toRefs, nextTick } from 'vue'
import { filter } from 'utils/func'

export default {
  props: {},
  components: {
  },
  setup (props, { emit }) {
    onMounted(() => {
    })

    return {
    }
  },
}
</script>

<style lang="scss">
</style>
