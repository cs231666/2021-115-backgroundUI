<template>
  <div class="forget-container">
    <div class="forgetpsw_box">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left" style="margin-top: -100px">

        <div class="title-container">
          <h3 class="title" style="color: white">忘记密码</h3>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入手机号"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item prop="verifyCode" style="margin-bottom:18px;">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>

          <el-input
            ref="verifyCode"
            v-model="loginForm.verifyCode"
            placeholder="验证码"
            name="verifyCode"
            tabindex="2"
            auto-complete="on"
          />
          <!--          @keyup.enter.native="handleLogin"-->

          <span class="svg-container">
            <!--                <el-button>获取验证码</el-button>-->
          </span>
          <span v-show="sendAuthCode" class="auth_text auth_text_blue" @click="getAuthCode">获取验证码</span>
          <span v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">{{ auth_time }} </span>
            秒重发</span>
        </el-form-item>
        <el-button :loading="loading" type="primary" style="width:45%;margin-bottom:5px;margin-left: 10px;color:white" @click.native.prevent="handleCancel">清空</el-button>
        <el-button :loading="loading" type="primary" style="width:45%;margin-bottom:20px;margin-left: 20px"  @click.native.prevent="resetPsw">重置密码</el-button>

        <el-button :loading="loading" type="text" style="float:right;font-weight:bold;color:white" @click.native.prevent="handlelogin">返回登录</el-button>

      </el-form>
    </div>
  </div>
</template>
<script>
import { setToken, setUser } from '@/utils/auth'

console.log('forgetpsw page')
import { validUsername } from '@/utils/validate'
export default {
  name: 'Index',
  computed: {
    // 用于校验手机号码格式是否正确
    phoneNumberStyle() {
      const reg = /^1[3456789]\d{9}$/
      if (!reg.test(this.loginForm.username)) {
        return false
      }
      return true
    }
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的手机号！'))
      } else {
        callback()
      }
    }
    return {
      sendAuthCode: true,
      /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
      auth_time: 0,
      /* 倒计时 计数器*/
      loginForm: {
        username: '',
        verifyCode: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }]
      },
      active: 0,
      loading: false
    }
  },

  methods: {
    next() {
      if (this.active++ > 2) this.active = 0
    },
    handleSend() {
      console.log('hhh')
    },
    handleCancel() {
      this.loginForm.username = ''
    },
    handlelogin() {
      this.$router.push('/login')
    },
    getAuthCode() {
      if (this.phoneNumberStyle) {
        console.log('发送验证码' + this.loginForm.username)
        this.axios.post('/sms/' + this.loginForm.username)
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
    resetPsw(){
      this.axios.put('/user/forgotPassword',
        {
          'username': this.loginForm.username,
          'code': this.loginForm.verifyCode
        })
        .then(res => {
          // 获取后端返回数据
          console.log(res)
          if (res.data.code === 200) {
            setUser(this.loginForm.username)
            setToken(res.data.obj.token)
            this.getUserInfo()
            this.$router.push('/login')
          } else {
            this.$message.error('用户名或密码错误')
          }
        })
    }
  }
}
</script>

<style lang="scss">

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .forget-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.forget-container {
  background-image:url('../../assets/images/background.jpg');
  background-size: 100% 100%;
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
      color: white;
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
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#F2F6FC;
$dark_gray:#889aa4;
$light_gray:#eee;
.forgetpsw_box {
  width: 500px;
  height: 400px;
  /* background-color: #fff; */
  background-color: #2e527bb3;
  border-radius: 10px;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.forget-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .auto-login{
    margin-bottom: 20px;
  }
  .forget-password{
    margin-top: -10px;
    float: right;
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
    position: relative;

    .title {
      font-size: 26px;
      color: white;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
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
</style>
