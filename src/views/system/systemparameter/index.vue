<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-card class="box-card">
          <el-row>
            <el-col :span="12">
              <span>系统参数</span>
            </el-col>
            <el-col :span="12">
              <el-button
                class="filter-item"
                size="mini"
                style="float: right;padding: 4px 10px;margin-bottom: 20px"
                type="primary"
                icon="el-icon-plus"
                @click="addSysParamVisible = true"
              >新增</el-button>
            </el-col>
          </el-row>
          <el-table :data="sysParamList" stripe>
            <!--            <el-table-column label="#" type="index" fixed />-->
            <el-table-column label="参数名称" prop="paramName" />
            <el-table-column label="参数值" prop="paramValue" />
            <!--          <el-table-column label="描述" prop="description" />-->
            <el-table-column label="操作" width="150" fixed="right">
              <template slot-scope="scope">
                <!-- 编辑系统参数按钮 -->
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="showEditDialog(scope.row)"
                />
                <!-- 删除系统参数按钮 -->
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="removeParam(scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
          <!--          <span>-->
          <!--            &lt;!&ndash;      <el-button @click="addDetailVisible = false">取 消</el-button>&ndash;&gt;-->
          <!--            <el-button type="primary" style="float:right;margin-bottom: 20px" @click="saveSysParam">保 存</el-button>-->
          <!--          </span>-->
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      title="新增系统参数"
      :visible.sync="addSysParamVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form ref="editDDFormRef" :model="addSysParamForm" :rules="addSysParamFormRules" label-width="80px">
        <el-form-item label="系统参数" prop="sysParamName">
          <el-input v-model="addSysParamForm.sysParamName" />
        </el-form-item>
        <el-form-item label="参数值" prop="sysParamValue">
          <el-input v-model="addSysParamForm.sysParamValue" />
        </el-form-item>
        <!--        <el-form-item label="排序">-->
        <!--          <el-input v-model="editDDForm.dataOrder" />-->
        <!--        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addSysParamVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSysParam()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑系统参数"
      :visible.sync="editSysParamDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form ref="editDDFormRef" :model="editSysParamForm" :rules="editSysParamFormRules" label-width="80px">
        <el-form-item label="参数名称">
          <el-input v-model="editSysParamForm.sysParamName" disabled />
        </el-form-item>
        <el-form-item label="原参数值">
          <el-input v-model="editSysParamForm.sysParamValue" disabled />
        </el-form-item>
        <el-form-item label="新参数值" prop="newSysParamValue">
          <el-input v-model="editSysParamForm.newSysParamValue" />
        </el-form-item>
      <!--        <el-form-item label="排序">-->
      <!--          <el-input v-model="editDDForm.dataOrder" />-->
      <!--        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editSysParamDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSysParam()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
Vue.prototype.axios = axios
export default {
  name: 'Index',
  data() {
    return {
      nowParamId: '',
      addSysParamVisible: false,
      editSysParamDialogVisible: false,
      sysParamList: [],
      editSysParamForm: {
        sysParamName: '',
        sysParamValue: '',
        newSysParamValue: ''
      },
      addSysParamForm: {
        sysParamName: '',
        sysParamValue: ''
        // sysParamNewValue: ''
      },
      addSysParamFormRules: {
        sysParamName: [
          { required: true, message: '请输入系统参数名称', trigger: 'blur' },
          { min: 2, max: 15, message: '用户名长度在2-15之间', trigger: 'blur' }
        ],
        sysParamValue: [
          { required: true, message: '请输入参数值', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在1-15之间', trigger: 'blur' }
        ]
      },
      editSysParamFormRules: {
        sysParamNewValue: [
          { required: true, message: '请输入新参数值', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在1-15之间', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getSysParamList()
    this.editSysParamVisible = false
  },
  methods: {
    editDialogClosed() {
      this.$refs.editDDFormRef.resetFields()
    },
    getSysParamList() {
      // console.log()
      var arr = this
      this.axios.get('/sysparam')
        .then(res => {
          console.log(res.data)
          if (res.data.code !== 200) {
            return this.$message.error('获取系统参数列表失败')
          }
          this.$message.success('获取系统参数列表成功')
          arr.sysParamList = res.data.obj
        })
    },
    showEditDialog(res) {
      console.log(res)
      this.editSysParamForm.sysParamName = res.paramName
      this.editSysParamForm.sysParamValue = res.paramValue
      this.nowParamId = res.paramId
      this.editSysParamDialogVisible = true
    },
    showAddSysParamDialog() {

    },
    addSysParam() {
      this.axios.post('/sysparam/' + this.addSysParamForm.sysParamName +
        '/' + this.addSysParamForm.sysParamValue)
        .then(res => {
          console.log(res.data)
          if (res.data.code !== 200) {
            return this.$message.error('新增系统参数失败')
          }
          this.$message.success('新增系统参数成功')
          this.addSysParamVisible = false
        // arr.sysParamList = res.data.obj
        })
    },
    editSysParam() {
      this.axios.put('/sysparam/' + this.nowParamId + '/' + this.editSysParamForm.sysParamName +
        '/' + this.editSysParamForm.newSysParamValue)
        .then(res => {
          console.log(res.data)
          if (res.data.code !== 200) {
            return this.$message.error('编辑系统参数失败')
          }
          this.$message.success('编辑系统参数成功')
          this.editSysParamDialogVisible = false
          // arr.sysParamList = res.data.obj
        })
    },
    async removeParam(dataForm) {
      // console.log(dataForm)
      const confirmResult = await this.$confirm(
        '此操作将永久删除该系统参数, 是否继续?',
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
      await this.axios.delete('/sysparam/' + dataForm.paramId).then(res => {
        // console.log(res)
        if (res.data.code !== 200) return this.$message.error('删除系统参数失败！')
        this.$message.success('删除系统参数成功！')
        this.getDataDictionaryList()
      }

      )
    }
  }
}
</script>

<style scoped>

</style>
