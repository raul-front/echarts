<template>
  <div class="navbar-message" @mouseover="messageIsBlock = true" @mouseout="messageIsBlock = false">
    <div class="message">
      <i class="microsoft icon-alert"></i>
      <div class="count" v-show="messageList.length"></div>
    </div>
    <div class="message-panael-top" v-show="messageIsBlock"></div>
    <div :class="['message-panel', {'message-panel_show': messageIsBlock}]">
      <div class="message-panel-header fx-flex-between">
        <span class="left">
          <span v-if="count">共有{{count}}条相关的任务</span>
        </span>
        <span class="fx-link" @click.stop="goMessageList()">查看全部</span>
      </div>
      <div class="message-panel-list">
        <template v-for="(item, i) in messageList" >
          <li :key="i" @click.stop="goMessageDetail(item.projectId, item.id)">
            <div class="title">
              <span class="name">{{item.name}}</span>
              <span class="priority">
                <span v-if="item.priority === 2" class="fx-color-warning">紧急</span>
                <span v-if="item.priority === 3" class="fx-color-danger">非常紧急</span>
              </span>
            </div>
            <div class="date">更新于 {{item.time | second}}</div>
          </li>
        </template>
        <no-data v-if="!count" noImage>暂无相关的任务</no-data>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      messageIsBlock: false,
    }
  },
  computed: {
    count () {
      return this.$store.state.common.taskflowCount
    },
    messageList () {
      return this.$store.state.common.taskflowList
    },
  },
  mounted () {
    this.$store.dispatch('refreshTaskflow')
  },
  methods: {
    goMessageList () {
      this.$router.push({ name: 'TaskMention' })
    },
    goMessageDetail (projectId, taskId) {
      this.$router.push({
        name: 'ProjectSpaceTaskDetail',
        params: {
          id: projectId,
          taskid: taskId,
        },
      })
    },
  },
}
</script>
<style lang="scss">
.navbar-message{
  position: relative;
  z-index: 2000;
  .message{
    height: 50px;
    @include flex-center();
    i{
      font-size: 18px;
      color: $color-title;
    }
    .count{
      position: absolute;
      top: 16px;
      right: -1px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: red;
    }
  }
  .message-panael-top{
    position: absolute;
    top: 50px;
    right: 0;
    width: 300px;
    height: 12px;
    z-index: 2001;
    &:before{
      content: ' ';
      position: absolute;
      bottom: -1px;
      right: 13px;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 6px solid #fff;
    }
  }
  .message-panel{
    height: 0;
    width: 300px;
    position: absolute;
    right: 0;
    top: 62px;
    z-index: 2000;
    transition: opacity 1s;
    opacity: 0;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;
    .message-panel-header{
      height: 40px;
      // background-color: #eaedf1;
      padding: 0 10px;
      line-height: 40px;
      color: #333;
      border-bottom: 1px solid #eaedf1;
      .left{
        font-weight: bold;
      }
    }
    .message-panel-list{
      max-height: 320px;
      overflow-y: auto;
      background: #fff;
      li{
        width: 300px;
        height: 60px;
        padding: 8px 10px 2px;
        display: block;
        box-sizing: border-box;
        // border-bottom: 1px solid #eaedf1;
        .title{
          width: 280px;
          height: 25px;
          line-height: 25px;
          display: block;
          @include flex-between();
          .name{
            @include ellipsis();
            color: $color-title;
            margin-right: 20px;
          }
          .priority{
            white-space: nowrap;
            color: $color-danger;
          }
        }
        .date{
          width: 290px;
          height: 15px;
          line-height: 15px;
          font-size: 12px;
          display: block;
          color: $color-text;

        }
      }
      li:hover{
        background: #e4ebf1;
        cursor: pointer;
        .title .name{
          // color: $color-primary;
        }
      }
      a:hover{
        text-decoration: none;
      }
    }
  }
  .message-panel_show{
    border: 1px solid #EBEEF5;
    height: auto;
    opacity: 1;
  }
}
</style>
