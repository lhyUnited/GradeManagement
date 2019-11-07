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
        <router-view></router-view>
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
