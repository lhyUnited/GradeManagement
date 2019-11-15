<template>
  <el-row>
    <add-score :visible.sync="visible" :examId="examId"></add-score>
    <el-button type="info" style="float: left"  @click="showAddDialog" :disabled="disabled">录入成绩</el-button>
    <el-button type="success" style="float: left"  @click="checkScore" :disabled="disabled">成绩统计</el-button>
    <el-input placeholder="请输入任意关键词查询" style="width: 200px" v-model="keyWord"></el-input>
    <el-button @click="clearField">清空</el-button>
    <div style="float: right"><a>总计{{examData.length}}条数据</a></div>
    <el-table
      @select="changeState"
      ref="table"
      :data="examData"
      stripe
      max-height="500"
      style="width: 100%;">
      <el-table-column
        type="selection"
        width="60"></el-table-column>
      <el-table-column
        prop="id"
        label="测试ID"
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
    </el-table>
  </el-row>
</template>

<script>
import AddScore from '@/components/add/AddScore'
export default {
  name: 'ExamListByTeacher',
  components: {AddScore},
  data () {
    return {
      visible: false,
      teacherNumber: '',
      examList: [],
      keyWord: '',
      flag: false,
      disabled: true,
      method: 'listExamByTeacher',
      examId: ''
    }
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
  created () {
    this.$emit('getTabName', {title: '考试列表', name: this.method})
    let info = JSON.parse(localStorage.getItem('UserInfo'))
    this.axios.get('/teacher/listTeacherByNumber?number=' + info.account)
      .then(res => {
        if (res.data.code === '200') {
          this.flag = true
          this.teacherNumber = res.data.data.id
        }
      })
  },
  /* 观察flag变量，确保本次请求在上次请求之后发送 */
  watch: {
    'flag': function (val) {
      if (val) {
        this.axios.get('/teacher/listExam?teacherId=' + this.teacherNumber)
          .then(res => {
            if (res.data.code === '200') {
              this.examList = res.data.data
            }
          })
      }
    }
  },
  methods: {
    showAddDialog () {
      this.visible = true
      this.examId = this.$refs.table.selection[0].id
    },
    changeState () {
      var _counts = this.$refs.table.selection
      if (_counts.length > 0) {
        this.disabled = _counts.length !== 1
      } else {
        this.disabled = true
      }
    },
    clearField () {
      this.keyWord = ''
    },
    checkScore () {
      for (let i = 0; i < this.examList.length; i++) {
        if (this.examList[i].id === this.$refs.table.selection[0].id) {
          localStorage.setItem('ExamInfo', JSON.stringify(this.examList[i]))
        }
      }
      this.$router.push({name: 'ExamDetail'})
    }
  }
}
</script>

<style scoped>

</style>
