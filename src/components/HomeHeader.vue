<template>
  <el-row>
    <el-col :span="12">
      <h1>学生成绩管理系统</h1>
    </el-col>
    <el-col :span="12">
      <span>欢迎，{{username}}{{role}}</span>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      username: '',
      role: ''
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      let info = JSON.parse(localStorage.getItem('UserInfo'))
      this.username = info.account
      console.log(info.type)
      if (info.type === '1') {
        this.role = '同学'
      } else if (info.type === '2') {
        this.role = '老师'
      } else {
        this.role = '管理员'
      }
    }
  }
}
</script>

<style scoped>

</style>
