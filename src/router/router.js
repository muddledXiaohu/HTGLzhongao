import Vue from 'vue'
import Router from 'vue-router'
// import Login from '../components/Login.vue'
const Login = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/Login.vue')
// import Home from '../components/Home.vue'
const Home = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/Home.vue')
// import Welcome from '../components/Welcome.vue'
const Welcome = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/Welcome.vue')
// eslint-disable-next-line import/first
const List = () => import(/* webpackChunkName:"login_home_list" */ '../components/management/list.vue')
// eslint-disable-next-line import/first
const Fraction = () => import(/* webpackChunkName:"login_home_fraction" */ '../components/management/fraction.vue')
// eslint-disable-next-line import/first
const groupBooking = () => import(/* webpackChunkName:"login_home_groupBooking" */ '../components/management/groupBooking.vue')
// eslint-disable-next-line import/first
import '../assets/fonts/iconfont.css'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/list', component: List },
        { path: '/fraction', component: Fraction },
        { path: '/groupBooking', component: groupBooking }
      ]
    }
  ]
})

// 为路由对象， 添加 beforeEach 导航守卫
router.beforeEach((to, from, next) => {
  // to将要访问的路径
  // from代表从那个路径跳转而来
  // next是一个函数，表示放行
  // 如果用户访问的登陆页，直接放行
  if (to.path === '/login') return next()
  // 从sessionStorage 中获取到保存的token值
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有token，强制跳转到登陆页
  if (!tokenStr) return next('/login')
  next()
})

export default router
