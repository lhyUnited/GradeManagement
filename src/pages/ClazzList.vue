<template>
  <el-row>
    <el-input style="width: 200px;" placeholder="请输入任意关键词进行查询" v-model="keyWord" @input="getClassData"></el-input>
    <el-button @click="clearField">清空</el-button>
    <el-table
      :data="classData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="班级ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="班级名称"
        width="180">
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
      classData: [],
      temp: []
    }
  },
  created () {
    this.axios.get('/system/list?method=listAllClazz')
      .then(res => {
        this.classData = res.data.data
        this.temp = res.data.data
      })
  },
  methods: {
    getClassData () {
      this.classData = []
      for (let i = 0; i < this.temp.length; i++) {
        if (parseInt(this.keyWord) === this.temp[i].id || this.keyWord === this.temp[i].name || this.keyWord === this.temp[i].grade) {
          this.classData.push(this.temp[i])
        }
        if (this.keyWord === '') {
          this.classData = this.temp
        }
      }
    },
    clearField () {
      this.keyWord = ''
      this.getClassData()
    }
  }
}
</script>

<style scoped>

</style>
