<template>
  <div class="layout" loading>
    <main-menu></main-menu>
    <div class="layout-right">
      <main-header></main-header>
      <div class="layout-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import MainMenu from './Menu.vue'
import MainHeader from './Header.vue'

export default {
  name: 'layout',
  components: {
    MainMenu,
    MainHeader,
  },
  setup () {
    const store = useStore()
    store.commit('user/SET_INITDATA_FROM_STORAGE')
    store.dispatch('user/syncSystemInitData')
  },
}
</script>

<style lang="scss">
</style>
