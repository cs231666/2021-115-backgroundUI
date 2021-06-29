<template>
  <div class="app-container">

    <el-row class="searchRow" :gutter="20">
      <el-col :span="23"  style="margin-bottom: 10px">
        <el-card class="box-card">
          <!--          <el-row>-->
          <!--            &lt;!&ndash;          <el-col :span="12">&ndash;&gt;-->
          <!--            &lt;!&ndash;            <el-input&ndash;&gt;-->
          <!--            &lt;!&ndash;              v-model="queryInfo.dataName"&ndash;&gt;-->
          <!--            &lt;!&ndash;              placeholder="请输入数据字典value关键字"&ndash;&gt;-->
          <!--            &lt;!&ndash;              class="inputSearch"&ndash;&gt;-->
          <!--            &lt;!&ndash;              clearable&ndash;&gt;-->
          <!--            &lt;!&ndash;              @clear="getCourseList"&ndash;&gt;-->
          <!--            &lt;!&ndash;            >&ndash;&gt;-->
          <!--            &lt;!&ndash;              <el-button slot="append" icon="el-icon-search" @click="getCourseList" />&ndash;&gt;-->
          <!--            &lt;!&ndash;            </el-input>&ndash;&gt;-->
          <!--            &lt;!&ndash;          </el-col>&ndash;&gt;-->

          <!--            <el-col :span="18">-->
          <!--              <el-button-->
          <!--                class="filter-item"-->
          <!--                size="mini"-->
          <!--                style="float: right;padding: 4px 10px"-->
          <!--                type="primary"-->
          <!--                icon="el-icon-plus"-->
          <!--                @click="addCourseVisible= true"-->
          <!--              >班课</el-button>-->
          <!--            </el-col>-->

          <!--          </el-row>-->
          <!--          <el-table :data="courseList" stripe @row-click="getDictDetail">-->
          <div v-if="userList.length>0">
            <el-table :data="userList" stripe :row-key="getRowKeys" :expand-row-keys="expands" @expand-change="showexpand">
              <!--            <template slot-scope="scope" v-if="scope.row.childList.length>0">-->
              <!--              <el-table :data="scope.row.childList" style="width=100%">-->

              <!--              </el-table>-->
              <!--            </template>-->
              <el-table-column label="工号" prop="studentId" width="130" />
              <el-table-column label="姓名" prop="realname" width="110" />
              <el-table-column label="性别" prop="sex" width="80" />
              <el-table-column label="角色" prop="role" width="100" />
              <el-table-column label="学校院系" prop="org" width="250" />
              <el-table-column label="联系方式" prop="phone" width="250" />

              <el-table-column v-if="isadmin" label="操作" width="150">
                <!--              <el-table-column label="操作" width="150" fixed="right">-->
                <template slot-scope="scope">
                  <!--              <el-button-->
                  <!--                type="success"-->
                  <!--                size="mini"-->
                  <!--                @click="showAddStuDialog(scope.row)"-->
                  <!--              >加入学生</el-button>-->
                  <!--

