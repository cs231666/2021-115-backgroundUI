<template>

  <div class="login-container">
    <div class="login_box">
      <el-form class="login-form" auto-complete="on" label-position="left">

        <div class="title-container">
          <img v-if="logo" :src="logo" class="sidebar-logo">
          <h3 class="title">到云后台管理系统</h3>
        </div>

        <el-tabs v-model="activeName" stretch @tab-click="handleClick">
          <el-tab-pane label="密码登录" name="first">
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" auto-complete="on" label-position="left">
              <el-form-item prop="username">
                <span class="svg-container">
                  <svg-icon icon-class="user" />
                </span>
                <el-input
                  ref="username"
                  v-model="loginForm.username"
                  placeholder="Username"
                  name="username"
                  type="text"
                  tabindex="1"
                  auto-complete="on"
                />
              </el-form-item>

              <el-form-item prop="password" style="margin-bottom:5px;">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="loginForm.password"
                  :type="passwordType"
                  placeholder="Password"
                  name="password"
                  tabindex="2"
                  auto-complete="on"
                  @keyup.enter.native="handleLogin"
                />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
              </el-form-item>
              <el-row type="flex" class="row-bg" justify="end">
                <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light" /></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                  <el-button class="forget-password" style="color: white" type="text" @click="handleForgetPwd">忘记密码</el-button>
                </div>
                </el-col>
              </el-row>
              <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:20px;" @click.native.prevent="handleLogin">登录</el-button>
              <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:10px;margin-left: 0px;" @click.native.prevent="handleRegister">注册</el-button>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="验证码登录" name="second">
            <el-form ref="loginByVerifyCodeForm" :model="loginByVerifyCodeForm" :rules="loginByVerifyCodeRules" auto-complete="on" label-position="left">
              <el-form-item prop="phone">
                <span class="svg-container">
                  <svg-icon icon-class="user" />
                </span>
                <el-input
                  ref="phone"
                  v-model="loginByVerifyCodeForm.phone"
                  placeholder="请输入手机号"
                  name="phone"
                  :title="title"
                  type="text"
                  tabindex="1"
                  auto-complete="on"
                />
              </el-form-item>

              <!--
-->
              <el-form-item prop="verifyCode" style="margin-bottom:18px;">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>

                <el-input
                  ref="verifyCode"
                  v-model="loginByVerifyCodeForm.verifyCode"
                  placeholder="验证码"
                  name="verifyCode"
                  tabindex="2"
                  auto-complete="on"
                  @keyup.enter.native="handleLogin"
                />
                <span class="svg-container">
                <!--                <el-button>获取验证码</el-button>-->
                </span>
                <span v-show="sendAuthCode" class="auth_text auth_text_blue" @click="getAuthCode">获取验证码</span>
                <span v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">{{ auth_time }} </span>
                  秒重发</span>
              </el-form-item>
              <el-row type="flex" class="row-bg" justify="end">
                <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light" /></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                  <el-button style="color: white" type="text" />
                </div>
                </el-col>
              </el-row>
              <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:20px;" @click.native.prevent="handleLoginByVerifyCode">登录</el-button>
              <!--          <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:10px;margin-left: 0px;" @click.native.prevent="handleRegister">注册</el-button>-->
            </el-form>
          </el-tab-pane>

        </el-tabs>

      <!--      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;margin-left: 0px;" @click.native.prevent="handleLogin">注册到云账号</el-button>-->

      <!--      <div class="tips">-->
      <!--        <el-row type="flex" class="row-bg" justify="end">-->
      <!--          <el-col :span="2"><div class="grid-content bg-purple" /></el-col>-->
      <!--          <el-col :span="6"><div class="grid-content bg-purple" />username: admin</el-col>-->
      <!--          <el-col :span="6"><div class="grid-content bg-purple-light" /></el-col>-->
      <!--          <el-col :span="8"><div class="grid-content bg-purple" />password: 123456</el-col>-->
      <!--          &lt;!&ndash;          <el-col :span="2"><div class="grid-content bg-purple"></div> </el-col>&ndash;&gt;-->

      <!--        </el-row>-->
      <!--        &lt;!&ndash;        <span style="margin-right:20px;">username: admin</span>&ndash;&gt;-->
      <!--        &lt;!&ndash;        <span> password: 123456</span>&ndash;&gt;-->
      <!--      </div>-->

      </el-form>
    </div>
  </div>
</template>

