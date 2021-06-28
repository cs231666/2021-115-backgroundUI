<template>
  <div class="app-container">
    <!--面包屑-->
    <!--    <el-breadcrumb separator-class="el-icon-arrow-right">-->
    <!--      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
    <!--      <el-breadcrumb-item>数据字典管理管理</el-breadcrumb-item>-->
    <!--      <el-breadcrumb-item>数据字典列表</el-breadcrumb-item>-->
    <!--    </el-breadcrumb>-->
    <!--卡片区域-->

    <!-- 搜索框 -->
    <el-row class="searchRow" :gutter="20">
      <el-col :span="24" :xs="24" :sm="24" :md="10" :lg="12" :xl="12" style="margin-bottom: 10px">
        <el-card class="box-card">
          <el-row>
            <!--            <el-col :span="12">-->
            <!--              <el-input-->
            <!--                v-model="queryInfo.dataName"-->
            <!--                placeholder="请输入数据字典value关键字"-->
            <!--                class="inputSearch"-->
            <!--                clearable-->
            <!--                @clear="getDataDictionaryList"-->
            <!--              >-->
            <!--                <el-button slot="append" icon="el-icon-search" @click="getDataDictionaryList" />-->
            <!--              </el-input>-->
            <!--            </el-col>-->
            <el-col :span="22">
              <el-button
                class="filter-item"
                size="mini"
                style="float: right;padding: 4px 10px"
                type="primary"
                icon="el-icon-plus"
                @click="addDictVisible= true"
              >字典</el-button>
            </el-col>

          </el-row>

          <el-table :data="dataDictionaryList" stripe @row-click="getDictDetail">
            <!--            <el-table-column label="#" type="index" fixed />-->
            <el-table-column label="名称" prop="dictName" />
            <el-table-column label="关键字" prop="dictCode" />
            <el-table-column label="描述" prop="description" />
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
                  @click="removeDD(scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页区域 -->
          <!--          <el-pagination-->
          <!--            :current-page="queryInfo.page"-->
          <!--            :page-sizes="[5, 10, 15, 20]"-->
          <!--            :page-size="queryInfo.pageSize"-->
          <!--            layout="total, sizes, prev, pager, next, jumper"-->
          <!--            :total="total"-->
          <!--            align="right"-->
          <!--            @size-change="handleSizeChange"-->
          <!--            @current-change="handleCurrentChange"-->
          <!--          />-->
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="14" :lg="12" :xl="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-row>
              <el-col :span="12">
                <span>字典详情</span>
              </el-col>
              <el-col :span="10">
                <el-button
                  class="filter-item"
                  size="mini"
                  style="float: right;padding: 4px 10px"
                  type="primary"
                  icon="el-icon-plus"
                  @click="showAddDetailDialog()"
                >字典值</el-button>
              </el-col>
            </el-row>
            <el-table :data="dictDetailList" stripe @row-click="getDictDetail">
              <el-table-column label="所属字典" prop="dictCode" />
              <el-table-column label="字典值" prop="name" />
              <el-table-column label="code" prop="code" />
              <el-table-column label="排序" type="index" fixed />
              <el-table-column label="升/降序" fixed="right">
                <template slot-scope="scope">
                  <el-button size="mini" type="text" @click.stop="sortUp(scope.$index, scope.row)">↑ </el-button>
                  <el-button size="mini" type="text" @click.stop="sortDown(scope.$index, scope.row)">↓</el-button>
                  <!-- 编辑数据字典按钮 -->

                </template>
              </el-table-column>
              <el-table-column label="操作" width="150" fixed="right">
                <template slot-scope="scope">
                  <!-- 编辑数据字典按钮 -->
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="showEditDetailDialog(scope.row)"
                  />
                  <!-- 删除数据字典按钮 -->
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    @click="removeDetail(scope.row)"
                  />
                </template>
              </el-table-column>
            </el-table>
          </div>
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

    <!-- 详情页对话框 -->
    <el-dialog
      title="数据字典详情"
      :visible.sync="editDialogVisible"
      width="30%"
      @close="editDialogClosed"
    >
      <el-form ref="editDDFormRef" :model="editDDForm" :rules="editFormRules" label-width="80px">
        <el-form-item label="原名称">
          <el-input v-model="editDDForm.dictName" disabled />
        </el-form-item>
        <el-form-item label="原关键字">
          <el-input v-model="editDDForm.dictCode" disabled />
        </el-form-item>
        <el-form-item label="原描述">
          <el-input v-model="editDDForm.description" disabled />
        </el-form-item>
        <!--        <el-form-item label="排序">-->
        <!--          <el-input v-model="editDDForm.dataOrder" />-->
        <!--        </el-form-item>-->
        <el-form-item label="新名称" prop="newDictName">
          <el-input v-model="editDDForm.newDictName" />
        </el-form-item>
        <el-form-item label="新关键字" prop="newDictCode">
          <el-input v-model="editDDForm.newDictCode" />
        </el-form-item>
        <el-form-item label="新描述" prop="newDescription">
          <el-input v-model="editDDForm.newDescription" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDD()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="数据字典详情"
      :visible.sync="editDetailDialogVisible"
      width="30%"
      @close="editDialogClosed"
    >
      <el-form ref="editDDFormRef" :model="detailForm" :rules="editDetailFormRules" label-width="80px">
        <el-form-item label="所属字典">
          <el-input v-model="detailForm.dictCode" disabled />
        </el-form-item>
        <el-form-item label="原字典值">
          <el-input v-model="detailForm.name" disabled />
        </el-form-item>
        <el-form-item label="新字典值" prop="newName">
          <el-input v-model="detailForm.newName" />
        </el-form-item>
        <!--        <el-form-item label="排序">-->
        <!--          <el-input v-model="editDDForm.dataOrder" />-->
        <!--        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDetailDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDetail()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增字典页对话框 -->
    <el-dialog
      title="新增数据字典"
      :visible.sync="addDictVisible"
      width="30%"
      @close="editDialogClosed"
    >
      <el-form ref="editDDFormRef" :model="addDictForm" :rules="addDictFormRules" label-width="80px">
        <el-form-item label="名称" prop="dictName">
          <el-input v-model="addDictForm.dictName" />
        </el-form-item>
        <el-form-item label="关键字" prop="dictCode">
          <el-input v-model="addDictForm.dictCode" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="addDictForm.description" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDictVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDict()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增字典值页对话框 -->
    <el-dialog
      title="新增字典值"
      :visible.sync="addDetailVisible"
      width="30%"
      @close="editDialogClosed"
    >
      <el-form
        ref="editDDFormRef"
        :model="addDetailForm"
        :rules="addDetailFormRules"
        label-width="80px"
      >
        <el-form-item label="所属字典">
          <el-input v-model="addDetailForm.dictCode" disabled />
        </el-form-item>
        <el-form-item label="字典值" prop="name">
          <el-input v-model="addDetailForm.name" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDetailVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDetail()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import Sortable from 'sortablejs'
