<template>
  <el-dialog :visible="visible" title="添加学生" width="40%" :before-close="handleClose">
    <el-form label-width="80px" :model="addForm" status-icon :rules="rules" ref="addForm">
      <el-form-item label="学号" prop="number">
        <el-input v-model="addForm.number" placeholder="请输入学号"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="addForm.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio v-model="addForm.sex" label="男">男</el-radio>
        <el-radio v-model="addForm.sex" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="addForm.phone" placeholder="请输入手机号" maxlength="11" @input="checkPhone"></el-input>
      </el-form-item>
      <el-form-item label="qq" prop="qq">
        <el-input v-model="addForm.qq" placeholder="请输入qq号" @input="checkQq"></el-input>
      </el-form-item>
      <el-form-item label="年级" prop="grade">
        <el-select v-model="addForm.grade" @change="getClassList">
          <el-option v-for="item in addForm.gradeList" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级" prop="class">
        <el-select v-model="addForm.class">
          <el-option v-for="item in addForm.classList" :key="item.id" :value="item.id" :label="item.name"></el-option>
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
  name: 'AddStudent',
  props: ['visible'],
  data () {
    return {
      rules: {
        number: [
          {required: true, message: '请输入学号', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ],
        grade: [
          {required: true, message: '请选择年级', trigger: 'change'}
        ],
        class: [
          {required: true, message: '请选择班级', trigger: 'change'}
        ]
      },
      addForm: {
        number: '',
        name: '',
        sex: '',
        phone: '',
        qq: '',
        grade: '',
        gradeList: [],
        class: '',
        classList: [],
        classForm: ''
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
    /* 根据年级id请求班级 */
    getClassList (val) {
      this.axios.get('/system/list?method=listClazzByGradeId&gradeId=' + val)
        .then(res => {
          if (res.data.code === '200') {
            this.addForm.classList = res.data.data
          }
        })
    },
    submitForm () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          let body = {
            'number': this.addForm.number,
            'name': this.addForm.name,
            'sex': this.addForm.sex,
            'phone': this.addForm.phone,
            'qq': this.addForm.qq,
            'gradeId': this.addForm.grade,
            'clazzId': this.addForm.class
          }
          this.axios.post('system/addStudent', qs.stringify(body))
            .then(res => {
              if (res.data.code === '200') {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                /* 刷新页面 */
                this.$router.go(0)
              } else {
                this.$message({
                  message: '添加失败',
                  type: 'error'
                })
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleClose (done) {
      this.$refs.addForm.resetFields()
      this.$emit('update:visible', false)
      done()
    },
    checkPhone (value) {
      this.addForm.phone = value.replace(/[^\d]/g, '')
    },
    checkQq (value) {
      this.addForm.qq = value.replace(/[^\d]/g, '')
    }
  }
}
</script>

<style scoped>

</style>
