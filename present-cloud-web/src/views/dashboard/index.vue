<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎{{username}}使用到云管理系统</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      username: localStorage.getItem('username')
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<!--<style lang="scss" scoped>-->
<!--.dashboard {-->
<!--  &-container {-->
<!--    margin: 30px;-->
<!--  }-->
<!--  &-text {-->
<!--    font-size: 30px;-->
<!--    line-height: 46px;-->
<!--  }-->
<!--}-->
<!--</style>-->
<!--<template>-->
<!--  <div class="app-container">-->
<!--    <el-row style="margin-bottom: 15px;float: right">-->
<!--      <el-col :span="24">-->
<!--        &lt;!&ndash;<el-input style="width: 200px" v-model="searchInput" placeholder="请输入班课编码查询"></el-input>&ndash;&gt;-->
<!--        &lt;!&ndash;<el-button type="success" round icon="el-icon-search" @click="handleSearch">搜索</el-button>&ndash;&gt;-->
<!--        <router-link to="/example/create">-->
<!--          <el-button type="primary" round>创建班课</el-button>-->
<!--        </router-link>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--    <template>-->
<!--      <el-table-->
<!--        :data="tableData"-->
<!--        element-loading-text="Loading"-->
<!--        border-->
<!--        fit-->
<!--        highlight-current-row-->
<!--        style="width: 100%"-->
<!--      >-->
<!--        <el-table-column-->
<!--          prop="no"-->
<!--          label="序号"-->
<!--        />-->
<!--        <el-table-column-->
<!--          prop="code"-->
<!--          label="课程编号"-->
<!--        />-->
<!--        <el-table-column-->
<!--          prop="name"-->
<!--          label="课程名称"-->
<!--        />-->
<!--        <el-table-column-->
<!--          prop="nums"-->
<!--          label="班级人数"-->
<!--        />-->
<!--        <el-table-column-->
<!--          prop="time"-->
<!--          label="开课学期"-->
<!--        />-->
<!--        &lt;!&ndash;        <el-table-column&ndash;&gt;-->
<!--        &lt;!&ndash;          prop="operation"&ndash;&gt;-->
<!--        &lt;!&ndash;          label="相关操作">&ndash;&gt;-->
<!--        &lt;!&ndash;        </el-table-column>&ndash;&gt;-->
<!--        <el-table-column class-name="status-col" width="350" align="center" label="相关操作">-->
<!--&lt;!&ndash;          <template slot-scope="scope">&ndash;&gt;-->
<!--          <template >-->
<!--            <el-button-->
<!--              size="mini"-->
<!--              type="primary"-->
<!--            >进入班课</el-button>-->
<!--            &lt;!&ndash;<el-button&ndash;&gt;-->
<!--            &lt;!&ndash;size="mini"&ndash;&gt;-->
<!--            &lt;!&ndash;type="success"&ndash;&gt;-->
<!--            &lt;!&ndash;@click="handleEdit(scope.$index, scope.row)">班课资源</el-button>&ndash;&gt;-->
<!--            <el-button-->
<!--              size="mini"-->
<!--              type="warning"-->
<!--            >编辑</el-button>-->
<!--            <el-button-->
<!--              size="mini"-->
<!--              type="danger"-->
<!--              disabled-->
<!--            >删除</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table>-->
<!--    </template>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      tableData: [{-->
<!--        no: '1',-->
<!--        code: 'c0001',-->
<!--        name: '工程训练',-->
<!--        nums: '66',-->
<!--        time: '2020-2021-1',-->
<!--        operation: '上海市普陀区金沙江路 1518 弄'-->
<!--      }, {-->
<!--        no: '2',-->
<!--        code: 'c0002',-->
<!--        name: '工程实践',-->
<!--        nums: '66',-->
<!--        time: '2020-2021-2',-->
<!--        operation: '上海市普陀区金沙江路 1518 弄'-->
<!--      }]-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