<script >
// import { validUsername } from '@/utils/validate'
import Logo from '@/assets/images/logo.png'
import Background from '@/assets/images/background.jpg'
import Vue from 'vue'
import axios from 'axios'
import { mapMutations } from 'vuex'
import { validUsername, validPassword, validSno } from '@/utils/validate'
Vue.prototype.axios = axios
import { getToken, getCode, setToken, setCode, setUser, getUser, setUserId, getUserId, setUserRole, getUserRole } from '@/utils/auth'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length > 6) {
        callback(new Error('密码不能少于6位数'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    const validateVerifyCode = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error('请输入正确验证码'))
      } else {
        callback()
      }
    }
    return {
      // title:"获取验证码",
      sendAuthCode: true,
      /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
      auth_time: 0,
      /* 倒计时 计数器*/
      activeName: 'first',
      verifyCode: '',
      data() {
      },
      fullWidth: document.documentElement.clientWidth,
      loginForm: {
        username: '15900000001',
        password: '123456'
      },
      loginByVerifyCodeForm: {
        phone: '15750735837',
        verifyCode: '123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loginByVerifyCodeRules: {
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        verifyCode: [{ required: true, trigger: 'blur', validator: validateVerifyCode }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      title: '到云后台管理系统',
      logo: Logo,
      background: Background
    }
  },
  computed: {
    // 用于校验手机号码格式是否正确
    phoneNumberStyle() {
      const reg = /^1[3456789]\d{9}$/
      if (!reg.test(this.loginByVerifyCodeForm.phone)) {
        return false
      }
      return true
    }
  },

  created() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    getAuthCode() {
      if (this.phoneNumberStyle) {
        console.log('发送验证码' + this.loginByVerifyCodeForm.phone)
        this.axios.get('/sms/' + this.loginByVerifyCodeForm.phone)
          .then(res => {
            console.log(res)
            if (res.data.code !== 200) {
              this.$message.error('获取验证码失败！')
            }
            this.$message.success('获取验证码成功！')
            this.verifyCode = res.data.verifyCode
          })
        this.sendAuthCode = false
        // 设置倒计时秒
        this.auth_time = 30
        var auth_timetimer = setInterval(() => {
          this.auth_time--
          if (this.auth_time <= 0) {
            this.sendAuthCode = true
            clearInterval(auth_timetimer)
          }
        }, 1000)
      } else {
        this.$message.error('请输入手机号！')
      }
    },
    handleResize(event) {
      this.fullWidth = document.documentElement.clientWidth
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // ...mapMutations(['changeLogin']),
    // handleLogin() {
    //   this.$refs.loginForm.validate(valid => {
    //     if (!valid) {
    //       this.loading = true
    //       window.localStorage.setItem('username', this.loginForm.username)
    //       // window.localStorage.setItem('Authorization', this.loginForm.username)
    //       this.$store.dispatch('user/login', this.loginForm).then(() => {
    //         console.log('sb')
    //         this.$router.push({ path: this.redirect || '/' })
    //         this.loading = false
    //       }).catch(() => {
    //         this.loading = false
    //       })
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // },
    // ...mapMutations(['changeLogin']),
    // handleLogin: function() {
    //   const _this = this
    //   if (this.loginForm.username === '' || this.loginForm.password === '') {
    //     alert('账号或密码不能为空')
    //   } else {
    //     this.axios({
    //       methods: 'post',
    //       url: '/user/getUsers',
    //       data: _this.loginForm
    //     }).then(res => {
    //       console.log(res.data)
    //       _this.userToken = 'Bearer' + res.data.body.token
    //       _this.changeLogin({ Authorization: _this.userToken })
    //       _this.$router.push('/home')
    //       alert('登录成功')
    //     }).catch(error => {
    //       alert('账号密码错误')
    //       console.log(error)
    //       console.log(_this.userToken)
    //       _this.$router.push('/login')
    //     })
    //   }
    // },
    // 引入loginChange方法
    // ...mapMutations(['loginChange']),
    handleLogin() {
      // eslint-disable-next-line no-undef
      // const { data: res } = awaitthis.axios.get('/user/userLogin?username=' + this.loginForm.username + '&password=' + this.loginForm.password)
      // console.log('123' + res)
      this.axios.post('/login/',
        {
          'code': '',
          'password': this.loginForm.password,
          'username': this.loginForm.username
        })

      // this.$store.dispatch('user/login', this.loginForm)
        .then(successResponse => {
          // 获取后端返回数据
          console.log(successResponse)
          // setUserId(this.loginForm.userid)

          // setUserRole(successResponse.data.obj.role)
          // setCode(successResponse.data.code)
          // console.log(getToken())
          // console.log(getCode())
          // console.log(successResponse)
          // const state = successResponse.data.code
          // 打印token
          // 判断是否登录成功
          if (successResponse.data.code === 200) {

            setUser(this.loginForm.username)
            setToken(successResponse.data.obj.token)
            this.getUserInfo()
            this.$router.push('/')
            // 加入到全局变量中
            // this.loginChange({
            //   userName: this.loginForm.userName,
            //   Authorization: getToken(),
            //   signTime: new Date().getTime()
            // })
            // this.$router.push('/dashborad')
          } else {
            this.$message.error('用户名或密码错误')
          }
        })
    },
    getUserInfo() {
      console.log('getuserinfo')
      var arr = this
      this.axios.get('/user/info', { headers: {
        'Authorization': getToken()
      }
      })
        .then(res => {
          console.log(res.data)
          if (res.data.code !== 200) {
            // return this.$message.error('获取个人信息失败')
            return 0
          }
          // this.$message.success('获取个人信息成功')
          if (res.data.obj.role === 2) {
            setUserRole('admin')
          } else if (res.data.obj.role === 1) {
            console.log('shige laoshi ')
            setUserRole('teacher')
          }else{
            setUserRole('student')
          }
          // console.log(getUserRole())
          arr.dataForm = res.data.obj
        })
    },
    handleLoginByVerifyCode() {
      // eslint-disable-next-line no-undef
      // const { data: res } = awaitthis.axios.get('/user/userLogin?username=' + this.loginForm.username + '&password=' + this.loginForm.password)
      // console.log('123' + res)
      console.log(this.loginByVerifyCodeForm.verifyCode)
      this.axios.post('/loginbycode/',
        {
          'code': this.loginByVerifyCodeForm.verifyCode,
          'password': '',
          'username': this.loginByVerifyCodeForm.phone
        })
        // this.$store.dispatch('user/login', this.loginForm)
        .then(successResponse => {
          // 获取后端返回数据
          // console.log('123456')
          // console.log(successResponse)
          // setToken(successResponse.data.data.token)
          // setCode(successResponse.data.code)
          // console.log(getToken())
          // console.log(getCode())
          // console.log(successResponse)
          // const state = successResponse.data.code
          // 打印token
          // 判断是否登录成功
          if (successResponse.data.code === 200) {
            this.$router.push('/')
            // 加入到全局变量中
            this.loginChange({
              userName: this.loginByVerifyCodeForm.phone,
              Authorization: getToken(),
              signTime: new Date().getTime()
            })
            this.$router.push('/dashborad')
          } else {
            this.$message('该账号未注册或验证码错误')
          }
        })
    },
    handleForgetPwd() {
      console.log('go to forgetpsw page')
      this.$router.push('/forgetPsw')
    },
    handleRegister() {
      console.log('go to register page')
      this.$router.push('/register')
    }
  }
}
</script>

