<template>
  <el-row class="classList">
    <add-class :visible.sync="visible"></add-class>
    <el-button type="success" style="float: left" @click="showAddDialog">添加</el-button>
    <el-button type="danger" style="float: left"  @click="deleteClass">删除</el-button>
    <el-input style="width: 200px;" placeholder="请输入任意关键词进行查询" v-model="keyWord"></el-input>
    <el-button @click="clearField">清空</el-button>
    <el-table
      ref="table"
      max-height="700"
      :data="classData"
      stripe
      style="width: 100%">
      <el-table-column
        type="selection"
        width="60"></el-table-column>
      <el-table-column
        prop="id"
        label="班级ID"
        width="360">
      </el-table-column>
      <el-table-column
        prop="name"
        label="班级名称"
        width="360">
      </el-table-column>
      <el-table-column
        prop="grade"
        label="所属年级">
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
import AddClass from '@/components/AddClass'
export default {
  name: 'ClazzList',
  components: {AddClass},
  data () {
    return {
      keyWord: '',
      classList: [],
      method: 'listAllClazz',
      visible: false
    }
  },
  created () {
    this.$emit('getTabName', {title: '班级列表', name: this.method})
    this.axios.get('/system/list?method=' + this.method)
      .then(res => {
        this.classList = res.data.data
      })
  },
  computed: {
    classData () {
      const keyword = this.keyWord
      if (keyword) {
        return this.classList.filter(data => {
          return Object.keys(data).some(key => {
            return String((data[key] += '').toLowerCase().indexOf(keyword)) > -1
          })
        })
      }
      return this.classList
    }
  },
  methods: {
    clearField () {
      this.keyWord = ''
    },
    showAddDialog () {
      this.visible = true
    },
    deleteClass () {
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
