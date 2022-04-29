import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

import store from '../store/index';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue'),
    meta: {rutaProtegida: true}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach( (to, from, next) => {

  const esProtegida = to.matched.some(item => item.meta.rutaProtegida)

  if (esProtegida && store.state.token === null)
  {
    //console.log("Es Protegida");
    next('/');
  }
  else
  {
    //console.log("NO es Protegida");
    next();
  }

})

export default router
