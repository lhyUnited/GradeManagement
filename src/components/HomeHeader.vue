<template>
  <el-row>
    <el-col :span="12">
      <h1>学生成绩管理系统</h1>
    </el-col>
    <el-col :span="12">
      <el-dropdown>
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logOut">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div>
        <span>欢迎，{{username}}</span>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      username: ''
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      let info = JSON.parse(localStorage.getItem('UserInfo'))
      this.username = info.name
    },
    logOut () {
      localStorage.clear()
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
