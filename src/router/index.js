import Vue from 'vue'
import VueRouter from 'vue-router'
import Gallery from '@/views/Gallery'
import Config from '@/views/Config'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'gallery',
    component: Gallery
  },
  {
    path: '/config',
    name: 'config',
    component: Config
  },
  {
    path: '*', 
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
