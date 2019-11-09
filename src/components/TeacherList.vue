<template>
  <el-row class="teacherList">
    <el-input style="width: 200px;" placeholder="请输入任意关键词进行查询" v-model="keyWord"></el-input>
    <el-button @click="clearField">清空</el-button>
    <el-table
      max-height="700"
      :data="teacherData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="教师ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="number"
        label="工号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机">
      </el-table-column>
      <el-table-column
        prop="qq"
        label="qq">
      </el-table-column>
      <el-table-column
        prop="course"
        label="教授课程">
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
export default {
  name: 'TeacherList',
  data () {
    return {
      teacherList: [],
      keyWord: '',
      method: 'listAllTeacher'
    }
  },
  created () {
    this.$emit('getTabName', {title: '教师列表', name: this.method})
    this.axios.get('/system/list?method=' + this.method)
      .then(res => {
        this.teacherList = res.data.data
      })
  },
  computed: {
    teacherData () {
      const keyword = this.keyWord
      if (keyword) {
        return this.teacherList.filter(data => {
          return Object.keys(data).some(key => {
            return String((data[key] += '').toLowerCase().indexOf(keyword)) > -1
          })
        })
      }
      return this.teacherList
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