-->
                  <!-- 编辑数据字典按钮 -->
                  <!--                <el-button-->
                  <!--                  type="primary"-->
                  <!--                  size="mini"-->
                  <!--                  @click="showEditDialog(scope.row)"-->
                  <!--                >编辑</el-button>-->
                  <!-- 删除数据字典按钮 -->
                  <el-button
                    type="danger"
                    size="mini"
                    @click="removeUser(scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-else align="center">该系统没有注册用户</div>
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
    <!--      <el-dialog-->
    <!--        title="添加班课"-->
    <!--        :visible.sync="addCourseVisible"-->
    <!--        width="50%"-->
    <!--        @close="editDialogClosed"-->
    <!--      >-->
    <!--        <el-form ref="editDDFormRef" :model="addCourseForm" :rules="addCourseRules" label-width="80px">-->
    <!--          <el-form-item label="班课名称" prop="courseName">-->
    <!--            <el-input v-model="addCourseForm.courseName" />-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="教授班级" prop="className">-->
    <!--            <el-input v-model="addCourseForm.className" />-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="所属院校" prop="school">-->
    <!--            <el-select-->
    <!--              v-model="school[0]"-->
    <!--              clearable-->
    <!--              placeholder="学校"-->
    <!--              class="filter-item"-->
    <!--              style="width: 140px"-->
    <!--              @change="getOrgDetail(school[0])"-->
    <!--            >-->
    <!--              <el-option-->
    <!--                v-for="item in schoolList"-->
    <!--                :key="item.detailId"-->
    <!--                :value="item.detailId"-->
    <!--                :label="item.name"-->
    <!--              />-->
    <!--            </el-select>-->
    <!--            <el-select-->
    <!--              v-model="school[1]"-->
    <!--              clearable-->
    <!--              placeholder="学院"-->
    <!--              class="filter-item"-->
    <!--              style="width: 140px"-->
    <!--            >-->
    <!--              <el-option-->
    <!--                v-for="item in schoolDetailList"-->
    <!--                :key="item.detailId"-->
    <!--                :value="item.detailId"-->
    <!--                :label="item.name"-->
    <!--              />-->
    <!--            </el-select>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item />-->
    <!--          <el-form-item label="授课教师" prop="teacher">-->
    <!--            <el-input v-model="addCourseForm.teacher" />-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="授课学期" prop="term">-->
    <!--            <el-input v-model="addCourseForm.term" />-->
    <!--          </el-form-item>-->
    <!--        </el-form>-->
    <!--        <span slot="footer" class="dialog-footer">-->
    <!--          <el-button @click="addCourseVisible = false">取 消</el-button>-->
    <!--          <el-button type="primary" @click="addCourse()">确 定</el-button>-->
    <!--        </span>-->
    <!--      </el-dialog>-->
    <el-dialog
      title="编辑班课"
      :visible.sync="editCourseVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form ref="editDDFormRef" :model="editCourseForm" :rules="editCourseRules" label-width="80px">
        <el-form-item label="班课名称">
          <el-input v-model="editCourseForm.courseName" disabled />
        </el-form-item>
        <el-form-item label="授课教师">
          <el-input v-model="editCourseForm.teacher" disabled />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="editCourseForm.note" disabled />
        </el-form-item>
        <el-form-item label="授课学期">
          <el-input v-model="editCourseForm.term" disabled />
        </el-form-item>
        <el-form-item label="新名称" prop="newCourseName">
          <el-input v-model="editCourseForm.newCourseName" />
        </el-form-item>
        <el-form-item label="新描述" prop="newNote">
          <el-input v-model="editCourseForm.newNote" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCourseVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCourse()">确 定</el-button>
      </span>
    </el-dialog>
    <!--    <el-radio-group v-model="direction">-->
    <!--      <el-radio label="ltr">从左往右开</el-radio>-->
    <!--      <el-radio label="rtl">从右往左开</el-radio>-->
    <!--      <el-radio label="ttb">从上往下开</el-radio>-->
    <!--      <el-radio label="btt">从下往上开</el-radio>-->
    <!--    </el-radio-group>-->
    <el-drawer
      title="签到记录"
      :visible.sync="drawer"
      :direction="direction"
      size="36%"
    >
      <!--      <el-table :data="signedList" stripe :row-key="getRowKeys" >-->
      <!--        &lt;!&ndash;            <template slot-scope="scope" v-if="scope.row.childList.length>0">&ndash;&gt;-->
      <!--        &lt;!&ndash;              <el-table :data="scope.row.childList" style="width=100%">&ndash;&gt;-->

      <!--        &lt;!&ndash;              </el-table>&ndash;&gt;-->
      <!--        &lt;!&ndash;            </template>&ndash;&gt;-->
      <!--        <el-table-column label="学号" prop="studentId" width="100" />-->
      <!--        <el-table-column label="姓名" prop="realname" width="80" />-->
      <!--        <el-table-column label="签到时间" prop="signTime" width="250" />-->
      <!--      </el-table>-->

      <div v-if="signedList.length>0">
        <el-table :data="signedList" style="width=100%;margin-left: 10px" border height="500">

          <el-table-column label="学号" prop="studentId" width="100" />
          <el-table-column label="姓名" prop="realname" width="80" />
          <el-table-column label="签到时间" prop="signTime" width="240" />
          <el-table-column label="距离(m)" prop="distance" width="80" />
        </el-table>
      </div>
      <div v-else align="center">没有签到记录</div>
    </el-drawer>

  </div>

</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { getToken, setUserId, getUserId, getUserRole } from '@/utils/auth'

