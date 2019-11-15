<template>
  <el-row class="courseList">
    <add-course :visible.sync="visible"></add-course>
    <el-button type="success" style="float: left" @click="showAddDialog">添加</el-button>
    <el-button type="danger" style="float: left"  @click="deleteCourse">删除</el-button>
    <el-input placeholder="请输入任意关键词查询" style="width: 200px;" v-model="keyWord"></el-input>
    <el-button @click="clearField">清空</el-button>
    <div style="float: right"><a>总计{{courseData.length}}条数据</a></div>
    <el-table
      ref="table"
      :data="courseData"
      max-height="500"
      stripe
      style="width: 100%">
      <el-table-column
        type="selection"
        width="60"></el-table-column>
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
import AddCourse from '@/components/add/AddCourse'
export default {
  name: 'CourseList',
  components: {AddCourse},
  data () {
    return {
      keyWord: '',
      courseList: [],
      method: 'listAllCourse',
      visible: false
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
    },
    showAddDialog () {
      this.visible = true
    },
    deleteCourse () {
      var _counts = this.$refs.table.selection
      if (_counts.length > 0) {
        if (_counts.length === 1) {
          this.$confirm('确定删除吗？此操作不支持撤销！', '删除', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var id = String(_counts[0].id + '')
            this.axios.get('/system/delete?id=' + id + '&method=' + 'deleteCourse')
              .then(res => {
                if (res.data.code === '200') {
                  this.$notify({
                    type: 'success',
                    message: res.data.msg
                  })
                  this.$router.go(0)
                } else {
                  this.$notify({
                    type: 'success',
                    message: res.data.msg
                  })
                }
              }).catch(error => {
                this.$notify({
                  type: 'error',
                  message: '网络错误！'
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
