<template>
  <div class="back-img">
    <el-container style="height: 100%">
      <el-main style="margin-top: 200px;">
        <el-row type="flex" justify="center">
          <el-col :span="6" style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
            <el-row><h2 style="font-weight: normal; color: whitesmoke">欢迎登录</h2></el-row>
            <el-form ref="loginForm" :model="loginForm" status-icon label-position>
              <el-form-item>
                <el-input style="width: 90%;" placeholder="请输入用户名" v-model="loginForm.username"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input style="width: 90%;" placeholder="密码" show-password v-model="loginForm.password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button plain type="primary" @click="submitForm">登录</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div style="margin-top:60px">
          <el-row>
            <ul id="profilepic" style="list-style-type:none; display: flex;
              left: 8rem;
              right: 8rem;
              flex-flow: row nowrap;
              justify-content: center;
              padding-inline-start: 0;">
            <li style="position: relative;">
              <img class="profile_style" src="../assets/lee.jpg"
                   @click="open_lhyUnited">
              <span class="title">lhyUnited</span></li>
            <li style="position: relative;">
              <img class="profile_style" src="../assets/kang.jpg"
                   @click="open_kang">
              <span class="title">YYK</span></li>
            </ul>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
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
    open_kang () {
      window.open('https://baidu.com')
    },
    open_lhyUnited () {
      window.open('https://www.tomluvjerry.cn')
    },
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
            this.$router.push('/home/intro')
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
  .back-img{
    background-image: url("../assets/no4.jpg");
    background-position: 0;
    background-size: cover;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  .el-container{
    margin: 0;
    padding: 0;
    height: 100%
  }
  .profile_style {
    width: 6.5rem;
    height: 6.5rem;
    border-radius: 100%;
    margin-right: 19.25rem;
    margin-left: 19.25rem;
    cursor: pointer;
    transition: all 0.8s; /* 定义动画持续时长 */
  }
  .profile_style:hover{
    transform:scale(1.2); /* 头像放大 */
    opacity: 0.5;
  }
  .profile_style:hover + .title{
    transition: all 0.8s;
    opacity: 1;
  }
  .title{
    position: absolute;
    top: 0rem;
    left: 0;
    right: 0;
    font-weight: 700;
    font-size: 1rem;
    color: gold;
    cursor: default;
    opacity: 0;
  }
</style>
