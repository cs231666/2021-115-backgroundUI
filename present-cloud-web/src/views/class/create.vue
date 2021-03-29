<template>
  <div class="app-container">
    <div class="class-create">
      <el-form ref="form" :model="form" label-width="120px">
        <!--<el-form-item label="课程封面">-->
        <!--<el-upload-->
        <!--class="avatar-uploader"-->
        <!--action="https://jsonplaceholder.typicode.com/posts/"-->
        <!--:show-file-list="false"-->
        <!--:on-success="handleAvatarSuccess"-->
        <!--:before-upload="beforeAvatarUpload"-->
        <!--&gt;-->
        <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
        <!--<i v-else class="el-icon-plus avatar-uploader-icon" />-->
        <!--</el-upload>-->
        <!--</el-form-item>-->
        <el-form-item label="课程名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="form.class" />
        </el-form-item>
        <el-form-item label="学期">
          <el-input v-model="form.term" />
        </el-form-item>
        <el-form-item label="类型">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="学校课表班课" name="type" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="学校/院系">
          <el-input v-model="form.university" />
        </el-form-item>
        <el-form-item label="课件">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :file-list="fileList"
          >
            <el-button size="small" type="primary" disabled>点击上传</el-button>
            <div slot="tip" class="el-upload__tip">上传文件不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="学习要求">
          <el-input v-model="form.learnDemand" type="textarea" />
        </el-form-item>
        <el-form-item label="教学进度">
          <el-input v-model="form.schedule" type="textarea" />
        </el-form-item>
        <el-form-item label="考试安排">
          <el-input v-model="form.exam" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">创建</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { addClass } from '@/api/class'
console.log('create class')
export default {
  name: 'Create',
  data() {
    return {
      form: {
        name: '',
        class: '',
        term: '',
        type: [],
        university: '',
        learnDemand: '',
        schedule: '',
        exam: ''
      },
      imageUrl: '',
      fileList: []
    }
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3)
    },
    onSubmit() {
      const data = {
        className: '',
        userId: 0
      }
      data.userId = this.userId
      data.className = this.form.name
      addClass(data).then(response => {
        this.$message({
          message: '创建成功！',
          type: 'success'
        })
      })
      this.$router.push('/class')
    },
    onCancel() {
      // this.$message({
      //   message: 'cancel!',
      //   type: 'warning'
      // })
      this.$router.push('/class')
    }
  }
}
</script>

<style scoped>

</style>
