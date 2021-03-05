import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Brunches from '../views/Brunches.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/brunches',
    name: 'Brunches',
    component:Brunches
  },{
    path: '*',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
