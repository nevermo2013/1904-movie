<template>
  <div id="app">
    <router-view/>
    <Footer></Footer>
  </div>
</template>
<script>
// 引入公共组件
import  Footer from '@/components/Footer'
export default {
  name: 'App',
  // 注册组件
  components:{
    Footer
  }

}
</script>

<style lang="scss">
@import "@/assets/style/common/common.scss";
html,body{
  height: 100%;
  overflow: hidden;
}
body{
  background-color: $baseBgColor;
  color: #fff;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
