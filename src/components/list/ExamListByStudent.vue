<template>
  <el-row>
    <el-input placeholder="请输入任意关键词查询" style="width: 200px" v-model="keyWord"></el-input>
    <el-button @click="clearField">清空</el-button>
    <div style="float: right"><a>总计{{examData.length}}条数据</a></div>
    <el-table
      ref="table"
      :data="examData"
      stripe
      max-height="500"
      style="width: 100%;">
      <el-table-column
        prop="id"
        label="#"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="grade"
        label="年级"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="考试名称"
      ></el-table-column>
      <el-table-column
        prop="course"
        label="考核科目"
      ></el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
      ></el-table-column>
      <el-table-column
        prop="time"
        label="考试时间"
      ></el-table-column>
      <el-table-column
        prop="clazz"
        label="考试班级"
      ></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleClick(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
export default {
  name: 'ExamListByStudent',
  data () {
    return {
      examList: []
    }
  },
  created () {
    var studentInfo = JSON.parse(localStorage.getItem('StudentInfo'))
    this.axios.get('/student/listExamByStudent?studentId=' + studentInfo.id)
      .then(res => {
        if (res.data.code === '200') {
          this.examList = res.data.data
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
    examData () {
      const keyword = this.keyWord
      if (keyword) {
        return this.examList.filter(data => {
          return Object.keys(data).some(key => {
            return String((data[key] += '').toLowerCase().indexOf(keyword)) > -1
          })
        })
      }
      return this.examList
    }
  },
  methods: {
    handleClick (index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style scoped>

</style>
