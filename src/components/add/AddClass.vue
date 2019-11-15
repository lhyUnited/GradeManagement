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
        <el-input clearable style="width: 100px" v-model="addForm.class" @input="checkNumber"></el-input><span>&nbsp;班</span>
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
    var checkClass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入班级'))
      } else {
        for (let i = 0; i < this.addForm.classList.length; i++) {
          if (value + '班' === this.addForm.classList[i].name) {
            callback(new Error('此班级已存在'))
          }
        }
      }callback()
    }
    return {
      addForm: {
        grade: '',
        gradeList: [],
        class: '',
        classList: []
      },
      rules: {
        grade: [
          {required: true, message: '请选择年级', trigger: 'blur'}
        ],
        class: [
          {validator: checkClass, trigger: 'blur'}
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
          this.axios.post('/system/addClazz', 'name=' + this.addForm.class + '班' + '&gradeId=' + this.addForm.grade)
            .then(res => {
              if (res.data.code === '200') {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                this.$router.go(0)
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
