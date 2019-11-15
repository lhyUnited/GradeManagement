<template>
  <el-dialog :visible="visible" title="录入成绩" :before-close="handleClose">
    <el-select @change="getStudentData" v-model="clazz" placeholder="班级" style="width: 100px; float: left">
      <el-option v-for="item in classByExamList" :value="item.id" :key="item.id" :label="item.name"></el-option>
    </el-select>
    <el-form :rules="ruleForm.rules" :model="ruleForm"  ref="rulForm">
      <el-button type="success" style="float: right" @click="submitForm">提交</el-button>
      <el-table
        :data="ruleForm.scoreData"
        ref="table"
        stripe
        max-height="500"
        style="width: 100%;">
        <el-table-column
          prop="id"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="160"
        ></el-table-column>
        <el-table-column
          prop="number"
          label="学号"
          width="200"
        ></el-table-column>
        <el-table-column
          label="得分">
          <template slot-scope="scope">
            <el-form-item :prop="'scoreData.' + scope.$index + '.score'" :rules="ruleForm.rules.score">
              <el-input style="width: 60px;" v-model.number="scope.row.score" maxlength="3"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddScore',
  props: ['visible', 'examId'],
  data () {
    var validateScore = (rule, value, callback) => {
      var temp = Number(value)
      if (!temp) {
        callback(new Error('请输入数字值'))
      }
      if (value === '') {
        callback(new Error('请输入成绩'))
      } else if (temp < 0 || temp > 150) {
        callback(new Error('确保范围在0-150'))
      }callback()
    }
    return {
      classByExamList: [],
      clazz: '',
      ruleForm: {
        scoreData: [],
        rules: {
          score: [{validator: validateScore, trigger: 'blur'}]
        }
      }
    }
  },
  watch: {
    'visible': function (val) {
      if (val) {
        this.axios.get('/teacher/listClazzByExam?examId=' + this.examId)
          .then(res => {
            this.classByExamList = res.data.data.clazz
          })
      }
    }
  },
  methods: {
    checkNumber (value) {
      this.ruleForm.class = value.replace(/[^\d]/g, '')
    },
    getStudentData (val) {
      this.axios.get('/teacher/listStudentByClazz?clazzId=' + val + '&examId=' + this.examId)
        .then(res => {
          this.ruleForm.scoreData = res.data.data
        })
    },
    handleClose (done) {
      this.$confirm('正在操作中，请不要关闭窗口', '警告', {
        confirmButtonText: '我就要关闭窗口',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('update:visible', false)
      }).catch(() => {
        done()
      })
    },
    submitForm () {
      var body = JSON.stringify(this.ruleForm.scoreData)
      console.log(body)
      this.$refs.rulForm.validate((valid) => {
        if (valid) {
          this.$confirm('确定提交吗？', '提交', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.axios.post('/teacher/addScore', body)
              .then(res => {
                if (res.data.code === '200') {
                  this.$notify({
                    type: 'success',
                    message: '提交成功!'
                  })
                } else {
                  this.$message({
                    message: res.data.msg,
                    type: 'error'
                  })
                }
              }).catch(error => {
                console.log(error)
                this.$message({
                  message: '网络错误',
                  type: 'error'
                })
              })
          }).catch(() => {
            this.$notify({
              type: 'info',
              message: '提交取消'
            })
          })
        } else {
          this.$message({
            message: '成绩输入含非法字符，请检查后重试',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
