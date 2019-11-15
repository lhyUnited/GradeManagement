<template>
  <el-row style="position: fixed; width: 200px; margin-top: 90px">
      <el-menu
        class="el-menu-vertical-demo">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-school"></i>
            <span>基本信息</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" @click="queryInfo('ListAllClass')">班级列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="1-2" @click="queryInfo('ListAllGrade')">年级列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="1-3" @click="queryInfo('ListAllCourse')">课程列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-orange"></i>
            <span>教师</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1" @click="queryInfo('ListAllTeacher')">教师列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>学生</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1" @click="queryInfo('ListAllStudent')">学生列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="4" @click="queryInfo('ListAllExam')">
          <i class="el-icon-watch"></i>
          <span slot="title">考试</span>
        </el-menu-item>
      </el-menu>
  </el-row>
</template>

<script>
export default {
  name: 'AdminNav',
  data () {
    return {
      queryMethod: ''
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
