<template>
  <el-row>
    <add-course :visible.sync="visibleCourse" :grade="gradeInfo"></add-course>
    <add-grade :visible.sync="visible"></add-grade>
    <el-button type="success" style="float: left" @click="showAddDialog">添加</el-button>
    <el-button type="danger" style="float: left"  @click="deleteGrade">删除</el-button>
    <el-button type="info" style="float: left"  @click="showAddCourseDialog" :disabled="disabled">添加班级</el-button>
    <el-input placeholder="请输入任意关键词查询" style="width: 200px" v-model="keyWord"></el-input>
    <el-button @click="clearField">清空</el-button>
    <div style="float: right"><a>总计{{gradeData.length}}条数据</a></div>
    <el-table
      @select="changeState"
      ref="table"
      :data="gradeData"
      stripe
      max-height="500"
      style="width: 100%;">
      <el-table-column
        type="selection"
        width="60"></el-table-column>
      <el-table-column
        prop="id"
        label="年级ID"
        width="360"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="年级"
        width="360"
      ></el-table-column>
      <el-table-column
        prop="courseNames"
        label="开设课程"
      ></el-table-column>
    </el-table>
  </el-row>
</template>

<script>
import AddGrade from '@/components/add/AddGrade'
import AddCourse from '@/components/add/AddCourse'
export default {
  name: 'GradeList',
  components: {AddCourse, AddGrade},
  data () {
    return {
      keyWord: '',
      gradeList: [],
      method: 'listAllGrade',
      visible: false,
      visibleCourse: false,
      disabled: true,
      gradeInfo: []
    }
  },
  created () {
    this.$emit('getTabName', {title: '年级列表', name: this.method})
    this.axios.get('/system/list?method=' + this.method)
      .then(res => {
        this.gradeList = res.data.data
      })
  },
  computed: {
    gradeData () {
      const keyword = this.keyWord
      if (keyword) {
        return this.gradeList.filter(data => {
          return Object.keys(data).some(key => {
            return String((data[key] += '').toLowerCase().indexOf(keyword)) > -1
          })
        })
      }
      return this.gradeList
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
    clearField () {
      this.keyWord = ''
    },
    showAddDialog () {
      this.visible = true
    },
    showAddCourseDialog () {
      var gradeId = this.$refs.table.selection[0].id
      this.gradeInfo = {'required': true, 'gradeId': gradeId}
      this.visibleCourse = true
    },
    deleteGrade () {
      var _counts = this.$refs.table.selection
      if (_counts.length > 0) {
        if (_counts.length === 1) {
          this.$confirm('确定删除吗？此操作不支持撤销！', '删除', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var id = String(_counts[0].id + '')
            this.axios.get('/system/delete?id=' + id + '&method=' + 'deleteGrade')
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
