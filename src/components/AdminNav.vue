<template>
  <el-row style="position: fixed; width: 200px; margin-top: 90px">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
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
            <i class="el-icon-menu"></i>
            <span>教师</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1" @click="queryInfo('ListAllTeacher')">查询所有教师</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-submenu index="2-2">
              <template slot="title">添加/删除</template>
              <el-menu-item index="2-2-1">添加教师</el-menu-item>
              <el-menu-item index="2-2-1">删除教师</el-menu-item>
            </el-submenu>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>学生</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1" @click="queryInfo('ListAllStudent')">查询所有学生</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-submenu index="3-2">
              <template slot="title">添加/删除</template>
              <el-menu-item index="3-2-1">添加学生</el-menu-item>
              <el-menu-item index="3-2-1">删除学生</el-menu-item>
            </el-submenu>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">成绩</span>
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
