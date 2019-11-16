<template>
  <el-row style="position: fixed; width: 200px; margin-top: 90px">
    <el-menu class="el-menu-vertical-demo">
      <el-menu-item @click="queryInfo('ListClassByStudent')">
        <template slot="title">
          <i class="el-icon-baseball"></i>
          <span>班级信息</span>
        </template>
      </el-menu-item>
      <el-menu-item @click="queryInfo('ListExamByStudent')">
        <template slot="title">
          <i class="el-icon-alarm-clock"></i>
          <span>考试信息</span>
        </template>
      </el-menu-item>
      <el-menu-item @click="queryInfo('ShowMyInfo')">
        <template slot="title">
          <i class="el-icon-paperclip"></i>
          <span>个人信息</span>
        </template>
      </el-menu-item>
    </el-menu>
  </el-row>
</template>

<script>
export default {
  name: 'StudentNav',
  data () {
    return {
      visible: false
    }
  },
  methods: {
    queryInfo (queryMethod) {
      this.$router.push({name: queryMethod}).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>
