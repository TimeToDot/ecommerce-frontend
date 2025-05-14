import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '@/components/ProductList.vue'
import ProductDetail from '@/components/ProductDetail.vue'
import Blog from '@/components/Blog.vue'
import About from '@/components/About.vue'
import Contact from '@/components/Contact.vue'
import Auth from '@/components/Auth.vue'
import Cart from '@/components/Cart.vue'

const routes = [
  { path: '/', component: ProductList },
  { path: '/shop', component: ProductList },
  { path: '/product/:id', component: ProductDetail },
  { path: '/blog', component: Blog },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/auth', component: Auth },
  { path: '/cart', component: Cart }
]

export default createRouter({ history: createWebHistory(), routes })