<template>
  <el-row>
    <add-grade :visible.sync="visible"></add-grade>
    <el-button type="success" style="float: left" @click="showAddDialog">添加</el-button>
    <el-button type="danger" style="float: left"  @click="deleteGrade">删除</el-button>
    <el-input placeholder="请输入任意关键词查询" style="width: 200px" v-model="keyWord"></el-input>
    <el-button @click="clearField">清空</el-button>
    <el-table
      ref="table"
      :data="gradeData"
      stripe
      max-height="700"
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
import AddGrade from '@/components/AddGrade'
export default {
  name: 'GradeList',
  components: {AddGrade},
  data () {
    return {
      keyWord: '',
      gradeList: [],
      method: 'listAllGrade',
      visible: false
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
    clearField () {
      this.keyWord = ''
    },
    showAddDialog () {
      this.visible = true
    },
    deleteGrade () {
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
