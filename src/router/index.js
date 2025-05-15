import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Shop from '@/views/Shop.vue'
import Blog from '@/views/Blog.vue'
import About from '@/views/About.vue'
import Contact from '@/views/Contact.vue'
import Cart from '@/views/Cart.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import Auth from '@/views/Auth.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/shop', component: Shop },
  { path: '/blog', component: Blog },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/cart', component: Cart },
  { path: '/product/:id', component: ProductDetail },
  { path: '/auth', component: Auth }
]

export default createRouter({
  history: createWebHistory(),
  routes
})