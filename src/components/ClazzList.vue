<template>
  <el-row class="classList">
    <el-input style="width: 200px;" placeholder="请输入任意关键词进行查询" v-model="keyWord"></el-input>
    <el-button @click="clearField">清空</el-button>
    <el-table
      max-height="700"
      :data="classData"
      stripe
      style="width: 100%">
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
export default {
  name: 'ClazzList',
  data () {
    return {
      keyWord: '',
      classList: [],
      method: 'listAllClazz'
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
    }
  }
}
</script>

<style scoped>
</style>
