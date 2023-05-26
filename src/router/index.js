import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/product/IndexView.vue'
import ProductShow from '../views/product/ShowView.vue'
import CartView from '../views/user/CartView.vue'
import UserView from '../views/user/UserView.vue'
import OrderView from '../views/order/IndexView.vue'
import OrderShowView from '../views/order/ShowView.vue'
import OrderPrintView from '../views/order/PrintView.vue'
import RatingView from '../views/user/RatingView.vue'
import DiscussView from '../views/user/DiscussView.vue'

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
    path: '/discuss',
    name: 'discuss',
    component: DiscussView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import(/* webpackChunkName: "Faq" */ '../views/FaqView.vue')
  },
  {
    path: '/tutorial',
    name: 'tutorial',
    component: () => import(/* webpackChunkName: "tutorial" */ '../views/TutorialView.vue')
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