<style lang="scss">

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.login_box {
  width: 500px;
  height: 550px;
  /* background-color: #fff; */
  background-color: #2e527bb3;
  border-radius: 10px;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
//.middle {
//  position: absolute
//  top 0
//  left 0
//  width 100%
//  height 100%
//  z-index -1
//}
//.login {
//  display: flex;
//  justify-content: center;
//  align-items: center;
//  height: 100%;
//  background-size: cover;
//}
/* reset element-ui css */
.login-container {

  .el-input {
    display: inline-block;
    height: 47px;
    width: 65%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: white;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  background-image:url('../../assets/images/background.jpg');
  background-size: 100% 100%;
  overflow: hidden;

  .login-form {

    //background-color: $bg;
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    margin-top:-25px;//调整登录框跟顶部的位置
    overflow: hidden;

  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: white;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: center;
    margin-top:-100px;
    .sidebar-logo {
      width: 42px;
      height: 42px;
      vertical-align: middle;
      margin-left: 100px;//调整logo与标题的位置
      margin-right: 12px;
      margin-bottom:15px
    }
    //.title {
    //  font-size: 26px;
    //  color: $light_gray;
    //  margin: 0px auto 40px auto;
    //  text-align: center;
    //  font-weight: bold;
    //}
    .title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 26px;
      text-align: center;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
      margin-bottom:15px;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: white;
    cursor: pointer;
    user-select: none;
  }
}
.el-tabs__item:hover {
  color: white;
  /*background-color: orange ;*/

}
.el-tabs__item.is-active {
  color: white;
  /*background-color: orange;*/
}
</style>
