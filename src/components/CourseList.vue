<template>
  <el-row class="courseList">
    <el-input placeholder="请输入任意关键词查询" style="width: 200px;" v-model="keyWord"></el-input>
    <el-button @click="clearField">清空</el-button>
    <el-table
      :data="courseData"
      max-height="700"
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="课程ID"
        width="360">
      </el-table-column>
      <el-table-column
        prop="name"
        label="课程名称">
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
export default {
  name: 'CourseList',
  data () {
    return {
      keyWord: '',
      courseList: [],
      method: 'listAllCourse'
    }
  },
  created () {
    this.$emit('getTabName', {title: '课程列表', name: this.method})
    this.axios.get('/system/list?method=' + this.method)
      .then(res => {
        this.courseList = res.data.data
      })
  },
  computed: {
    courseData () {
      const keyword = this.keyWord
      if (keyword) {
        return this.courseList.filter(data => {
          return Object.keys(data).some(key => {
            return String((data[key] += '').toLowerCase().indexOf(keyword)) > -1
          })
        })
      }
      return this.courseList
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
