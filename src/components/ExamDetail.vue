<template>
  <el-row>
    <score-analyse :visible.sync="visible" :scoreData="scoreData"></score-analyse>
    <el-row style="margin-right: 280px;">
      <h1>{{this.examTitle}}</h1>
      <h4>备注: {{this.examRemark}}</h4>
      <el-select v-model="classId" @change="getExamData" placeholder="请先选择班级">
        <el-option v-for="item in clazzList" :key="item.id" :value="item.id" :label="item.name"></el-option>
      </el-select>
      <el-button type="success" :disabled="disabled" @click="scoreAnalyse">成绩分析</el-button>
      <el-input :disabled="disabled" style="width: 240px;" placeholder="请输入任意内容查询" v-model="keyWord"></el-input>
    </el-row>
    <div style="float: right"><a>总计{{examData.length}}条数据</a></div>
    <el-table
      :default-sort = "{prop: 'score', order: 'descending'}"
      ref="table"
      :data="examData"
      stripe
      max-height="500"
      style="width: 100%;">
      <el-table-column
        prop="id"
        width="60"
      ></el-table-column>
      <el-table-column
        prop="number"
        label="学号"
        width="360"
      ></el-table-column>
      <el-table-column
        prop="student"
        label="姓名"
        width="360"
      ></el-table-column>
      <el-table-column
        sortable
        prop="score"
        label="得分"
      ></el-table-column>
    </el-table>
  </el-row>
</template>

<script>
import NewScore from '@/components/NewScore'
import ScoreAnalyse from '@/components/ScoreAnalyse'
export default {
  name: 'ExamDetail',
  components: {ScoreAnalyse, NewScore},
  data () {
    return {
      method: 'examDetail',
      scoreList: [],
      visible: false,
      examTitle: '',
      examRemark: '',
      clazzList: [],
      classId: '',
      examId: '',
      disabled: true,
      keyWord: '',
      scoreData: []
    }
  },
  computed: {
    examData () {
      const keyword = this.keyWord
      if (keyword) {
        return this.scoreList.filter(data => {
          return Object.keys(data).some(key => {
            return String((data[key] += '').toLowerCase().indexOf(keyword)) > -1
          })
        })
      }
      return this.scoreList
    }
  },
  watch: {
    // 观察examData数据的变化，如果获取到数据则成绩分析按钮可点击，反之不可以
    'examData': function (val) {
      if (val.length > 0) {
        this.disabled = false
      }
    }
  },
  created () {
    var examInfo = JSON.parse(localStorage.getItem('ExamInfo'))
    this.examId = examInfo.id
    this.examTitle = examInfo.grade + examInfo.name
    this.examRemark = examInfo.remark
    this.$emit('getTabName', {title: '考试详情', name: this.method})
    this.axios.get('/teacher/listClazzByExam?examId=' + this.examId)
      .then(res => {
        this.clazzList = res.data.data.clazz
      })
  },
  methods: {
    // 给子组件传值，并唤起对话框
    scoreAnalyse () {
      this.scoreData = this.scoreList
      this.visible = true
    },
    getExamData () {
      this.axios.get('teacher/getScore?examId=' + this.examId + '&clazzId=' + this.classId)
        .then(res => {
          if (res.data.code === '200') {
            this.scoreList = res.data.data
            var scores = this.scoreList
            for (let i = 0; i < scores.length; i++) {
              let temp = scores[i]
              for (var j = i - 1; j >= 0 && scores[j].score > temp.score; j--) {
                scores[j + 1] = scores[j]
              }
              scores[j + 1] = temp
            }
            this.scoreList = scores
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