Vue.prototype.axios = axios
export default {
  data() {
    return {
      nowDictCode: '',
      nowCode: '',
      total: 0,
      // 详情页显示与隐藏
      editDialogVisible: false,
      editDetailDialogVisible: false,
      addDetailVisible: false,
      addDictVisible: false,
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
      dataDictionaryList: [],
      dictDetailList: [],
      detailForm: {
        dictCode: '',
        name: '',
        description: '',
        newName: '',
        detailId: '',
        code: ''
      },
      // 编辑数据字典信息
      editDDForm: {
        dictId: '',
        dictCode: '',
        dictName: '',
        dataOrder: '',
        newDictCode: '',
        newDictName: '',
        newDescription: ' '
      },
      addDictForm: {
        dictCode: '',
        dictName: '',
        description: ''
      },
      addDetailForm: {
        dictCode: '',
        name: '',
        description: '',
        code: ''
      },
      // 添加表单的验证规则对象
      editFormRules: {
        newDictCode: [
          { required: true, message: '请输入新关键字', trigger: 'blur' },
          { min: 2, max: 15, message: '关键字长度在2-15之间', trigger: 'blur' }
        ],
        newDictName: [
          { required: true, message: '请输入新名称', trigger: 'blur' },
          { min: 1, max: 15, message: '名称长度在1-15之间', trigger: 'blur' }
        ]
      },
      editDetailFormRules: {
        newName: [
          { required: true, message: '请输入新字典值', trigger: 'blur' },
          { min: 1, max: 15, message: '字典值长度在1-15之间', trigger: 'blur' }
        ]
      },
      addDictFormRules: {
        dictCode: [
          { required: true, message: '请输入关键字', trigger: 'blur' },
          { min: 2, max: 15, message: '关键字长度在2-15之间', trigger: 'blur' }
        ],
        dictName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 15, message: '名称长度在1-15之间', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' },
          { min: 1, max: 15, message: '描述长度在1-15之间', trigger: 'blur' }
        ]
      },
      addDetailFormRules: {
        name: [
          { required: true, message: '请输入字典值', trigger: 'blur' },
          { min: 1, max: 15, message: '字典值长度在1-15之间', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getDataDictionaryList()
  },
  methods: {
    sortUp(index, row) {
      this.axios.put('/dictionary-detail/up/' + row.detailId)
      // console.log(row)
      if (index === 0) {
        this.$message({
          message: '已经是列表中第一个素材！',
          type: 'warning'
        })
      } else {
        const temp = this.dictDetailList[index - 1]
        this.$set(this.dictDetailList, index - 1, this.dictDetailList[index])
        this.$set(this.dictDetailList, index, temp)
      }
    },
    sortDown(index, row) {
      this.axios.put('/dictionary-detail/down/' + row.detailId)
      if (index === (this.dictDetailList.length - 1)) {
        this.$message({
          message: '已经是列表中最后一个素材！',
          type: 'warning'
        })
      } else {
        const i = this.dictDetailList[index + 1]
        this.$set(this.dictDetailList, index + 1, this.dictDetailList[index])
        this.$set(this.dictDetailList, index, i)
      }
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    async getDataDictionaryList() {
      var arr = this
      // console.log(this.queryInfo)
      await this.axios.get('/dictionary/' + this.queryInfo
        .pageSize + '/' + this.queryInfo.page + '/1')
        // {
        // params: {
        //   limit: this.queryInfo.pageSize,
        //   page: this.queryInfo.page
        // }
      // }
        .then(res => {
          console.log(res.data)
          if (res.data.code !== 200) {
            return this.$message.error('获取数据字典列表失败')
          }
          this.$message.success('获取数据字典列表成功')
          this.total = res.data.obj.length
          // console.log('total=' + this.total)
          arr.dataDictionaryList = res.data.obj
          // console.log(res.data.obj)
          // console.log(arr.dataDictionaryList)
        })
      // console.log(res)
      // if (res.state !== 'success') {
      //   return this.$message.error('获取数据字典列表失败')
      // }
      // this.$message.success('获取数据字典列表成功')
      // this.total = res.result.length
      // this.dataDictionaryList = res.result
      this.getDictDetail(this.dataDictionaryList[0])
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getDataDictionaryList()
    },
    // 监听 页码值 的改变
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getDataDictionaryList()
    },
    async getDictDetail(data) {
      var arr = this
      this.nowDictCode = data.dictCode
      console.log(data.dictCode)
      await this.axios.get('/dictionary-detail/' + data.dictCode + '/1/10/1')
        .then(res => {
          if (res.data.code !== 200) {
            return this.$message.error('获取字典详情失败')
          }
          console.log('getDictDetail' + res)
          arr.dictDetailList = res.data.obj
          this.nowCode = this.dictDetailList.length
          console.log(this.dictDetailList)
        })
      // console.log(data)
    },
    showEditDialog(res) {
      console.log(res)
      this.editDDForm.dictCode = res.dictCode
      this.editDDForm.dictName = res.dictName
      this.editDDForm.description = res.description
      this.editDDForm.dictId = res.dictId
      this.editDialogVisible = true
    },
    showEditDetailDialog(res) {
      console.log(res)
      this.detailForm.dictCode = res.dictCode
      this.detailForm.name = res.name
      // this.detailForm.description = res.description
      this.detailForm.newName = res.newName
      this.detailForm.detailId = res.detailId
      this.editDetailDialogVisible = true
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editDDFormRef.resetFields()
    },
    // 修改数据字典
    async editDD() {
      // 提交请求前，表单预验证
      // 1. this.$refs.editDDFormRef.validate(async valid => {
      // console.log(valid)
      // 表单预校验失败
      // 2. if (!valid) return
      // const { data: res } = await this.$http.put(
      //   'dataDictionary',
      //   this.editDDForm
      // )
      // console.log(this.editDDForm.dictId)
      await this.axios.put('/dictionary/' + this.editDDForm.dictId +
          '/' + this.editDDForm.newDictCode + '/' +
          this.editDDForm.newDictName + '/' + this.editDDForm.newDescription)
        .then(res => {
          if (res.data.code !== 200) {
            this.$message.error('更新数据字典失败！')
          }
          // 隐藏添加用户对话框
          this.editDialogVisible = false
          this.$message.success('更新数据字典成功！')
          this.getDataDictionaryList()
        })
      // 3. })
    },
    async editDetail() {
      // console.log(this.detailForm.detailId)
      await this.axios.put('/dictionary-detail/' + this.detailForm.detailId +
        '/' + this.detailForm.newName)
        .then(res => {
          if (res.data.code !== 200) {
            this.$message.error('更新字典值失败！')
          }
          // 隐藏添加用户对话框
          this.editDetailDialogVisible = false
          this.$message.success('更新字典值成功！')
          this.dictDetailList = ''
          this.getDataDictionaryList()
          this.getDictDetail()
        })
    },
    // 删除数据字典
    async removeDD(dataForm) {
      // console.log(dataForm)
      const confirmResult = await this.$confirm(
        '此操作将永久删除该数据字典, 是否继续?',
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
      await this.axios.delete('/dictionary/' + dataForm.dictId).then(res => {
        // console.log(res)
        if (res.data.code !== 200) return this.$message.error('删除数据字典失败！')
        this.$message.success('删除数据字典成功！')
        this.getDataDictionaryList()
      }

      )
    },
    async removeDetail(dataForm) {
      // console.log('removeDetail' + dataForm.detailId)
      const confirmResult = await this.$confirm(
        '此操作将永久删除字典值, 是否继续?',
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
      await this.axios.delete('/dictionary-detail/' + dataForm.detailId).then(res => {
        // console.log(res)
        if (res.data.code !== 200) return this.$message.error('删除数据字典失败！')
        this.$message.success('删除数据字典成功！')
        this.dictDetailList = ''
        this.getDictDetail()
      }

      )
    },
    addDict() {
      // console.log(this.addDictForm)
      this.axios.post('/dictionary/' + this.addDictForm.dictCode + '/' +
        this.addDictForm.dictName + '/' + this.addDictForm.description)
        .then(res => {
          if (res.data.code !== 200) return this.$message.error('新增数据字典失败！')
          this.$message.success('新增数据字典成功！')
          this.addDictVisible = false
          // this.dictDetailList = ''
          // this.getDictDetail()
          this.getDataDictionaryList()
        })
    },
    addDetail() {
      // console.log(this.addDetailForm)
      this.axios.post('/dictionary-detail/' + this.addDetailForm.dictCode + '/' +
        this.addDetailForm.code + '/' + this.addDetailForm.name)
        .then(res => {
          console.log(res)
          if (res.data.code !== 200) return this.$message.error('新增字典值失败！')
          this.$message.success('新增字典值成功！')
          this.addDetailVisible = false
          // this.dictDetailList = ''
          // this.getDictDetail()
          this.getDataDictionaryList()
        })
    },
    showAddDetailDialog() {
      // console.log(this.nowDictCode + '-----' + this.nowCode )
      this.addDetailVisible = true
      this.addDetailForm.dictCode = this.nowDictCode
      this.addDetailForm.code = this.nowCode
    },
    // 行拖拽
    rowDrop() {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      const _this = this
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.tableData.splice(oldIndex, 1)[0]
          _this.tableData.splice(newIndex, 0, currRow)
        }
      })
    },
    // 列拖拽
    columnDrop() {
      const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
      this.sortable = Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onEnd: evt => {
          const oldItem = this.dropCol[evt.oldIndex]
          this.dropCol.splice(evt.oldIndex, 1)
          this.dropCol.splice(evt.newIndex, 0, oldItem)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
