<template>
  <div class="component-flex-page page">
    {{title}}
  </div>
</template>
<script>
export default {
  name: 'page',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    title () {
      return this.$route.name
    },
  },
  methods: {
  },
  mounted () {
  },
}
</script>
<style lang="scss">
.page{
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 20px;
}
</style>
