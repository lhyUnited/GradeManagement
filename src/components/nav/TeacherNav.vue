<template>
  <el-row style="position: fixed; width: 200px; margin-top: 90px">
    <el-menu class="el-menu-vertical-demo">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-alarm-clock"></i>
          <span>考试信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="queryInfo('ListExamByTeacher')">考试列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-row>
</template>

<script>
export default {
  name: 'TeacherNav',
  data () {
    return {}
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
