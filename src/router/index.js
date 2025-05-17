import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Shop from '@/views/Shop.vue'
import Blog from '@/views/Blog.vue'
import About from '@/views/About.vue'
import Contact from '@/views/Contact.vue'
import Cart from '@/views/Cart.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import BlogPost from '@/views/BlogPost.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/shop', component: Shop },
  { path: '/blog', component: Blog },
  { path: '/blog/:slug', component: BlogPost },
  { path: '/:pathMatch(.*)*', redirect: '/' }, // fallback 404
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/cart', component: Cart },
  { path: '/product/:id', component: ProductDetail }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router