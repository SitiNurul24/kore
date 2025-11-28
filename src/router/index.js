// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/Auth/Login.vue'

import adminRoutes from './adminRouter'

const routes = [
  { path: '/', redirect: '/login' }, // Redirect root to login
  { path: '/login', component: Login },
  ...adminRoutes,

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('srt')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})
export default router
