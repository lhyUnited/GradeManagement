<template>
  <el-container>
    <el-header>
      <home-header></home-header>
    </el-header>
    <el-container>
      <el-aside>
        <admin-nav v-show="admin"></admin-nav>
        <teacher-nav v-show="teacher"></teacher-nav>
        <student-nav v-show="student"></student-nav>
      </el-aside>
      <el-main>
        <el-tabs v-model="tabValue" type="card" closable @tab-remove="removeTab">
          <el-tab-pane
            v-for="item in tabNames"
            :key="item.name"
            :label="item.title"
            :name="item.name">
          </el-tab-pane>
          <router-view @getTabName="getTabName"></router-view>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HomeHeader from '@/components/HomeHeader'
import AdminNav from '@/components/nav/AdminNav'
import TeacherNav from '@/components/nav/TeacherNav'
import StudentNav from '@/components/nav/StudentNav'
export default {
  name: 'HomePage',
  components: {StudentNav, TeacherNav, AdminNav, HomeHeader},
  data () {
    return {
      tabNames: [],
      tabValue: '',
      admin: false,
      teacher: false,
      student: false
    }
  },
  mounted () {
    this.changeNav()
  },
  watch: {
    'tabValue': function (val) {
      if (val === '0') val = ''
      let url = val
      this.$router.push(url).catch(err => {
        console.log(err)
      })
    }
  },
  methods: {
    changeNav () {
      let info = JSON.parse(localStorage.getItem('UserInfo'))
      if (info.type === 1) {
        this.admin = true
      } else if (info.type === 2) {
        this.student = true
      } else {
        this.teacher = true
      }
    },
    getTabName (val) {
      var flag = true
      for (let i = 0; i < this.tabNames.length; i++) {
        if (val.name === this.tabNames[i].name) {
          flag = false
        }
      }
      if (flag) {
        this.tabNames.push(val)
      }
      this.tabValue = val.name
    },
    removeTab (targetName) {
      let tabs = this.tabNames
      let activeName = this.tabValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            } else {
              this.$router.push('/home/intro')
            }
          }
        })
      }

      this.tabValue = activeName
      this.tabNames = tabs.filter(tab => tab.name !== targetName)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
