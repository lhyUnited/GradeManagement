<template>
  <el-row>
    <add-student :visible.sync="visible"></add-student>
    <el-button type="success" style="float: left" @click="showAddDialog">添加</el-button>
    <el-button type="danger" style="float: left"  @click="deleteStudent">删除</el-button>
    <el-input style="width: 200px;" placeholder="请输入任意关键词进行查询" v-model="keyWord"></el-input>
    <el-button @click="clearField">清空</el-button>
    <el-table
      ref="table"
      max-height="700"
      :data="studentData"
      stripe
      style="width: 100%">
      <el-table-column
      type="selection"
      width="60"></el-table-column>
      <el-table-column
        prop="id"
        label="学生ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="number"
        label="学号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机"
        width="180">
      </el-table-column>
      <el-table-column
        prop="qq"
        label="qq"
        width="180">
      </el-table-column>
      <el-table-column
        prop="clazzId"
        label="班级"
        width="180">
      </el-table-column>
      <el-table-column
        prop="gradeId"
        label="年级"
        width="180">
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
import AddStudent from '@/components/AddStudent'
export default {
  name: 'StudentList',
  components: {AddStudent},
  data () {
    return {
      keyWord: '',
      method: 'listAllStudent',
      studentList: [],
      visible: false
    }
  },
  created () {
    this.$emit('getTabName', {title: '学生列表', name: this.method})
    this.axios.get('/system/list?method=' + this.method)
      .then(res => {
        this.studentList = res.data.data
      })
  },
  computed: {
    studentData () {
      const keyword = this.keyWord
      if (keyword) {
        return this.studentList.filter(data => {
          return Object.keys(data).some(key => {
            return String((data[key] += '').toLowerCase().indexOf(keyword)) > -1
          })
        })
      }
      return this.studentList
    }
  },
  methods: {
    clearField () {
      this.keyWord = ''
    },
    showAddDialog () {
      this.visible = true
    },
    deleteStudent () {
      var _counts = this.$refs.table.selection
      if (_counts.length > 0) {
        this.$confirm('确定删除吗？此操作不支持撤销！', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$notify({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
