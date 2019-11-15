<template>
  <el-dialog :visible="visible" title="添加考试" width="40%" :before-close="handleClose">
    <el-form label-width="80px" :model="addForm" status-icon :rules="rules" ref="addForm">
      <el-form-item label="考试名称" prop="name">
        <el-input v-model="addForm.name" placeholder="请输入考试名"></el-input>
      </el-form-item>
      <el-form-item label="考试时间" prop="time">
        <el-date-picker
          v-model="addForm.time"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="addForm.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item label="考试年级" prop="grade">
        <el-select v-model="addForm.grade" @change="getDataList">
          <el-option v-for="item in addForm.gradeList" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级" prop="class">
        <el-tooltip placement="right" content="若为年级统考则可跳过此选项">
          <el-select v-model="addForm.class" clearable>
            <el-option v-for="item in addForm.classList" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="科目" prop="course">
          <el-select v-model="addForm.course" clearable>
            <el-option v-for="item in addForm.courseList" :key="item.id" :value="item.id" :label="item.course"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item prop="finish">
        <el-button @click="submitForm" type="success">确定添加</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import qs from 'qs'
export default {
  name: 'AddExam',
  props: ['visible'],
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      addForm: {
        name: '',
        time: '',
        remark: '',
        grade: '',
        class: '',
        course: '',
        type: '',
        gradeList: [],
        classList: [],
        courseList: []
      },
      rules: {
        name: [{required: true, message: '请输入考试名称', trigger: 'blur'}],
        time: [{required: true, message: '请输入考试时间', trigger: 'blur'}],
        grade: [{required: true, message: '请选择考试年级', trigger: 'blur'}],
        course: [{required: true, message: '请选择考试科目', trigger: 'blur'}]
      }
    }
  },
  created () {
    /* 请求所有年级 */
    this.axios.get('/system/list?method=listAllGrade')
      .then(res => {
        if (res.data.code === '200') {
          this.addForm.gradeList = res.data.data
        }
      })
  },
  methods: {
    getDataList (val) {
      this.axios.get('/system/list?method=listClazzByGradeId&gradeId=' + val)
        .then(res => {
          if (res.data.code === '200') {
            this.addForm.classList = res.data.data
          }
        })
      this.axios.get('/system/list?gradeId=' + val + '&method=listCourseByGradeId')
        .then(res => {
          if (res.data.code === '200') {
            this.addForm.courseList = res.data.data
          }
        })
    },
    handleClose () {
      this.$refs.addForm.resetFields()
      this.$emit('update:visible', false)
    },
    submitForm () {
      console.log(this.addForm.class)
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          if (this.addForm.class === '') {
            this.addForm.type = 0
            this.addForm.class = 0
          } else {
            this.addForm.type = 1
          }
          let body = {
            'name': this.addForm.name,
            'time': this.addForm.time,
            'remark': this.addForm.remark,
            'type': this.addForm.type,
            'gradeId': this.addForm.grade,
            'clazzId': this.addForm.class,
            'courseId': this.addForm.course
          }
          this.axios.post('/system/addExam?', qs.stringify(body))
            .then(res => {
              if (res.data.code === '200') {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                })
                this.$router.go(0)
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
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
