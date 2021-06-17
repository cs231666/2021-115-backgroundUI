<template>
  <div class="app-container">
    <el-row class="searchRow" :gutter="20">
      <el-col :span="24" :xs="24" :sm="24" :md="20" :lg="20" :xl="20" style="margin-bottom: 10px">
        <el-card class="box-card">
          <el-row>
            <el-col :span="12">
              <el-input
                v-model="queryInfo.dataName"
                placeholder="请输入数据字典value关键字"
                class="inputSearch"
                clearable
                @clear="getCourseList"
              >
                <el-button slot="append" icon="el-icon-search" @click="getCourseList" />
              </el-input>
            </el-col>
            <el-col :span="12">
              <el-button
                class="filter-item"
                size="mini"
                style="float: right;padding: 4px 10px"
                type="primary"
                icon="el-icon-plus"
                @click="addCourseVisible= true"
              >新增</el-button>
            </el-col>

          </el-row>
          <!--          <el-table :data="courseList" stripe @row-click="getDictDetail">-->
          <el-table :data="courseList" stripe>
            <!--            <el-table-column label="#" type="index" fixed />-->
            <el-table-column label="班课名称" prop="courseName" />
            <el-table-column label="教授班级" prop="className" />
            <el-table-column label="授课教师" prop="teacher" />
            <el-table-column label="学校院系" prop="org" />
            <el-table-column label="授课学期" prop="term" />
            <el-table-column label="操作" width="150" fixed="right">
              <template slot-scope="scope">
                <!-- 编辑数据字典按钮 -->
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="showEditDialog(scope.row)"
                />
                <!-- 删除数据字典按钮 -->
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="removeCourse(scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页区域 -->
          <el-pagination
            :current-page="queryInfo.page"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="queryInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            align="right"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
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
      title="添加班课"
      :visible.sync="addCourseVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form ref="editDDFormRef" :model="addCourseForm" :rules="addCourseRules" label-width="80px">
        <el-form-item label="班课名称" prop="courseName">
          <el-input v-model="addCourseForm.courseName" />
        </el-form-item>
        <el-form-item label="教授班级" prop="className">
          <el-input v-model="addCourseForm.className" />
        </el-form-item>
        <el-form-item label="所属院校" prop="school">
          <el-cascader
            v-model="school"
            :options="options"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="授课教师" prop="teacher">
          <el-input v-model="addCourseForm.teacher" />
        </el-form-item>
        <el-form-item label="授课学期" prop="term">
          <el-input v-model="addCourseForm.term" />
        </el-form-item>

        <!--        <el-form-item label="排序">-->
        <!--          <el-input v-model="editDDForm.dataOrder" />-->
        <!--        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCourseVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCourse()">确 定</el-button>
      </span>
    </el-dialog>
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
        <!--        <el-form-item label="排序">-->
        <!--          <el-input v-model="editDDForm.dataOrder" />-->
        <!--        </el-form-item>-->
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
        <el-button @click="addCourseVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCourse()">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { getToken, setUserId, getUserId } from '@/utils/auth'

