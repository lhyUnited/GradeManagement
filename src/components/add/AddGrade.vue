<template>
  <el-dialog :visible="visible" title="添加年级" width="30%" :before-close="handleClose">
    <el-form label-width="60px" :model="addForm" status-icon :rules="rules" ref="addForm">
      <el-form-item label="年级" prop="gradeName">
        <el-input style="width: 100px" v-model="addForm.gradeName" maxlength="4" @input="checkNumber"></el-input><span>&nbsp;级</span>
      </el-form-item>
      <el-form-item prop="finish">
        <el-button @click="submitForm" type="success">确定添加</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddGrade',
  props: ['visible'],
  data () {
    var checkGradeName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入年级'))
      }
      for (let i = 0; i < this.addForm.gradeList.length; i++) {
        if (value + '级' === this.addForm.gradeList[i].name) {
          callback(new Error('输入不合法'))
        }
      }callback()
    }
    return {
      addForm: {
        gradeName: '',
        course: '',
        gradeList: []
      },
      rules: {
        gradeName: [
          {validator: checkGradeName, trigger: 'blur'}
        ]
      }
    }
  },
  watch: {
    'visible': function (val) {
      if (val) {
        this.axios.get('/system/list?method=listAllGrade')
          .then(res => {
            if (res.data.code === '200') {
              this.addForm.gradeList = res.data.data
            }
          })
      }
    }
  },
  methods: {
    checkNumber (value) {
      this.addForm.gradeName = value.replace(/[^\d]/g, '')
    },
    handleClose () {
      this.$refs.addForm.resetFields()
      this.$emit('update:visible', false)
    },
    submitForm () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.axios.post('system/addGrade?name=' + this.addForm.gradeName + '级')
            .then(res => {
              if (res.data.code === '200') {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                this.$router.go(0)
              }
            }).catch(error => {
              console.log(error)
              this.$message({
                message: '添加失败',
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
