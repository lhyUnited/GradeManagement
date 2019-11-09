<template>
  <el-row>
    <el-input placeholder="请输入任意关键词查询" style="width: 200px" v-model="keyWord"></el-input>
    <el-button @click="clearField">清空</el-button>
    <el-table
      :data="gradeData"
      stripe
      max-height="700"
      style="width: 100%;">
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
export default {
  name: 'GradeList',
  data () {
    return {
      keyWord: '',
      gradeList: [],
      method: 'listAllGrade'
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
    }
  }
}
</script>

<style scoped>

</style>