Vue.prototype.axios = axios
export default {
  data() {
    return {
      userList: [],
      rolename: ['学生', '教师', '管理员'],
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
      editCourseVisible: false,
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
      editCourseForm: {
        courseName: '',
        teacher: '',
        newCourseName: '',
        note: '',
        newNote: '',
        term: '',
        courseId: ''
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
    this.getUserList()
    this.getUserInfo()
    if (getUserRole() === 'admin') {
      this.isadmin = true
    }
    this.getOrg()
  },
  methods: {
    // handleClose(done) {
    //   this.$confirm('确认关闭？')
    //     .then(_ => {
    //       done()
    //     })
    //     .catch(_ => {})
    // },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    getRowKeys(row) {
      return row.courseId
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
    getOrg() {
      var arr = this
      this.axios.get('/org/school')
        .then(res => {
          console.log(res.data)
          // setUserId(res.data.obj.id)
          // console.log(getUserId())
          if (res.data.code !== 200) {
            return 0
          }
          this.schoolList = res.data.obj
          this.schoolNum = res.data.obj.length
          // console.log('this.schoolNum' + this.schoolNum)
          // console.log('schoolList' + this.schoolList[0].name)
          // this.$message.success('获取个人信息成功')
          // arr.dataForm = res.data.obj
        })
    },
    getOrgDetail(val) {
      for (let i = 0; i < this.schoolNum; i++) {
        if (val === this.schoolList[i].detailId) {
          this.schoolName = this.schoolList[i].name
          console.log(this.schoolName)
          break
        }
        // else if (i === to.meta.roles.length - 1) {
        //   // console.log('没有权限')
        //   alert('没有访问权限')
        //   next({
        //     path: from.path
        //   })
        // }
      }
      // console.log('123' + this.school)
      var arr = this
      this.axios.get('/org/next/' + val)
        .then(res => {
          console.log(res.data)
          // setUserId(res.data.obj.id)
          // console.log(getUserId())
          if (res.data.code !== 200) {
            return 0
          }
          this.schoolDetailList = res.data.obj
          this.schoolDetailNum = res.data.obj.length
          // console.log('schoolList' + this.schoolList[0].name)
          // this.$message.success('获取个人信息成功')
          // arr.dataForm = res.data.obj
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
    getUserList() {
      // console.log()
      var arr = this
      this.axios.get('/user/allinfo', { headers: {
        'Authorization': getToken()
      }
      })
        .then(res => {
          // console.log(res.data)
          if (res.data.code !== 200) {
            return this.$message.error('获取用户列表失败')
          }
          this.$message.success('获取用户列表成功')
          arr.userList = res.data.obj
          for (let i = 0; i < res.data.obj.length; i++) {
            arr.userList[i].role = this.rolename[arr.userList[i].role]
          }
          console.log(arr.courseList)
        })
    },
    addCourse() {
      // console.log('123' + this.school)
      for (let i = 0; i < this.schoolNum; i++) {
        if (this.school[1] === this.schoolDetailList[i].detailId) {
          this.schoolDetailName = this.schoolDetailList[i].name
          console.log(this.schoolDetailName)
          break
        }
      }
      // console.log(this.addDetailForm)
      this.axios.post('/course/',
        // + this.addDetailForm.dictCode + '/' + this.addDetailForm.code + '/' + this.addDetailForm.name
        {
          'className': this.addCourseForm.className,
          'courseName': this.addCourseForm.courseName,
          'creator': getUserId(),
          'org': this.schoolName + ' ' + this.schoolDetailName,
          'teacher': this.addCourseForm.teacher,
          'term': this.addCourseForm.term
        }
      )
        .then(res => {
          if (res.data.code !== 200) return this.$message.error('新增班课失败！')
          this.$message.success('新增班课成功！')
          this.addCourseVisible = false
          // this.dictDetailList = ''
          // this.getDictDetail()
          this.getCourseList()
        })
    },
    async editCourse() {
      console.log(this.editCourseForm.courseId + this.editCourseForm.newCourseName + this.editCourseForm.newNote)
      await this.axios.put('/course/' + this.editCourseForm.courseId +
        '/' + this.editCourseForm.newCourseName + '/' + this.editCourseForm.newNote)
        .then(res => {
          if (res.data.code !== 200) {
            this.$message.error('更新班课失败！')
          }
          // 隐藏添加用户对话框
          this.editCourseVisible = false
          this.$message.success('更新班课成功！')
          // this.dictDetailList = ''
          this.getCourseList()
          // this.getDictDetail()
        })
    },
    showEditDialog(dataForm) {
      console.log(dataForm)
      // console.log(this.nowDictCode + '-----' + this.nowCode )
      this.editCourseForm.courseId = dataForm.courseId
      // console.log(this.editCourseForm.couerId)
      this.editCourseForm.courseName = dataForm.courseName
      this.editCourseForm.teacher = dataForm.teacher
      this.editCourseForm.term = dataForm.term
      this.editCourseForm.note = dataForm.note
      this.editCourseVisible = true
    },
    async removeUser(dataForm) {
      // console.log(dataForm)
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      // 点击确定 返回值为：confirm
      // 点击取消 返回值为： cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      // console.log(dataForm)
      await this.axios.delete('/user/' + dataForm.username)
        .then(res => {
          // console.log(res)
          if (res.data.code !== 200) return this.$message.error('删除用户失败！')
          this.$message.success('删除用户成功！')
          this.getUserList()
        }

        )
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
