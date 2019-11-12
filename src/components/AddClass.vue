<template>
  <el-dialog :visible="visible" title="添加班级" width="30%" :before-close="handleClose">
    <el-form label-width="80px" :model="addForm" status-icon :rules="rules" ref="addForm">
      <el-form-item label="年级" prop="grade">
        <el-select v-model="addForm.grade">
          <el-option v-for="item in addForm.gradeList" :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级" prop="className">
        <el-input v-model="addForm.className" placeholder="请输入班级"></el-input>
      </el-form-item>
      <el-form-item prop="finish">
        <el-button @click="submitForm" type="success">确定添加</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddClass',
  props: ['visible'],
  data () {
    return {
      addForm: {
        className: '',
        grade: '',
        gradeList: [{
          label: '2013级',
          value: '2013'
        }, {
          label: '2014级',
          value: '2014'
        }, {
          label: '2015级',
          value: '2015'
        }]
      },
      rules: {
        grade: [
          {required: true, message: '请选择年级', trigger: 'blur'}
        ],
        className: [
          {required: true, message: '请输入班级', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleClose (done) {
      this.$refs.addForm.resetFields()
      this.$emit('update:visible', false)
      done()
    },
    submitForm () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$message({
            message: '添加成功',
            type: 'success'
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
