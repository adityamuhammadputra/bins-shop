import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/product/IndexView.vue'
import ProductShow from '../views/product/ShowView.vue'
import CartView from '../views/user/CartView.vue'
import UserView from '../views/user/UserView.vue'
import OrderView from '../views/order/IndexView.vue'
import OrderShowView from '../views/order/ShowView.vue'
import OrderPrintView from '../views/order/PrintView.vue'
import RatingView from '../views/rating/IndexView.vue'

import PathNotFound from '../views/auth/PageNotFound.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/user',
    name: 'user',
    component: UserView
  },
  {
    path: '/product',
    name: 'produt',
    component: ProductView
  },
  {
    path: '/product/:slug',
    name: 'produt-detail',
    component: ProductShow
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/order',
    name: 'order',
    component: OrderView
  },
  {
    path: '/order/:order_id',
    name: 'order-detail',
    component: OrderShowView
  },
  {
    path: '/order/:order_id/print',
    name: 'order-print',
    component: OrderPrintView,
    meta: {
      header: 0
    }
  },
  {
    path: '/rating',
    name: 'rating',
    component: RatingView
  },
  { 
    path: '/:pathMatch(.*)*', 
    component: PathNotFound 
  },
  // {
  //   path: '/auth/:provider/callback',
  //   component: {
  //     template: '<div class="auth-component">google</div>'
  //   }
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
  }
})

export default router
