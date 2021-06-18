<template>
  <div class="login">
    <div class="login-left">
      <div class="login-header">
        <!-- <img src='images/login_logo.png' /> -->
      </div>
      <div class="login-content" v-if="!isBindPage">
        <el-tabs class="login-container">
            <el-tab-pane label="微信登录" v-if="webappConfig.isEnable">
              <div id="qrcodeLogin"></div>
            </el-tab-pane>
            <el-tab-pane label="手机登录" v-if="phoneConfig.isEnable">
                <el-form ref="loginForm" :model="loginForm">
                  <el-form-item>
                    <el-input v-model.trim="loginForm.phone" size="medium" placeholder="请输入手机号" @keydown.native.enter.prevent="getCode"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-input v-model.trim="loginForm.code" size="medium" placeholder="验证码" @keydown.native.enter.prevent="loginHandle">
                      <template v-slot:suffix>
                        <span class="validate-text validate-text-get" @click="getCode()" v-show="!isSendCode">{{msgText}}</span>
                        <span class="validate-text" v-show="isSendCode"> {{ msgTime }}s后重新发送</span>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                    <!-- <el-button type="primary" @click="loginHandle" :loading="submitBtnLoading" class="submit-btn" size="medium" :disabled="isClickSub">
                      <span class="submit-btn-text">登录</span>
                    </el-button> -->
                  </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
        <!-- <p class="login-description">新员工首次登录时，请先进行【手机登录】获取验证码，然后再扫码登录</p> -->
      </div>
      <div class="login-content" v-else>
        <el-tabs class="login-container">
            <el-tab-pane label="绑定微信">
              <img class="mp-bind-image" v-if="bindConfig.type === 'mp'" :src="qrCodeUrl" height="180px">
              <div e-else id="qrcodeBind"></div>
            </el-tab-pane>
        </el-tabs>
        <p class="bind-description">请使用微信扫描二维码绑定</p>
      </div>
      <div class="login-footer">
        <span>{{footerText}}  <a href="http://www.funxdata.com" class="fx-link-primary">Power by FunXdata</a></span>
      </div>
    </div>
    <div class="login-right">
      <h1 class="title">{{title}}</h1>
    </div>
  </div>
</template>

<script>
import storage from '@/utils/storage'
import { getLoginCode } from 'api/account'
import { validatePhone } from 'utils/validate'

export default {
  name: 'login',
  data () {
    return {
      id: 0,
      title: this.config.loginTitle,
      footerText: this.config.footerText,
      submitBtnLoading: false,
      loginForm: {
        phone: this.config.envData.VUE_APP_PHONE || '',
        code: this.config.envData.VUE_APP_LOGIN_PSD || '',
      },
      msgTime: 60,
      msgText: '获取验证码',
      isSendCode: false,

      qrCodeUrl: '',

      phoneConfig: {},
      webappConfig: {},
      mpConfig: {},
      bindConfig: {},
    }
  },
  computed: {
    isClickSub () {
      // if (this.msgText === '获取验证码' || !this.loginForm.phone || !this.loginForm.code) {
      //   return true
      // }
      return false
    },
    routeName () {
      return this.$route.name
    },
    routeQuery () {
      return this.$route.query
    },
    isBindPage () {
      return this.routeName === 'BindWechat'
    },
  },
  watch: {
    routeName () {
      // 这里直接刷新二维码时，二维码不会更新，所以直接刷新页面
      this.$router.go(0)
    },
    routeQuery () {
      if (this.routeName === 'Login' && this.routeQuery.code) {
        this.wxLogin(this.routeQuery.code)
      }
      if (this.routeName === 'BindWechat' && this.routeQuery.code) {
        this.wxBind(this.routeQuery.code)
      }
    },
  },
  mounted () {
    if (this.isBindPage) {
      this.id = this.routeQuery.id
      this.bindConfig = storage.getWebappConfig()
    }
  },
  methods: {
    getCode () {
      if (!this.checkoutPhone()) {
        return
      }
      const data = {
        type: 'phone',
        phone: this.loginForm.phone,
      }
      this.msgText = '重新发送'
      this.msgTime = 60
      this.isSendCode = true
      getLoginCode(data).then(res => {
        this.$message.success('验证码已发送请注意查收')
        const timer = setInterval(() => {
          this.msgTime--
          if (this.msgTime <= 0) {
            this.isSendCode = false
            clearInterval(timer)
          }
        }, 1000)
      }).catch(() => {
        this.isSendCode = false
      })
    },
    checkoutPhone () {
      if (!this.loginForm.phone) {
        this.$message.warning('请输入手机号')
        return false
      }
      if (!validatePhone(this.loginForm.phone)) {
        this.$message.warning('请检查手机号码格式')
        return false
      }
      return true
    },
    checkoutCode () {
      if (!this.loginForm.code) {
        this.$message.warning('请输入验证码')
        return false
      }
      const reg = /^\d{4}$/
      if (!reg.test(this.loginForm.code)) {
        this.$message.warning('验证码为4位数字')
        return false
      }
      return true
    },
  },
}
</script>

<style lang="scss">
.login{
  width: 100%;
  height: 100%;
  min-height: 460px;
  display: flex;
  &-left{
    width: 40%;
    display: flex;
    flex-direction: column;
  }
  &-right{
    width: 60%;
    height: 100%;
    overflow: hidden;
    position: relative;
    // background: #151524;
    @include flex-center();
    color: #fff;
    &::before {
      z-index: 1;
      content: ' ';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      // background-image: url("/images/login_bg.png");
      background-size: cover;
    }
    .title{
      font-size: 28px;
    }
  }
  &-header{
    height: 60px;
    padding: 5px 0 5px 20px;
    // background: #fff;
    @include flex-center();
    justify-content: flex-start;
    // box-shadow: 0 1px 2px 0 rgba(9,18,26,0.06), 0 4px 8px 0 rgba(39,56,73,0.08);
    img{
      height: 40px;
    }
  }
  &-footer{
    height: 50px;
    line-height: 50px;
    padding-left: 30px;
    color: #606266;
  }
  &-content{
    flex: 1;
    @include flex-center(column);
    .login-container{
      width: 330px;
      height: 300px;
      .el-tabs__item{
        font-size: 16px;
        font-weight: bold;
      }
      .el-form{
        margin-top: 20px;
      }
      .validate-text{
        margin-right: 15px;
        cursor: default;
      }
      .validate-text-get{
        // color: $color-primary;
        cursor: pointer;
        &:hover{
          font-weight: bold;
        }
      }
      .submit-btn{
        width: 100%;
        .submit-btn-text{
          font-size: 14px;
        }
      }
      .mp-bind-image{
        margin: 30px 75px;
      }
      .el-input__suffix{
        line-height: 36px;
      }
    }
    .login-description{
      margin-top: 20px;
      // color: $color-primary;
    }
    .bind-description{
      margin-top: 20px;
      // color: $color-danger;
    }

  }
}
</style>
