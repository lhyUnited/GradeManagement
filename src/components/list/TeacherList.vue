<template>
  <el-row class="teacherList">
    <add-teacher :visible.sync="visible"></add-teacher>
    <add-course-by-teacher :visible.sync="addCourseDialog" :teacher="teacherInfo"></add-course-by-teacher>
    <el-button type="success" style="float: left" @click="showAddDialog">添加</el-button>
    <el-button type="danger" style="float: left"  @click="deleteTeacher">删除</el-button>
    <el-button type="info" style="float: left"  @click="editTeacher" :disabled="disabled">添加课程</el-button>
    <el-input style="width: 200px;" placeholder="请输入任意关键词进行查询" v-model="keyWord"></el-input>
    <el-button @click="clearField">清空</el-button>
    <div style="float: right"><a>总计{{teacherData.length}}条数据</a></div>
    <el-table
      @select="changeState"
      ref="table"
      max-height="500"
      :data="teacherData"
      stripe
      style="width: 100%">
      <el-table-column
        type="selection"
        width="60"></el-table-column>
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
        prop="courses"
        label="教授课程">
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
import AddTeacher from '@/components/add/AddTeacher'
import AddCourseByTeacher from '@/components/add/AddCourseByTeacher'
export default {
  name: 'TeacherList',
  components: {AddCourseByTeacher, AddTeacher},
  data () {
    return {
      visible: false,
      disabled: true,
      teacherList: [],
      keyWord: '',
      method: 'listAllTeacher',
      addCourseDialog: false,
      teacherInfo: ''
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
    changeState () {
      var _counts = this.$refs.table.selection
      if (_counts.length > 0) {
        if (_counts.length === 1) {
          this.disabled = false
        } else {
          this.disabled = true
        }
      } else {
        this.disabled = true
      }
    },
    editTeacher () {
      var teacherId = this.$refs.table.selection[0].id
      this.teacherInfo = teacherId
      this.addCourseDialog = true
    },
    clearField () {
      this.keyWord = ''
    },
    showAddDialog () {
      this.visible = true
    },
    deleteTeacher () {
      var _counts = this.$refs.table.selection
      if (_counts.length > 0) {
        if (_counts.length === 1) {
          this.$confirm('确定删除吗？此操作不支持撤销！', '删除', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var id = String(_counts[0].id + '')
            this.axios.get('/system/delete?id=' + id + '&method=' + 'deleteTeacher')
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
