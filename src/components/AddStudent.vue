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
      <el-form-item label="班级" prop="classForm">
        <el-cascader clearable :options="addForm.gradeList" v-model="addForm.classForm" @change="handleChange"></el-cascader>
      </el-form-item>
      <el-form-item prop="finish">
        <el-button @click="submitForm" type="success">确定添加</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
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
        classForm: [
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
        clazz: '',
        classForm: '',
        gradeList: [{
          label: '2013级',
          value: '2013级',
          children: [{
            label: '1班',
            value: '1班'
          }, {
            label: '2班',
            value: '2班'
          }, {
            label: '3班',
            value: '3班'
          }, {
            label: '4班',
            value: '4班'
          }]
        }, {
          label: '2014级',
          value: '2014级',
          children: [{
            label: '1班',
            value: '1班'
          }, {
            label: '2班',
            value: '2班'
          }, {
            label: '3班',
            value: '3班'
          }, {
            label: '4班',
            value: '4班'
          }]
        }, {
          label: '2015级',
          value: '2015级',
          children: [{
            label: '1班',
            value: '1班'
          }, {
            label: '2班',
            value: '2班'
          }, {
            label: '3班',
            value: '3班'
          }, {
            label: '4班',
            value: '4班'
          }, {
            label: '5班',
            value: '5班'
          }]
        }]
      }
    }
  },
  methods: {
    handleChange (label) {
      this.addForm.grade = label[0]
      this.addForm.clazz = label[1]
    },
    submitForm () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          let body = {
            method: 'addStudent',
            student: {
              number: this.addForm.number,
              name: this.addForm.name,
              sex: this.addForm.sex,
              phone: this.addForm.phone,
              qq: this.addForm.qq,
              clazz: this.addForm.clazz,
              grade: this.addForm.grade
            }
          }
          console.log(JSON.stringify(body))
          this.axios.post('system/add', JSON.stringify(body))
            .then(res => {
              if (res.data.code === '200') {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
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
