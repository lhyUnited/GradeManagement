<template>
  <el-row>
    <el-input style="width: 200px;" placeholder="请输入任意关键词进行查询" v-model="keyWord"></el-input>
    <el-button @click="clearField">清空</el-button>
    <el-table
      max-height="700"
      :data="studentData"
      stripe
      style="width: 100%">
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
export default {
  name: 'StudentList',
  data () {
    return {
      keyWord: '',
      method: 'listAllStudent',
      studentList: []
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
    }
  }
}
</script>

<style scoped>

</style>
