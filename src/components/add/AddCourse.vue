<template>
  <el-dialog :visible="visible" title="添加课程" width="30%" :before-close="handleClose">
    <el-form label-width="60px" :model="addForm" status-icon :rules="rules" ref="addForm">
      <el-form-item v-if="addInstantly" label="课程" prop="course">
        <el-input v-model="addForm.course" placeholder="请输入课程"></el-input>
      </el-form-item>
      <el-form-item v-else label="课程" prop="coursePlus">
        <el-select v-model="addForm.coursePlus">
          <el-option v-for="item in addForm.courseList" :value="item.id" :key="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="finish">
        <el-button @click="submitForm" type="success">确定添加</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddCourse',
  props: ['visible', 'grade'],
  data () {
    var checkCourse = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('课程不能为空'))
      } else {
        for (let i = 0; i < this.addForm.courseList.length; i++) {
          if (value === this.addForm.courseList[i].name) {
            callback(new Error('此课程已存在'))
          }
        }callback()
      }
    }
    var checkCourseSelect = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('课程不能为空'))
      } else {
        for (let i = 0; i < this.addForm.courseSelect.length; i++) {
          if (value === this.addForm.courseSelect[i].courseId) {
            callback(new Error('此课程已存在'))
          }
        }callback()
      }
    }

    return {
      gradeData: this.grade,
      addInstantly: false,
      addForm: {
        course: '',
        coursePlus: '',
        courseList: [],
        courseSelect: []
      },
      rules: {
        coursePlus: [{validator: checkCourseSelect, trigger: 'blur'}],
        course: [{validator: checkCourse, trigger: 'blur'}]
      }
    }
  },
  watch: {
    'visible': function (val) {
      if (val) {
        this.axios.get('/system/list?method=listAllCourse')
          .then(res => {
            this.addForm.courseList = res.data.data
          })
        console.log(this.addForm.courseList)
        if (this.isUndefined(this.grade)) {
          this.addInstantly = true
        } else {
          this.axios.get('/system/list?method=listCourseByGradeId&gradeId=' + this.grade.gradeId)
            .then(res => {
              this.addForm.courseSelect = res.data.data
            })
          console.log(this.addForm.courseSelect)
        }
      }
    }
  },
  methods: {
    isUndefined (val) {
      return val === undefined
    },
    handleClose () {
      this.$refs.addForm.resetFields()
      this.$emit('update:visible', false)
    },
    submitForm () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          var addCourse = ''
          if (this.isUndefined(this.grade)) {
            addCourse = '/system/addCourse/?name=' + this.addForm.course
          } else {
            addCourse = '/system/addCourseByGrade?gradeId=' + this.grade.gradeId + '&courseId=' + this.addForm.coursePlus
          }
          this.axios.post(addCourse)
            .then(res => {
              if (res.data.code === '200') {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                this.$router.go(0)
              } else {
                this.$message({
                  message: '添加失败',
                  type: 'error'
                })
              }
            }).catch(error => {
              this.$message.error('网络错误')
              console.log(error)
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
