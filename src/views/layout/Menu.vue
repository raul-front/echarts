<template>
  <div class="layout-menu" :class="{'layout-menu_collapsed': menuCollapsed}">
    <div class="logo-wrap">
      <img class="logo" src="@/assets/logo.png" alt="">
      <span class="text">Admin</span>
    </div>
    <ul class="menu-wrap" v-if="!menuCollapsed">
      <template v-for="item in menu" :key="item.name">
        <li class="menu-item" :class="item.isOpen ? 'menu-item_opened' : 'menu-item_closed'">
          <div class="menu-item-title"
            :class="{
              'menu-item-title_active': item.name === activeMenu,
              'menu-item-title_chlidren-selected': activeMenu.startsWith(item.name)
            }"
            @click="handleChangeMenu(item)">
            <i class="iconfont menu-item-title-icon" :class="[`icon-${item.icon}`]"></i>
            <span class="menu-item-title-label">{{item.title}}</span>
            <i class="iconfont icon-down menu-item-title-down-icon" v-if="item.children"></i>
          </div>
          <template v-if="item.children">
            <ul class="submenu-wrap" :style="`height: ${item.children.length * 40}px;`">
              <li v-for="submenuItem in item.children" :key="submenuItem.name"
                class="submenu-item" :class="{'submenu-item_active': submenuItem.name === activeMenu}"
                @click="handleChangeSubmenu(submenuItem)">
                <i class="iconfont icon-dian submenu-item-icon"></i>
                <span class="submenu-item-label">{{submenuItem.title}}</span>
              </li>
            </ul>
          </template>
        </li>
      </template>
    </ul>
    <ul class="menu-wrap_collapsed" v-else>
      <template v-for="item in menu" :key="item.name">
        <el-tooltip v-if="!item.children" effect="dark" :content="item.title" placement="right">
          <li class="menu-item" :class="item.isOpen ? 'menu-item_opened' : 'menu-item_closed'">
            <div class="menu-item-title"
              :class="{
                'menu-item-title_active': item.name === activeMenu,
                'menu-item-title_chlidren-selected': activeMenu.startsWith(item.name)
              }"
              @click="handleChangeMenu(item)">
              <i class="iconfont menu-item-title-icon" :class="[`icon-${item.icon}`]"></i>
            </div>
          </li>
        </el-tooltip>
        <el-popover v-else
          :show-arrow="false"
          placement="right-start"
          trigger="hover"
          popper-class="submenu-wrap_collapsed"
        >
          <template #reference>
            <li class="menu-item" :class="item.isOpen ? 'menu-item_opened' : 'menu-item_closed'">
              <div class="menu-item-title"
                :class="{
                  'menu-item-title_active': item.name === activeMenu,
                  'menu-item-title_chlidren-selected': activeMenu.startsWith(item.name)
                }"
                @click="handleChangeMenu(item)">
                <i class="iconfont menu-item-title-icon" :class="[`icon-${item.icon}`]"></i>
              </div>
            </li>
          </template>
          <ul class="submenu-wrap">
            <li v-for="submenuItem in item.children" :key="submenuItem.name"
              class="submenu-item" :class="{'submenu-item_active': submenuItem.name === activeMenu}"
              @click="handleChangeSubmenu(submenuItem, item)">
              <i class="iconfont icon-dian submenu-item-icon"></i>
              <span class="submenu-item-label">{{submenuItem.title}}</span>
            </li>
          </ul>
        </el-popover>
        <!-- <a-popover v-else placement="rightTop" overlayClassName="submenu-wrap_collapsed"> -->
      </template>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

const list = [
  {
    title: '首页',
    name: 'Home',
    icon: 'home',
  },
  {
    title: '员工管理',
    name: 'Account',
    icon: 'team',
    isOpen: true,
    children: [
      { title: '部门', name: 'Account_Department' },
      { title: '员工', name: 'Account_Employee' },
      { title: '权限', name: 'Account_Position' },
    ],
  },
  {
    title: '模板页面',
    name: 'Template',
    icon: 'setting',
    isOpen: false,
    children: [
      { title: '列表页', name: 'Template_List' },
    ],
  },
  // {
  //   title: '系统管理',
  //   name: 'System',
  // icon: 'setting',
  // isOpen: false,
  // children: [
  //     { title: '公众号', name: 'System_Mp' },
  //     { title: '公众号素材', name: 'System_MpMaterial' },
  //     { title: '登录设置', name: 'System_Login' },
  //     { title: '基础设置', name: 'System_Base' },
  //   ],
  // },
]
export default {
  setup (props, { emit }) {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    onMounted(() => {
    })
    const menuCollapsed = computed(() => {
      return store.state.user.menuCollapsed
    })
    const menu = ref(list)
    const activeMenu = computed(() => {
      return route.name
    })

    const handleChangeMenu = (item) => {
      if (item.children) {
        if (item.isOpen) {
          item.isOpen = false
        } else {
          menu.value.forEach(x => {
            if (x.isOpen) {
              x.isOpen = false
            }
          })
          item.isOpen = true
        }
      } else {
        router.push({ name: item.name })
      }
    }
    const handleChangeSubmenu = (submenuItem, item) => {
      if (item) {
        handleChangeMenu(item)
      }
      router.push({ name: submenuItem.name })
    }

    return {
      menu,
      activeMenu,
      menuCollapsed,
      handleChangeMenu,
      handleChangeSubmenu,
    }
  },
}
</script>

