<template>
  <el-container>
    <el-header>
      <home-header></home-header>
    </el-header>
    <el-container>
      <el-aside>
        <admin-nav></admin-nav>
      </el-aside>
      <el-main>
        <el-tabs v-model="tabValue" type="card" closable @tab-remove="removeTab">
          <el-tab-pane
            v-for="(item, index) in tabNames"
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
import ClassInfo from '@/components/ClassInfo'
import HomeHeader from '@/components/HomeHeader'
import AdminNav from '@/components/AdminNav'
export default {
  name: 'HomePage',
  components: {AdminNav, HomeHeader, ClassInfo},
  data () {
    return {
      tabNames: [],
      tabValue: ''
    }
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
              this.$router.push('/home')
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
