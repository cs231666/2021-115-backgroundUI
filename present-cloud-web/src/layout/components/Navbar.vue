<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!--          <img :src="avatar+  '?imageView2/1/w/80/h/80'" class="user-avatar">-->
          <!--          <img :src="squareUrl" alt="" class="user-avatar">-->
          <el-avatar shape="square" size="big" :src="squareUrl" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              主页
            </el-dropdown-item>
          </router-link>
          <!--          <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">-->
          <!--            <el-dropdown-item>Github</el-dropdown-item>-->
          <!--          </a>-->
          <!--          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">-->
          <!--            <el-dropdown-item>Docs</el-dropdown-item>-->
          <!--          </a>-->
          <el-dropdown-item divided @click.native="changePswVisible = true">
            <span style="display:block;">修改密码</span>
          </el-dropdown-item>
          <router-link to="/login">
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">登出</span>
            </el-dropdown-item>
          </router-link>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="changePswVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form ref="editDDFormRef" :model="changePswForm" :rules="changePswFormRules" label-width="80px">
        <el-form-item label="原密码" prop="oldPsw">
          <el-input
            :key="oldpasswordType"
            v-model="changePswForm.oldPsw"
            :type="oldpasswordType"
          />
          <span class="show-pwd" @click="showOldPwd">
            <svg-icon :icon-class="oldpasswordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item label="新密码" prop="newPsw">
          <el-input
            :key="newpasswordType"
            v-model="changePswForm.newPsw"
            :type="newpasswordType"
          />
          <span class="show-pwd" @click="showNewPwd">
            <svg-icon :icon-class="newpasswordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPsw">
          <el-input
            :key="confirmpasswordType"
            v-model="changePswForm.confirmPsw"
            :type="confirmpasswordType"
            @blur="verifyPsw"
          />
          <span class="show-pwd" @click="showConfirmPwd">
            <svg-icon :icon-class="confirmpasswordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <!--        <el-form-item label="排序">-->
        <!--          <el-input v-model="editDDForm.dataOrder" />-->
        <!--        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changePswVisible = false">取 消</el-button>
        <el-button type="primary" :disabled="this.btnstatus === 0" @click="changePsw('editDDFormRef')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
Vue.prototype.axios = axios
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { getToken, getCode, setToken, setCode, setUser, getUser } from '@/utils/auth'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      btnstatus: 0,
      changePswForm: {
        username: getUser(),
        oldPsw: '',
        newPsw: '',
        confirmPsw: ''
      },
      oldpasswordType: 'password',
      newpasswordType: 'password',
      confirmpasswordType: 'password',
      changePswVisible: false,
      squareUrl: require('@/assets/images/dog.jpg'),
      changePswFormRules: {
        oldPsw: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6-15之间', trigger: 'blur' }
        ],
        newPsw: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6-15之间', trigger: 'blur' }
        ],
        confirmPsw: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6-15之间', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    showOldPwd() {
      if (this.oldpasswordType === 'password') {
        this.oldpasswordType = ''
      } else {
        this.oldpasswordType = 'password'
      }
      // this.$nextTick(() => {
      //   this.$refs.password.focus()
      // })
    },
    showNewPwd() {
      if (this.newpasswordType === 'password') {
        this.newpasswordType = ''
      } else {
        this.newpasswordType = 'password'
      }
      // this.$nextTick(() => {
      //   this.$refs.password.focus()
      // })
    },
    showConfirmPwd() {
      if (this.confirmpasswordType === 'password') {
        this.confirmpasswordType = ''
      } else {
        this.confirmpasswordType = 'password'
      }
      // this.$nextTick(() => {
      //   this.$refs.password.focus()
      // })
    },
    editDialogClosed() {
      this.$refs.editDDFormRef.resetFields()
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    changePsw() {
      this.axios.put('/user/reset-password/',
        {
          'code': 0,
          'newpassword': this.changePswForm.newPsw,
          'oldpassword': this.changePswForm.oldPsw,
          'username': this.changePswForm.username
        })
        .then(successResponse => {
          // 获取后端返回数据
          console.log(successResponse)
          setUser(this.changePswForm.username)
          if (successResponse.data.code === 200) {
            this.$message.success(successResponse.data.msg)
            this.changePswVisible = false
            // this.$router.push('/')
          } else {
            this.$message.error(successResponse.data.msg)
          }
        })
    },
    verifyPsw() {
      if (this.changePswForm.newPsw === this.changePswForm.confirmPsw) {
        this.btnstatus = 1
      } else {
        this.btnstatus = 0
        this.$message.error('两次输入的密码不一致')
      }
    },
    // async
    logout() {
      // await this.$store.dispatch('user/logout')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
