<template>
    <el-table
      ref="table"
      max-height="500"
      :data="studentList"
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
</template>

<script>
export default {
  name: 'PersonInfo',
  data () {
    return {
      studentList: []
    }
  },
  created () {
    this.studentList.push(JSON.parse(localStorage.getItem('StudentInfo')))
    console.log(this.studentList)
  }
}
</script>

<style scoped>

</style>
