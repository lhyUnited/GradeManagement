<template>
  <el-dialog :visible="visible" :before-close="handleClose" title="新成绩" width="25%">
    <el-form ref="scoreForm" :model="scoreForm" :rules="rules">
      <el-form-item prop="newScore">
        <el-input v-model="scoreForm.newScore" style="width: 150px;" @input="checkNumber" placeholder="请输入新成绩"></el-input>
      </el-form-item>
      <el-form-item prop="finish">
        <el-button type="success" @click="submitForm">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'NewScore',
  props: ['visible'],
  data () {
    return {
      scoreForm: {
        newScore: ''
      },
      rules: {
        newScore: [{required: true, message: '请输入成绩，0分请输入数字0', trigger: 'blur'}]
      }
    }
  },
  methods: {
    checkNumber (value) {
      this.scoreForm.newScore = value.replace(/[^\d]/g, '')
    },
    handleClose (done) {
      this.$refs.scoreForm.resetFields()
      this.$emit('update:visible', false)
      done()
    },
    submitForm () {
      this.$refs.scoreForm.validate((valid) => {
        if (valid) {
          this.$emit('func', this.scoreForm.newScore)
          this.$emit('update:visible', false)
          this.$refs.scoreForm.resetFields()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
