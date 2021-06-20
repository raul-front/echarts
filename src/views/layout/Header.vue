<template>
  <div class="layout-header">
    <div class="header-left">
      <div class="menu-collapsed" @click="handleChangeCollapsed">
        <i :class="['iconfont', menuCollapsed ? 'icon-outdent' : 'icon-indent']" ></i>
      </div>
    </div>
    <div class="header-right">
      <full-screen class="nav-item"></full-screen>
      <el-dropdown class="nav-item" @command="hanleChangeMenu">
        <div class="userinfo">
          <img class="userinfo-avatar" :src="userInfo.avatar"/>
          <span class="userinfo-name">{{userInfo.name}}</span>
          <i class="el-icon-arrow-down"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">
              <i class="iconfont icon-user"></i>个人中心
            </el-dropdown-item>
            <el-dropdown-item command="logout" divided>
              <i class="iconfont icon-user"></i>退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import storage from '@/utils/storage'
import { ElMessage, ElMessageBox } from 'element-plus'
import FullScreen from './components/FullScreen.vue'

export default {
  components: {
    FullScreen,
  },
  setup () {
    const store = useStore()
    const router = useRouter()

    const menuCollapsed = computed(() => {
      return store.state.user.menuCollapsed
    })
    const handleChangeCollapsed = () => {
      store.commit('user/SET_MENU_COLLAPSED', !menuCollapsed.value)
    }

    const userInfo = computed(() => {
      return store.state.user.userInfo
    })

    const goProfilePage = () => {
      ElMessage.warning('开发中...')
      // router.push({ name: 'ProfileBase' })
    }
    const logout = () => {
      ElMessageBox.confirm('确认退出吗?', '提示', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(_ => {
        storage.rmSignature()
        router.push({ name: 'Login' })
      }).catch(_ => {})
    }

    const hanleChangeMenu = (command) => {
      if (command === 'profile') {
        goProfilePage()
      } else if (command === 'logout') {
        logout()
      }
    }

    return {
      menuCollapsed,
      userInfo,
      handleChangeCollapsed,
      hanleChangeMenu,
    }
  },
}
</script>

<style lang="scss">
.layout-header {
  display: flex;
  justify-content: space-between;
  .header-left {
    height: 100%;
    .menu-collapsed{
      width: 36px;
      height: 100%;
      cursor: pointer;
      @include flex-center();
      .iconfont{
        font-size: 18px;
      }
      &:hover{
        background: rgb(246 246 246);
      }
    }
  }
  .header-right{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .nav-item{
      height: 100%;
      padding: 0 10px;
      cursor: pointer;
      @include flex-center();
      color: rgb(96 98 102);
      .userinfo{
        height: 100%;
        @include flex-center();
        &-avatar{
          width: 24px;
          height: 24px;
          margin-right: 8px;
        }
        &-name{
          margin-right: 4px;
        }
      }
      &:hover{
        background: rgb(246 246 246);
      }
    }
  }
}
</style>
