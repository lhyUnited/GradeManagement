<template>
  <el-dialog title="成绩分析" :visible="visible" :before-close="handleClose">
    <el-card>
      <template slot="header">
        <i class="em em-books" aria-role="presentation" aria-label="BOOKS"></i>&nbsp;&nbsp;概述
      </template>
      <el-row>
        <p>本次考试共有{{this.scores.length}}人参加，其中</p>
        <p>最高分: {{this.maxScore}}</p>
        <p>最低分: {{this.minScore}}</p><hr>
        <p>班级平均分: {{this.average}}</p>
      </el-row>
    </el-card>
    <div style="margin-top: 30px"></div>
    <el-card>
      <template slot="header">
        <i class="em em-cookie" aria-role="presentation" aria-label="COOKIE"></i>&nbsp;&nbsp;成绩统计
      </template>
      <el-row>
        <el-col :span="8">135(含)~150分</el-col>
        <el-col :span="12"><el-progress :text-inside="true" :stroke-width="26" :percentage=this.excellent status="success"></el-progress></el-col>
      </el-row>
      <div style="margin-top: 20px"></div>
      <el-row>
        <el-col :span="8">120(含)~130分</el-col>
        <el-col :span="12"><el-progress :text-inside="true" :stroke-width="26" :percentage=this.good></el-progress></el-col>
      </el-row>
      <div style="margin-top: 20px"></div>
      <el-row>
        <el-col :span="8">90(含)~120分</el-col>
        <el-col :span="12"><el-progress :text-inside="true" :stroke-width="26" :percentage=this.justSoSo status="warning"></el-progress></el-col>
      </el-row>
      <div style="margin-top: 20px"></div>
      <el-row>
        <el-col :span="8">低于90分</el-col>
        <el-col :span="12"><el-progress :text-inside="true" :stroke-width="26" :percentage=this.dissatisfied status="exception"></el-progress></el-col>
      </el-row>
      <el-row>
        <p v-show="great" style="color: #409eff">考试情况非常优秀，非常棒</p>
        <p v-show="notBad">考试情况一般，再接再厉</p>
        <p v-show="bad" style="color: #f56c6c">不及格人数较多，请留意</p>
      </el-row>
    </el-card>
    <div style="margin-top: 40px"></div>
  </el-dialog>
</template>

<script>
export default {
  name: 'ScoreAnalyse',
  props: ['visible', 'scoreData'],
  data () {
    return {
      scores: [],
      maxScore: '',
      minScore: '',
      sum: '',
      average: '',
      excellent: 0,
      good: 0,
      justSoSo: 0,
      dissatisfied: 0,
      great: false,
      notBad: false,
      bad: false
    }
  },
  watch: {
    // 当对话框被唤起的时候，完成数据分析
    'visible': function (val) {
      if (val) {
        var excellent = 0
        var good = 0
        var justSoSo = 0
        var dissatisfied = 0
        this.scores = this.scoreData
        var end = this.scores.length - 1
        this.maxScore = this.scores[end].score
        this.minScore = this.scores[0].score
        this.sum = parseInt(this.scores[0].score)
        for (let i = 1; i < end + 1; i++) {
          // 计算总分
          this.sum = this.sum + parseInt(this.scores[i].score)
          // 计算优秀
          if (parseInt(this.scores[i].score) >= 135 && parseInt(this.scores[i].score) < 150) {
            excellent++
          } else if (parseInt(this.scores[i].score) >= 120 && parseInt(this.scores[i].score) < 135) {
            good++
          } else if (parseInt(this.scores[i].score) >= 90 && parseInt(this.scores[i].score) < 120) {
            justSoSo++
          } else {
            dissatisfied++
          }
        }
        // 计算各个分数段的百分比
        this.excellent = Number((excellent * 100 / (parseInt(end) + 1)).toFixed(2)) // 转换成number型
        this.good = Number((good * 100 / (parseInt(end) + 1)).toFixed(2))
        this.justSoSo = Number((justSoSo * 100 / (parseInt(end) + 1)).toFixed(2))
        this.dissatisfied = Number((dissatisfied * 100 / (parseInt(end) + 1)).toFixed(2))
        // this.sum = parseInt(this.scores[0].score) + parseInt(this.scores[1].score)
        this.average = (this.sum / (parseInt(end) + 1)).toFixed(2)
        // console.log(this.maxScore, this.minScore, this.TopThree, this.sum)
        // 显示提示信息
        if (this.excellent > 80 && this.dissatisfied < 20) {
          this.great = true
        } else if (this.excellent > 60 && this.dissatisfied < 40) {
          this.notBad = true
        } else {
          this.bad = true
        }
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped>
</style>
