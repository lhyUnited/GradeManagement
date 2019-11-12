<template>
  <el-dialog :visible="visible" title="添加年级" width="30%" :before-close="handleClose">
    <el-form label-width="60px" :model="addForm" status-icon :rules="rules" ref="addForm">
      <el-form-item label="年级" prop="gradeName">
        <el-select v-model="addForm.gradeName">
          <el-option v-for="item in addForm.gradeList" :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级" prop="course">
        <el-input v-model="addForm.course" placeholder="请输入课程"></el-input>
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
    return {
      addForm: {
        gradeName: '',
        course: '',
        gradeList: [{
          label: '2016级',
          value: '2016'
        }, {
          label: '2017级',
          value: '2017'
        }, {
          label: '2018级',
          value: '2018'
        }]
      },
      rules: {
        gradeName: [
          {required: true, message: '请输入年级', trigger: 'blur'}
        ],
        course: [
          {required: true, message: '请输入课程', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleClose () {
      this.$refs.addForm.resetFields()
      this.$emit('update:visible', false)
    },
    submitForm () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          /* todo */
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
