<template>
  <el-dialog :visible="visible" title="添加班级" width="30%" :before-close="handleClose">
    <el-form label-width="80px" :model="addForm" status-icon :rules="rules" ref="addForm">
      <el-form-item label="年级" prop="grade">
        <el-select v-model="addForm.grade" @change="getClassList">
          <el-option v-for="item in addForm.gradeList" :key="item.id"
                     :label="item.name"
                     :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级" prop="class">
        <el-select v-model="addForm.class">
          <el-option v-for="item in addForm.classList" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="教授课程" prop="course">
        <el-select v-model="addForm.course">
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
  name: 'AddCourseByTeacher',
  props: ['visible', 'teacher'],
  data () {
    return {
      addForm: {
        grade: '',
        gradeList: [],
        class: '',
        course: '',
        courseList: [],
        classList: []
      },
      rules: {
        grade: [
          {required: true, message: '请选择年级', trigger: 'blur'}
        ],
        class: [
          {required: true, message: '请选择班级', trigger: 'blur'}
        ],
        course: [
          {required: true, message: '请选择课程', trigger: 'blur'}
        ]
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
    /* 亲求所有课程 */
    this.axios.get('/system/list?method=listAllCourse')
      .then(res => {
        if (res.data.code === '200') {
          this.addForm.courseList = res.data.data
        }
      })
  },
  methods: {
    getClassList (val) {
      this.axios.get('/system/list?method=listClazzByGradeId&gradeId=' + val)
        .then(res => {
          if (res.data.code === '200') {
            this.addForm.classList = res.data.data
          }
        })
    },
    handleClose (done) {
      this.$refs.addForm.resetFields()
      this.$emit('update:visible', false)
      done()
    },
    submitForm () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.axios.post('/system/addCourseByTeacher', '&clazzId=' + this.addForm.class +
            '&gradeId=' + this.addForm.grade + '&courseId=' + this.addForm.course + '&teacherId=' + this.teacher)
            .then(res => {
              if (res.data.code === '200') {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                this.$router.go(0)
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                })
              }
            })
        } else {
          return false
        }
      })
    },
    checkNumber (value) {
      this.addForm.class = value.replace(/[^\d]/g, '')
    }
  }
}
</script>

<style scoped>

</style>
