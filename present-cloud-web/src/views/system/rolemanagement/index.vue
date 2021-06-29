<template>
  <div class="app-container">

    <el-row class="searchRow" :gutter="20">
      <el-col :span="18" style="margin-bottom: 10px">
        <el-card class="box-card">
          <el-row>
            <el-col v-if="isadmin">
              麻烦标哥多点击几次班课名称旁边的箭头
            </el-col>

          </el-row>
          <!--          <el-table :data="courseList" stripe @row-click="getDictDetail">-->
          <div v-if="roleList.length>0">
            <el-table :data="roleList" stripe :row-key="getRowKeys" :expand-row-keys="expands" @expand-change="showexpand">
              <!--            <template slot-scope="scope" v-if="scope.row.childList.length>0">-->
              <!--              <el-table :data="scope.row.childList" style="width=100%">-->

              <!--              </el-table>-->
              <!--            </template>-->
              <el-table-column type="expand">

                <template slot-scope="scope" style="width: 550px">
                  <el-card class="box-card" style="width: 550px">

                    <div v-if="scope.row.childList.length>0" style="width: 500px">
                      <el-table :data="scope.row.childList" border height="250" width="400">

                        <el-table-column label="ID" prop="id" width="50" />
                        <el-table-column label="用户姓名" prop="realname" width="80" />
                        <el-table-column label="联系方式" prop="phone" width="110" />
                        <el-table-column label="组织" prop="org" width="250" />
                        <!--                        <el-table-column v-if="scope.row.role===2" label="角色变更" width="220">-->
                        <!--                          <template slot-scope="scope">-->
                        <!--                            <el-button-->
                        <!--                              type="success"-->
                        <!--                              size="mini"-->
                        <!--                              @click="toTeacher(scope.row)"-->
                        <!--                            >老师</el-button>-->
                        <!--                            <el-button-->
                        <!--                              type="success"-->
                        <!--                              size="mini"-->
                        <!--                              disabled-->
                        <!--                              @click="toAdmin(scope.row)"-->
                        <!--                            >管理员</el-button>-->

                        <!--                          </template>-->
                        <!--                        </el-table-column>-->
                        <!--                        <el-table-column v-if="scope.row.role===1" label="角色变更" width="220">-->
                        <!--                          <template slot-scope="scope">-->
                        <!--                            <el-button-->
                        <!--                              type="success"-->
                        <!--                              size="mini"-->
                        <!--                              disabled-->
                        <!--                              @click="toTeacher(scope.row)"-->
                        <!--                            >老师</el-button>-->
                        <!--                            <el-button-->
                        <!--                              type="success"-->
                        <!--                              size="mini"-->
                        <!--                              @click="toAdmin(scope.row)"-->
                        <!--                            >管理员</el-button>-->
                        <!--                          </template>-->
                        <!--                        </el-table-column>-->

                      </el-table>
                    </div>
                    <div v-else align="center">该班课没有学生</div>

                  </el-card>
                </template>

              </el-table-column>
              <el-table-column label="角色名称" prop="roleName" width="150" />
              <el-table-column label="菜单权限" prop="menuAuth" width="300" />
              <!--              <el-table-column label="授课教师" prop="teacher" width="100" />-->
              <!--              <el-table-column label="学校院系" prop="org" width="250" />-->
              <!--              <el-table-column label="授课学期" prop="term" width="120" />-->
              <!--              <el-table-column  label="操作" width="350">-->
              <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="showEditAuthDialog(scope.row)"
                  >编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-else align="center">该系统没有设置角色</div>
          <!-- 分页区域 -->

          <!--        <el-pagination-->
          <!--          :current-page="queryInfo.page"-->
          <!--          :page-sizes="[5, 10, 15, 20]"-->
          <!--          :page-size="queryInfo.pageSize"-->
          <!--          layout="total, sizes, prev, pager, next, jumper"-->
          <!--          :total="total"-->
          <!--          align="right"-->
          <!--          @size-change="handleSizeChange"-->
          <!--          @current-change="handleCurrentChange"-->
          <!--        />-->
        </el-card>
      </el-col>

      <!--      <el-col :xs="24" :sm="24" :md="14" :lg="13" :xl="13">-->
      <!--        <el-card class="box-card">-->
      <!--          <div slot="header" class="clearfix">-->
      <!--            <span>字典详情</span>-->
      <!--            <el-button-->
      <!--              v-if="checkPer(['admin','dict:add']) && this.$refs.dictDetail && this.$refs.dictDetail.query.dictName"-->
      <!--              class="filter-item"-->
      <!--              size="mini"-->
      <!--              style="float: right;padding: 4px 10px"-->
      <!--              type="primary"-->
      <!--              icon="el-icon-plus"-->
      <!--              @click="$refs.dictDetail && $refs.dictDetail.crud.toAdd()"-->
      <!--            >新增</el-button>-->
      <!--          </div>-->
      <!--          <dictDetail ref="dictDetail" :permission="permission" />-->
      <!--        </el-card>-->
      <!--      </el-col>-->
    </el-row>
    <!--    <el-row style="margin-bottom: 15px;float: right">-->
    <!--      <el-col :span="24">-->
    <!--        &lt;!&ndash;<el-input style="width: 200px" v-model="searchInput" placeholder="请输入班课编码查询"></el-input>&ndash;&gt;-->
    <!--        &lt;!&ndash;<el-button type="success" round icon="el-icon-search" @click="handleSearch">搜索</el-button>&ndash;&gt;-->
    <!--        <router-link to="create">-->
    <!--          <el-button type="primary" round>创建班课</el-button>-->
    <!--        </router-link>-->
    <!--      </el-col>-->
    <!--    </el-row>-->
    <el-dialog
      title="修改权限"
      :visible.sync="editAuthVisible"
      width="30%"
      @close="editDialogClosed"
    >
      <el-form ref="editDDFormRef" :model="editAuthForm" label-width="80px">
        <el-form-item label="角色">
          <el-input v-model="editAuthForm.rolename" disabled />
        </el-form-item>
        <el-form-item label="权限">
          <!--          <el-input v-model="editAuthForm.auth"  />-->
          <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;" />
          <!--          <el-checkbox-group v-model="editAuthForm.auth" @change="handleCheckedCitiesChange">-->
          <el-checkbox-group v-model="editAuthForm.auth" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="menu in menus" :key="menu" :label="menu">{{ menu }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editAuthVisible = false">取 消</el-button>
        <el-button type="primary" @click="editAuth()">确 定</el-button>
      </span>
    </el-dialog>
    <!--    <el-radio-group v-model="direction">-->
    <!--      <el-radio label="ltr">从左往右开</el-radio>-->
    <!--      <el-radio label="rtl">从右往左开</el-radio>-->
    <!--      <el-radio label="ttb">从上往下开</el-radio>-->
    <!--      <el-radio label="btt">从下往上开</el-radio>-->
    <!--    </el-radio-group>-->
    <!--    <el-drawer-->
    <!--      title="签到记录"-->
    <!--      :visible.sync="drawer"-->
    <!--      :direction="direction"-->
    <!--      size="36%"-->
    <!--    >-->
    <!--      &lt;!&ndash;      <el-table :data="signedList" stripe :row-key="getRowKeys" >&ndash;&gt;-->
    <!--      &lt;!&ndash;        &lt;!&ndash;            <template slot-scope="scope" v-if="scope.row.childList.length>0">&ndash;&gt;&ndash;&gt;-->
    <!--      &lt;!&ndash;        &lt;!&ndash;              <el-table :data="scope.row.childList" style="width=100%">&ndash;&gt;&ndash;&gt;-->

    <!--      &lt;!&ndash;        &lt;!&ndash;              </el-table>&ndash;&gt;&ndash;&gt;-->
    <!--      &lt;!&ndash;        &lt;!&ndash;            </template>&ndash;&gt;&ndash;&gt;-->
    <!--      &lt;!&ndash;        <el-table-column label="学号" prop="studentId" width="100" />&ndash;&gt;-->
    <!--      &lt;!&ndash;        <el-table-column label="姓名" prop="realname" width="80" />&ndash;&gt;-->
    <!--      &lt;!&ndash;        <el-table-column label="签到时间" prop="signTime" width="250" />&ndash;&gt;-->
    <!--      &lt;!&ndash;      </el-table>&ndash;&gt;-->

    <!--      <div v-if="signedList.length>0">-->
    <!--        <el-table :data="signedList" style="width=100%;margin-left: 10px" border height="500">-->

    <!--          <el-table-column label="学号" prop="studentId" width="100" />-->
    <!--          <el-table-column label="姓名" prop="realname" width="80" />-->
    <!--          <el-table-column label="签到时间" prop="signTime" width="240" />-->
    <!--          <el-table-column label="距离(m)" prop="distance" width="80" />-->
    <!--        </el-table>-->
    <!--      </div>-->
    <!--      <div v-else align="center">没有签到记录</div>-->
    <!--    </el-drawer>-->

  </div>

</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { getToken, setUserId, getUserId, getUserRole } from '@/utils/auth'

Vue.prototype.axios = axios
const menuOptions = [' 个人信息', ' 班课列表', ' 我创建的', ' 数据字典', ' 系统参数', ' 组织管理', ' 用户管理', ' 角色管理']
export default {

  data() {
    return {
      roleList: [
        {
          roleName: '管理员',
          role: 2,
          // pageAuth:'',
          menuAuth: [' 个人信息', ' 班课列表', ' 我创建的', ' 数据字典', ' 系统参数', ' 组织管理', ' 用户管理', ' 角色管理']
        },
        {
          roleName: '教师',
          role: 1,
          // pageAuth: '',
          menuAuth: [' 个人信息', ' 班课列表', ' 我创建的']
        }
      ],
      menus: menuOptions,
      checkAll: false,
      isIndeterminate: true,
      userList: [],
      drawer: false,
      direction: 'rtl',
      signedList: [],
      isadmin: false,
      activeName: 'first',
      school: [],
      expands: [],
      childList: [],
      reschildList: [],
      signinList: [],
      ressigninList: [],
      schoolNum: '',
      schoolDetailNum: '',
      schoolList: [],
      schoolDetailList: [],
      schoolName: '',
      schoolDetailName: '',
      memberList: [],
      total: 0,
      courseList: [],
      addCourseVisible: false,
      editAuthVisible: false,
      courseForm: {
        courseName: '',
        teacher: '',
        note: '',
        term: '',
        courseId: ''
      },
      addCourseForm: {
        className: '',
        courseName: '',
        teacher: '',
        org: '',
        term: '',
        creator: ''
      },
      editAuthForm: {
        role: '',
        rolename: '',
        auth: []
        // newCourseName: '',
        // note: '',
        // newNote: '',
        // term: '',
        // courseId: ''
      },
      signedForm: {
        studentId: '',
        realName: '',
        signTime: ''
      },
      queryInfo: {
        getAll: 1,
        dictName: '',
        dataName: '',
        // 当前的页数
        page: 1,
        // 当前每页显示多少条数据
        pageSize: 10
        // limit: 10
      },
      addCourseRules: {
        courseName: [
          { required: true, message: '请输入班课名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在2-15之间', trigger: 'blur' }
        ],
        teacher: [
          { required: true, message: '请输入授课教师名称', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在1-15之间', trigger: 'blur' }
        ],
        className: [
          { required: true, message: '请输入教授班级', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在1-15之间', trigger: 'blur' }
        ],
        term: [
          { required: true, message: '请输入授课学期', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在1-15之间', trigger: 'blur' }
        ]
      },
      editCourseRules: {
        newCourseName: [
          { required: true, message: '请输入班课新名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在2-15之间', trigger: 'blur' }
        ],
        newNote: [
          { required: true, message: '请输入新描述', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在1-15之间', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.isadmin = false
    // this.signedList.length=0
    // this.signinList.length=0
    // this.getCourseList()
    // this.getUserInfo()
    if (getUserRole() === 'admin') {
      this.isadmin = true
    }
    // this.getOrg()
  },
  methods: {
    // handleClose(done) {
    //   this.$confirm('确认关闭？')
    //     .then(_ => {
    //       done()
    //     })
    //     .catch(_ => {})
    // },
    handleCheckAllChange(val) {
      this.editAuthForm.auth = val ? menuOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.menus.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.menus.length
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    getRowKeys(row) {
      return row.role
    },
    async showexpand(row, expandRows) {
      var that = this
      if (expandRows.length) {
        that.expands = []
        if (row) {
          console.log('rowid')
          console.log(row.role)
          console.log(expandRows.length)
          that.expands.push(row.role)// 每次push进去的是每行的ID
          if (expandRows.length > 0) {
            this.roleList.map(async(item, index) => {
              console.log(item)
              console.log(index)
              if (item.role === row.role) {
                var arr = this
                arr.reschildList = []
                arr.ressigninList = []
                console.log('item.courseId' + row.role)
                console.log('row.courseId' + row.role)
                this.axios.get('/user/getUsersByRoleId/' + item.role)
                  .then(res => {
                    //  console.log(res.data)

                    if (res.data.code !== 200) {
                      return 0
                    } else {
                      arr.reschildList = res.data.obj
                      console.log('arr.reschildList')
                      console.log(arr.reschildList)
                    }
                    this.roleList[index].childList = arr.reschildList
                    console.log(index + 'childlist')
                    console.log(this.roleList[index])
                    // this.$message.success('获取个人信息成功')
                    // console.log(this.memberList)
                    // arr.courseList.children = this.memberList
                  })
              }

              // console.log(item)
            })
          }
          // console.log('row data')
          //  console.log(row)
        }
      } else {
        that.expands = []// 默认不展开
      }
    },
    showEditAuthDialog(data) {
      console.log(data)
      this.editAuthForm.role = data.role
      this.editAuthForm.rolename = data.roleName
      this.editAuthForm.auth = data.menuAuth
      this.editAuthVisible = true
    },
    editAuth() {
      this.roleList[this.editAuthForm.role === 2 ? 0 : 1].menuAuth = this.editAuthForm.auth
      this.editAuthVisible = false
    },
    closeExpand() {
      this.expands = []
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
          setUserId(res.data.obj.id)
          console.log(getUserId())
          if (res.data.code !== 200) {
            return 0
          }
          // this.$message.success('获取个人信息成功')
          arr.dataForm = res.data.obj
        })
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getDataDictionaryList()
    },
    // 监听 页码值 的改变
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getDataDictionaryList()
    },
    editDialogClosed() {
      this.$refs.editDDFormRef.resetFields()
    },
    toAdmin(data) {
      console.log(data)
      this.axios.put('/user/update-info',
        {
          'birthday': data.birthday,
          'org': data.org,
          'realname': data.realname,
          'role': 2,
          'sex': data.sex,
          'studentId': data.id
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
            this.$message.success('角色变更成功')

            // setUser(this.loginForm.username)
            // setToken(res.data.obj.token)
            // this.getUserInfo()
          } else {
            this.$message.error('角色变更失败')
          }
        })
    },
    handleChange(value) {
      console.log(value)
    },
    showAddStuDialog(row) {
      // var params = {
      //   roleId: row.courseId,
      // };
      // roleIdGetUsers(params).then((res) => {
      //   if ((res.code = "1000")) {
      //     var list = [];
      //     const { data } = res;
      //     data.forEach((da) => {
      //       list.push(da.id);
      //     });
      //     this.userValue = list;
      //     this.dialogUserVisible = true;
      //     this.userId = row.id;
      //     this.userName = row.roleName;
      //   }
      // });
    }
  }
}
</script>
