<template>
  <el-row>
    <el-input style="width: 200px;" placeholder="请输入任意关键词进行查询" v-model="keyWord"></el-input>
    <el-button @click="clearField">清空</el-button>
    <div style="float: right"><a>总计{{studentData.length}}条数据</a></div>
    <el-table
      ref="table"
      max-height="500"
      :data="studentData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="学生ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="number"
        label="学号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机"
        width="180">
      </el-table-column>
      <el-table-column
        prop="qq"
        label="qq"
        width="180">
      </el-table-column>
      <el-table-column
        prop="clazzId"
        label="班级"
        width="180">
      </el-table-column>
      <el-table-column
        prop="gradeId"
        label="年级"
        width="180">
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
export default {
  name: 'StudentListByClazz',
  data () {
    return {
      studentList: [],
      studentId: '',
      keyWord: '',
      studentInfo: ''
    }
  },
  created () {
    this.studentInfo = JSON.parse(localStorage.getItem('StudentInfo'))
    this.studentId = this.studentInfo.id
    this.axios.get('/student/listClazzByStudent?studentId=' + this.studentId)
      .then(res => {
        if (res.data.code === '200') {
          this.studentList = res.data.data
        }
      }).catch(error => {
        console.log(error)
        this.$message({
          message: '网络错误',
          type: 'error'
        })
      })
  },
  computed: {
    studentData () {
      const keyword = this.keyWord
      if (keyword) {
        return this.studentList.filter(data => {
          return Object.keys(data).some(key => {
            return String((data[key] += '').toLowerCase().indexOf(keyword)) > -1
          })
        })
      }
      return this.studentList
    }
  },
  methods: {
    clearField () {
      this.keyWord = ''
    }
  }
}
</script>

<style scoped>
</style>
