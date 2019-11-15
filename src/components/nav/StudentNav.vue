<template>
  <el-row style="position: fixed; width: 200px; margin-top: 90px">
    <person-info :visible.sync="visible"></person-info>
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
    </el-menu>
  </el-row>
</template>

<script>
import PersonInfo from '@/components/list/PersonInfo'
export default {
  name: 'StudentNav',
  components: {PersonInfo},
  data () {
    return {
      visible: false
    }
  },
  created () {
    var userInfo = JSON.parse(localStorage.getItem('UserInfo'))
    this.axios.get('/student/listStudentByNumber?number=' + userInfo.account)
      .then(res => {
        if (res.data.code === '200') {
          localStorage.setItem('StudentInfo', JSON.stringify(res.data.data))
        }
      }).catch(error => {
        console.log(error)
        this.$message({
          message: '网络错误',
          type: 'error'
        })
      })
  },
  methods: {
    showInfoDialog () {
      this.visible = true
    },
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
