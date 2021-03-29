<template>
  <div class="app-container">
    <el-row :gutter="20">

      <el-col :span="6" :xs="24">
        <class-card :class-num="classNum" />
      </el-col>

      <el-col :span="18" :xs="24">
        <el-tabs v-model="activeTab" type="border-card">
          <el-tab-pane label="学生列表" name="student" />
          <el-tab-pane label="签到列表" name="checkin" />
          <!--<el-tab-pane label="Account" name="account">-->
          <!--<account :user="user" />-->
          <!--</el-tab-pane>-->
          <!--<el-card>-->
          <el-row style="margin-bottom: 15px;float: right">
            <el-col :span="24">
              <el-button v-if="activeTab === 'student'" type="primary" round disabled>添加学生</el-button>
              <el-button v-else-if="activeTab === 'checkin'" type="primary" round :loading="checkinLoading" @click="handleCheckinDefaultTime">创建签到</el-button>
              <router-link to="/class/index">
                <el-button type="success" round>返回班课列表</el-button>
              </router-link>
            </el-col>
          </el-row>
          <el-table
            v-if="activeTab === 'student'"
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading"
            fit
            highlight-current-row
          >
            <el-table-column align="center" label="学生学号">
              <template slot-scope="scope">
                {{ scope.row.usersno }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="学生姓名">
              <template slot-scope="scope">
                {{ scope.row.username }}
              </template>
            </el-table-column>
            <el-table-column label="所属院系" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.userDepartment }}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-popconfirm
                  title="确定删除吗？"
                  @onConfirm="handleDelete(true, scope.row)"
                >
                  <el-button
                    slot="reference"
                    size="mini"
                    type="danger"
                  >删除</el-button>
                </el-popconfirm>
                <!--<el-button-->
                <!--size="mini"-->
                <!--type="danger"-->
                <!--@click="handleDelete(false, scope.row)">删除</el-button>-->
              </template>
            </el-table-column>
          </el-table>
          <el-table
            v-else-if="activeTab === 'checkin'"
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading"
            fit
            highlight-current-row
          >
            <el-table-column align="center" label="学生姓名">
              <template slot-scope="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="是否签到">
              <template slot-scope="scope">
                <i v-if="scope.row.chenkinIs === 1" class="el-icon-check"></i>
                <i v-else class="el-icon-close"></i>
              </template>
            </el-table-column>
          </el-table>
          <!--</el-card>-->
        </el-tabs>
      </el-col>
    </el-row>
    <el-dialog
      title="选择签到时间范围"
      :visible.sync="dialogVisible"
      width="390px"
      :before-close="handleClose"
    >
      <el-time-picker
        v-model="timeValue"
        is-range
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        placeholder="选择时间范围"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCheckin">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'detail'
}
</script>

<style scoped>

</style>
