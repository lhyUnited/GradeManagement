<template>
  <el-row>
    <add-exam :visible.sync="visible"></add-exam>
    <el-button type="success" style="float: left" @click="showAddDialog">添加</el-button>
    <el-button type="danger" style="float: left"  @click="deleteExam">删除</el-button>
    <el-input placeholder="请输入任意关键词查询" style="width: 200px" v-model="keyWord"></el-input>
    <el-button @click="clearField">清空</el-button>
    <div style="float: right"><a>总计{{examData.length}}条数据</a></div>
    <el-table
      ref="table"
      :data="examData"
      stripe
      max-height="500"
      style="width: 100%;">
      <el-table-column
        type="selection"
        width="60"></el-table-column>
      <el-table-column
        prop="id"
        label="测试ID"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="grade"
        label="年级"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="考试名称"
      ></el-table-column>
      <el-table-column
        prop="course"
        label="考核科目"
      ></el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
      ></el-table-column>
      <el-table-column
        prop="time"
        label="考试时间"
      ></el-table-column>
      <el-table-column
        prop="clazz"
        label="考试班级"
      ></el-table-column>
    </el-table>
  </el-row>
</template>

<script>
import AddExam from '@/components/add/AddExam'
export default {
  name: 'ExamList',
  components: {AddExam},
  data () {
    return {
      examList: [],
      method: 'listAllExam',
      keyWord: '',
      visible: false
    }
  },
  created () {
    this.$emit('getTabName', {title: '考试列表', name: this.method})
    this.axios.get('/system/list?method=' + this.method)
      .then(res => {
        this.examList = res.data.data
      })
  },
  computed: {
    examData () {
      const keyword = this.keyWord
      if (keyword) {
        return this.examList.filter(data => {
          return Object.keys(data).some(key => {
            return String((data[key] += '').toLowerCase().indexOf(keyword)) > -1
          })
        })
      }
      return this.examList
    }
  },
  methods: {
    clearField () {
      this.keyWord = ''
    },
    showAddDialog () {
      this.visible = true
    },
    deleteExam () {
      var _counts = this.$refs.table.selection
      if (_counts.length > 0) {
        if (_counts.length === 1) {
          this.$confirm('确定删除吗？此操作不支持撤销！', '删除', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var id = String(_counts[0].id + '')
            this.axios.get('/system/delete?id=' + id + '&method=' + 'deleteExam')
              .then(res => {
                if (res.data.code === '200') {
                  this.$notify({
                    type: 'success',
                    message: '删除成功!'
                  })
                  this.$router.go(0)
                } else {
                  this.$notify({
                    type: 'error',
                    message: res.data.msg
                  })
                }
              }).catch(error => {
                this.$notify({
                  type: 'error',
                  message: '删除失败!'
                })
                console.log(error)
              })
          }).catch(() => {
            this.$notify({
              type: 'info',
              message: '已取消删除'
            })
          })
        } else {
          this.$confirm('你选中了' + _counts.length + '条数据' + ',' + '为安全起见，仅支持单条删除，请重试', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
