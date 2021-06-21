<template>
  <div class="r-empty">
    <img class="r-empty-img" :style="`width: ${width}px`" src="/images/nodata.png" v-if="!noImage">
    <div class="r-empty-text">
      <slot>暂无数据</slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    noImage: {
      type: Boolean,
      default: false,
    },
    width: Number,
  },
}
</script>

<style lang="scss">
// 请保证父组件有定位
.r-empty{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  @include flex-center(column);
  padding: 20px;
  box-sizing: border-box;
  z-index: 1;
  &-img{
    width: 100px;
    margin-bottom: 10px;
  }
  &-text{
    color: #a3a3a3;
    font-size: 14px;
    line-height: 2em;
  }
}
</style>
