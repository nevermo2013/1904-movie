import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
// 初始化 html的font-size
import 'lib-flexible';
// 初始化 css样式
import '@/assets/style/common/reset.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
