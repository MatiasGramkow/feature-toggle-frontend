import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Forgot from '../pages/Forgot.vue'
import Reset from '../pages/Reset.vue'
import Features from '../pages/Features.vue'
import store from '@/store'


const routes: Array<RouteRecordRaw> = [
  {path: '/',component: Home,},
  {path: '/login',component: Login,},
  {path: '/register',component: Register,},
  {path: '/forgot',component: Forgot,},
  {path: '/reset/:token',component: Reset,},
  {path: '/features',component: Features, meta: {requiresAuth: true}},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

  router.beforeEach((to,from,next) => {
    if(to.matched.some(route => route.meta.requiresAuth || route.meta.requiresAuth != null)){
      const authUser = localStorage.getItem('token')
      if(authUser) return next();
      return next('/login');
    }
  
    next();
  });

export default router
