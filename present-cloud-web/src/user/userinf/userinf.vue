<template>
  <div>
    <el-row :gutter="20" style="margin-top:10px;margin-left: 5px">
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>个人信息</span>
            </div>
            <div>
              <el-form v-model="dataForm" label-width="80px" size="small" label-position="right">
                <el-form-item label="用户昵称" prop="nickName">
                  <el-input v-model="dataForm.nickname" auto-complete="off" />
                </el-form-item>
                <el-form-item label="真实姓名" prop="nickName">
                  <el-input v-model="dataForm.realname" auto-complete="off" />
                </el-form-item>
                <el-form-item label="性别" prop="nickName">
                  <el-input v-model="dataForm.sex" auto-complete="off" />
                </el-form-item>
                <el-form-item label="身份" prop="nickName">
                  <el-input v-model="dataForm.role" auto-complete="off" disabled />
                </el-form-item>
                <el-form-item label="组织" prop="nickName">
                  <el-input v-model="dataForm.org" auto-complete="off" disabled />
                </el-form-item>
                <el-form-item label="手机号" prop="nickName">
                  <el-input v-model="dataForm.username" auto-complete="off" />
                </el-form-item>
                <el-form-item label="邮箱" prop="nickName">
                  <el-input v-model="dataForm.email" auto-complete="off" />
                </el-form-item>
                <!--                <el-form-item label="所在地区" prop="nickName">-->
                <!--                  <el-input v-model="dataForm.religion" auto-complete="off" />-->
                <!--                </el-form-item>-->
                <!--                <el-form-item label="住址" prop="nickName">-->
                <!--                  <el-input v-model="dataForm.address" auto-complete="off" />-->
                <!--                </el-form-item>-->
                <!--                <el-form-item label="个人简介" prop="phone">-->
                <!--                  &lt;!&ndash;                  <el-input v-model="dataForm.info" auto-complete="off" />&ndash;&gt;-->
                <!--                  <el-input v-model="dataForm.info" type="textarea" :rows="2" placeholder="请输入内容" />-->
                <!--                </el-form-item>-->
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button size="mini" type="primary" @click.native.prevent="updateInfo">提交</el-button>
                <el-button size="mini" type="warning">关闭</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
Vue.prototype.axios = axios
import { getToken, getCode, setToken, setCode, setUser, getUser } from '@/utils/auth'

export default {
  data() {
    return {
      rolename: ['学生', '教师', '管理员'],
      id: '',
      role: 0,
      dataForm: {
        // username: localStorage.getItem('username'),
        nickName: '',
        realname: '',
        birthday: '',
        sex: '',
        phone: '',
        org: '',
        role: '',
        // homeUrl: 'http://www.baidu.com',
        email: ''
        // info: '无',
        // religion: '福建省莆田市',
        // address: '福建省闽侯县福州大学36#612'
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      // console.log('getuserinfo')
      var arr = this
      this.axios.get('/user/info', { headers: {
        'Authorization': getToken()
      }
      })
        .then(res => {
          console.log(res.data)
          if (res.data.code !== 200) {
            return this.$message.error('获取个人信息失败')
          }
          this.$message.success('获取个人信息成功')
          arr.dataForm = res.data.obj
          this.role = arr.dataForm.role
          this.id = arr.dataForm.studentId
          this.dataForm.role = this.rolename[arr.dataForm.role]
        })
    },
    updateInfo() {
      console.log(getToken())
      this.axios.put('/user/update-info',
        {
          'birthday': '',
          'org': this.dataForm.org,
          'realname': this.dataForm.realname,
          'role': this.role,
          'sex': this.dataForm.sex,
          'studentId': this.id
        },
        {
          headers: {
            'Authorization': getToken()
          }
        })
        .then(res => {
          // 获取后端返回数据
          console.log(res)
          if (res.data.code === 200) {
            this.$message.success('更新个人信息成功')
            this.getUserInfo()
            // setUser(this.loginForm.username)
            // setToken(res.data.obj.token)
            // this.getUserInfo()
          } else {
            this.$message.error('更新个人信息失败')
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
//卡片样式
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 70%;
}
//文本样式区
.name-role {
  font-size: 16px;
  padding: 5px;
  text-align:center;
}
.sender{
  text-align:center;
}
.registe-info{
  text-align: center;
  padding-top:10px;
}
.personal-relation {
  font-size: 16px;
  padding: 0px 5px 15px;
  margin-right: 1px;
  width: 100%
}

.relation-item {
  padding: 12px;

}
.dialog-footer{
  padding-top:10px ;
  padding-left: 10%;
}
//布局样式区
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: white;
  //background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>