<style lang="scss">
.layout-menu{
  width: 210px;
  transition: all 0.2s ease 0s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: $menu-bg;
  color: $menu-text-color;
  font-size: 14px;
  .logo-wrap{
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 8px;
    overflow: hidden;
    .logo{
      width: 32px;
      height: 32px;
    }
    .text{
      margin-left: 8px;
      font-size: 16px;
      font-weight: 700;
      transition: all .5s;
      color: #fff;
    }
  }
  .menu-wrap{
    height: 0;
    flex: 1;
    overflow: auto;
    .menu-item{
      &-title{
        height: 48px;
        display: flex;
        align-items: center;
        padding: 0 16px;
        cursor: pointer;
        transition: all .3s;
        &-icon{
          font-size: 16px;
        }
        &-label{
          flex: 1;
          margin-left: 8px;
          @include ellipsis();
        }
        &-down-icon{
          font-size: 10px;
          transition: transform .2s cubic-bezier(.645,.045,.355,1);
        }
        &:hover{
          color: $menu-active-text-color;
          font-weight: 600;
        }
        &_active{
          background: $menu-active-bg;
          color: $menu-active-text-color;
          font-weight: 600;
        }
        &_chlidren-selected{
          color: $menu-active-text-color;
          font-weight: 600;
        }
      }
      .submenu-wrap{
        width: 100%;
        background: $submenu-bg;
        color: $submenu-text-color;
        transition: all .2s;
        overflow: hidden;
        .submenu-item{
          width: 100%;
          height: 40px;
          display: flex;
          align-items: center;
          cursor: pointer;
          padding: 0 16px 0 32px;
          transition: all .3s;
          box-sizing: border-box;
          &-icon{
            font-size: 14px;
          }
          &-label{
            margin-left: 4px;
            @include ellipsis();
          }
          &:hover{
            color: $submenu-active-text-color;
            font-weight: 600;
          }
          &_active{
            background: $submenu-active-bg;
            color: $submenu-active-text-color;
            font-weight: 600;
          }
        }
      }

      &_opened{
        .menu-item-title-down-icon{
          transform: rotate(180deg);
        }
      }
      &_closed{
        .submenu-wrap{
          height: 0 !important;
        }
      }
    }
  }
  .menu-wrap_collapsed{
    height: 0;
    flex: 1;
    overflow: auto;
    .menu-item{
      &-title{
        height: 45px;
        display: flex;
        align-items: center;
        padding: 0 16px 0 13px;
        cursor: pointer;
        transition: all .3s;
        border-left: 3px solid transparent;
        &-icon{
          font-size: 16px;
        }
        &-down-icon{
          font-size: 10px;
          transition: transform .2s cubic-bezier(.645,.045,.355,1);
        }
        &:hover{
          color: $menu-active-text-color;
          font-weight: 600;
        }
        &_active{
          color: $menu-active-text-color;
          border-color: $menu-active-bg;
          font-weight: 600;
        }
        &_chlidren-selected{
          color: $menu-active-text-color;
          border-color: $menu-active-bg;
          font-weight: 600;
        }
      }
    }
  }
}
.layout-menu_collapsed{
  width: 48px;
}
.submenu-wrap_collapsed{
  width: 200px !important;
  background: $submenu-bg !important;
  color: $submenu-text-color !important;
  padding: 0 !important;
  border: 0 !important;
  overflow: hidden;
  .submenu-wrap{
    .submenu-item{
      height: 45px;
      display: flex;
      align-items: center;
      padding: 0 24px;
      transition: all .3s;
      cursor: pointer;
      &-label{
        margin-left: 4px;
        @include ellipsis();
      }
      &-icon{
        font-size: 16px;
      }
      &:hover{
        color: $submenu-active-text-color;
        font-weight: 600;
      }
      &_active{
        background: $submenu-active-bg;
        color: $submenu-active-text-color;
        font-weight: 600;
      }
    }
  }
}
</style>
