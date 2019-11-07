<template>
  <el-container>
    <el-main style="margin-top: 200px;">
      <el-row type="flex" justify="center">
        <el-col :span="6" style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
          <el-row><h2 style="font-weight: normal">欢迎登录</h2></el-row>
          <el-form ref="loginForm" :model="loginForm" status-icon label-position>
            <el-form-item label="用户名" label-width="60px">
              <el-input style="width: 95%" placeholder="请输入用户名" v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="60px">
              <el-input style="width: 95%" placeholder="密码" show-password v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button plain type="primary" @click="submitForm()">登录</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import qs from 'qs'
export default {
  name: 'LoginPage',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm () {
      let body = qs.stringify({'account': this.loginForm.username, 'password': this.loginForm.password})
      console.log(body)
      this.axios.post('/login', body)
        .then(res => {
          if (res.data.code === '200') {
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            localStorage.setItem('UserInfo', JSON.stringify(res.data.data))
            this.$router.push({name: 'HomePage'})
          } else if (res.data.code === '404') {
            this.$message({
              message: '登录失败，请检查用户名或邮箱是否正确',
              type: 'error'
            })
          }
        }).catch(error => {
          this.$message.error('网络错误')
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
