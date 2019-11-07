<template>
  <el-row type="flex" justify="center">
    <el-card  class="classCard">
      <div slot="header">
        <span>我的班级</span>
      </div>
      <el-row :gutter="20">
        <el-col :lg="8" v-for="card in 15" :key="card" style="margin-bottom: 40px;">
          <div class="classCon">
            <el-card class="classDetail">
              <div slot="header">
                <span>2017级软件工程{{card}}班</span>
              </div>
              <div>
                <h1>{{card}}</h1>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </el-row>
</template>

<script>
export default {
  name: 'ClassInfo'
}
</script>

<style>
  .classCard{
    width: 980px;
  }
  .classCon{
    font-size: 18px;
  }
  .classDetail{
    width: 100%;
  }
  li{
    list-style: none;
  }
</style>
