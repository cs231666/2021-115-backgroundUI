<template>
  <div>
    <el-row :gutter="20" style="margin-top:10px;">
      <!--      <el-col :span="8">-->
      <!--        <div class="grid-content bg-purple">-->
      <!--          <el-card class="box-card">-->
      <!--            <div slot="header" class="clearfix">-->
      <!--              <span>个人信息</span>-->
      <!--            </div>-->
      <!--            <div class="name-role">-->
      <!--              <span class="sender">Admin - {{ dataForm.nickName }}</span>-->
      <!--            </div>-->
      <!--            <div class="registe-info">-->
      <!--              &lt;!&ndash;          <span class="registe-info">&ndash;&gt;-->
      <!--              &lt;!&ndash;            注册时间：&ndash;&gt;-->
      <!--              &lt;!&ndash;            <li class="fa fa-clock-o"></li>&ndash;&gt;-->
      <!--              &lt;!&ndash;             2020/4/10 9:40:33&ndash;&gt;-->
      <!--              &lt;!&ndash;          </span>&ndash;&gt;-->
      <!--            </div>-->
      <!--            <el-divider />-->
      <!--            <div class="personal-relation">-->
      <!--              <div class="relation-item">邮箱:  <div style="float: right; padding-right:20px;">{{ dataForm.email }}</div></div>-->
      <!--            </div>-->
      <!--            <div class="personal-relation">-->
      <!--              <div class="relation-item">昵称:  <div style="float: right; padding-right:20px;">{{ dataForm.nickName }}</div></div>-->
      <!--            </div>-->
      <!--            <div class="personal-relation">-->
      <!--              <div class="relation-item">个人简介:  <div style="float: right; padding-right:20px;">{{ dataForm.info }}</div></div>-->
      <!--            </div>-->
      <!--            <div class="personal-relation">-->
      <!--              <div class="relation-item">所在地区:  <div style="float: right; padding-right:20px;">{{ dataForm.religion }}</div></div>-->
      <!--            </div><div class="personal-relation">-->
      <!--              <div class="relation-item">住址:  <div style="float: right; padding-right:20px;">{{ dataForm.address }}</div></div>-->
      <!--            </div>-->

      <!--            <div class="personal-relation">-->
      <!--              <div class="relation-item">联系方式:  <div style="float: right; padding-right:20px;">{{ dataForm.phone }}</div></div>-->
      <!--            </div>-->
      <!--            &lt;!&ndash;            <div class="personal-relation">&ndash;&gt;-->
      <!--            &lt;!&ndash;              <div class="relation-item">首页链接:  <div style="float: right; padding-right:20px;">{{dataForm.homeUrl}}</div></div>&ndash;&gt;-->
      <!--            &lt;!&ndash;            </div>&ndash;&gt;-->
      <!--          </el-card>-->
      <!--        </div>-->
      <!--      </el-col>-->
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>个人信息</span>
            </div>
            <div>
              <el-form v-model="dataFrom" label-width="80px" size="small" label-position="right">
                <el-form-item label="用户昵称" prop="nickName">
                  <el-input v-model="dataForm.username" auto-complete="off" />
                </el-form-item>
                <el-form-item label="邮箱" prop="nickName">
                  <el-input v-model="dataForm.email" auto-complete="off" />
                </el-form-item>
                <el-form-item label="手机号" prop="nickName">
                  <el-input v-model="dataForm.phone" auto-complete="off" />
                </el-form-item>
                <el-form-item label="所在地区" prop="nickName">
                  <el-input v-model="dataForm.religion" auto-complete="off" />
                </el-form-item>
                <el-form-item label="住址" prop="nickName">
                  <el-input v-model="dataForm.address" auto-complete="off" />
                </el-form-item>
                <el-form-item label="个人简介" prop="phone">
                  <!--                  <el-input v-model="dataForm.info" auto-complete="off" />-->
                  <el-input v-model="dataForm.info" type="textarea" :rows="2" placeholder="请输入内容" />
                </el-form-item>
                <!--                <el-form-item label="首页链接" prop="homeUrl">-->
                <!--                  <el-input v-model="dataForm.homeUrl" maxlength="18" />-->
                <!--                </el-form-item>-->
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button size="mini" type="primary">提交</el-button>
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
export default {
  data() {
    return {
      dataForm: {
        username: localStorage.getItem('username'),
        nickName: '超级管理员',
        phone: '15750735837',
        homeUrl: 'http://www.baidu.com',
        email: '1071495037@qq.com',
        info: '无',
        religion: '福建省莆田市',
        address: '福建省闽侯县福州大学36#612'
      }
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
  width: 100%;
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
  background: #d3dce6;
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
————————————————
版权声明：本文为CSDN博主「小国吃不胖」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_43251032/article/details/105429454
