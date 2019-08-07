import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/home/city',  // 为了从逻辑上划分 当前组件页面的 关系 但是由于希望使用全局的router-view 所以必须是一级路由
      name: 'city',
      component: () => import(/* webpackChunkName: "city" */ '../views/home/city/index.vue')
    },
    {
      path: '/movie',
      name: 'movie',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "movie" */ '../views/movie/index.vue')
    },
    {
        path: '/ticket',
        name: 'ticket',
        component: () => import(/* webpackChunkName: "ticket" */ '../views/ticket/index.vue')
    },
    {
        path: '/cinema',
        name: 'cinema',
        component: () => import(/* webpackChunkName: "cinema" */ '../views/cinema/index.vue')
    },
    {
        path: '/main',
        name: 'main',
        component: () => import(/* webpackChunkName: "main" */ '../views/main/index.vue')
    },
    // {
    //    path: '*',
    //    redirect: '/home'
    // }
  ]
})