Vue.prototype.axios = axios
export default {
  data() {
    return {
      school: [],
      options: [{
        value: '厦门大学',
        label: '厦门大学',
        children: [{
          value: '数计学院',
          label: '数计学院'
          // children: [{
          //   value: 'yizhi',
          //   label: '一致'
          // }, {
          //   value: 'fankui',
          //   label: '反馈'
          // }, {
          //   value: 'xiaolv',
          //   label: '效率'
          // }, {
          //   value: 'kekong',
          //   label: '可控'
          // }]
        }, {
          value: '经济学院',
          label: '经济学院'
          // children: [{
          //   value: 'cexiangdaohang',
          //   label: '侧向导航'
          // }, {
          //   value: 'dingbudaohang',
          //   label: '顶部导航'
          // }]
        }]
      }, {
        value: '福州大学',
        label: '福州大学',
        children: [{
          value: '数计学院',
          label: '数计学院'
          // children: [{
          //   value: 'layout',
          //   label: 'Layout 布局'
          // }, {
          //   value: 'color',
          //   label: 'Color 色彩'
          // }, {
          //   value: 'typography',
          //   label: 'Typography 字体'
          // }, {
          //   value: 'icon',
          //   label: 'Icon 图标'
          // }, {
          //   value: 'button',
          //   label: 'Button 按钮'
          // }]
        }, {
          value: '化工学院',
          label: '化工学院'
          // children: [{
          //   value: 'radio',
          //   label: 'Radio 单选框'
          // }, {
          //   value: 'checkbox',
          //   label: 'Checkbox 多选框'
          // }, {
          //   value: 'input',
          //   label: 'Input 输入框'
          // }, {
          //   value: 'input-number',
          //   label: 'InputNumber 计数器'
          // }, {
          //   value: 'select',
          //   label: 'Select 选择器'
          // }, {
          //   value: 'cascader',
          //   label: 'Cascader 级联选择器'
          // }, {
          //   value: 'switch',
          //   label: 'Switch 开关'
          // }, {
          //   value: 'slider',
          //   label: 'Slider 滑块'
          // }, {
          //   value: 'time-picker',
          //   label: 'TimePicker 时间选择器'
          // }, {
          //   value: 'date-picker',
          //   label: 'DatePicker 日期选择器'
          // }, {
          //   value: 'datetime-picker',
          //   label: 'DateTimePicker 日期时间选择器'
          // }, {
          //   value: 'upload',
          //   label: 'Upload 上传'
          // }, {
          //   value: 'rate',
          //   label: 'Rate 评分'
          // }, {
          //   value: 'form',
          //   label: 'Form 表单'
          // }]
        }, {
          value: '经济学院',
          label: '经济学院'
          // children: [{
          //   value: 'table',
          //   label: 'Table 表格'
          // }, {
          //   value: 'tag',
          //   label: 'Tag 标签'
          // }, {
          //   value: 'progress',
          //   label: 'Progress 进度条'
          // }, {
          //   value: 'tree',
          //   label: 'Tree 树形控件'
          // }, {
          //   value: 'pagination',
          //   label: 'Pagination 分页'
          // }, {
          //   value: 'badge',
          //   label: 'Badge 标记'
          // }]
        }, {
          value: '人文学院',
          label: '人文学院'
          // children: [{
          //   value: 'alert',
          //   label: 'Alert 警告'
          // }, {
          //   value: 'loading',
          //   label: 'Loading 加载'
          // }, {
          //   value: 'message',
          //   label: 'Message 消息提示'
          // }, {
          //   value: 'message-box',
          //   label: 'MessageBox 弹框'
          // }, {
          //   value: 'notification',
          //   label: 'Notification 通知'
          // }]
        }]
      }, {
        value: '福建师范大学',
        label: '福建师范大学',
        children: [{
          value: '数计学院',
          label: '数计学院'
        }, {
          value: '马克思学院',
          label: '马克思学院'
        }]
      }],
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
    this.getCourseList()
    this.getUserInfo()
  },
  methods: {
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
    getCourseList() {
      // console.log()
      var arr = this
      this.axios.get('/course/')
        .then(res => {
          console.log(res.data)
          if (res.data.code !== 200) {
            return this.$message.error('获取班课列表失败')
          }
          this.$message.success('获取班课列表成功')
          arr.courseList = res.data.obj
        })
    },
    addCourse() {
      // console.log(this.addDetailForm)
      this.axios.post('/course/',
        // + this.addDetailForm.dictCode + '/' + this.addDetailForm.code + '/' + this.addDetailForm.name
        {
          'className': this.addCourseForm.className,
          'courseName': this.addCourseForm.courseName,
          'creator': getUserId(),
          'org': this.school[0] + ' ' + this.school[1],
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
    async removeCourse(dataForm) {
      // console.log(dataForm)
      const confirmResult = await this.$confirm(
        '此操作将永久删除该班课, 是否继续?',
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
      await this.axios.delete('/course/' + dataForm.courseId).then(res => {
        // console.log(res)
        if (res.data.code !== 200) return this.$message.error('删除班课失败！')
        this.$message.success('删除班课成功！')
        this.getCourseList()
      }

      )
    },
    handleChange(value) {
      console.log(value)
    }
  }
}
</script>
