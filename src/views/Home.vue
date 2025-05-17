<!-- Updated Home.vue layout with fixed slider, categories and product loading -->
<template>
  <div class="min-h-screen bg-[#fdfaf4] text-gray-800 scroll-smooth">
    <!-- Header -->
    <header class="flex flex-col md:flex-row md:justify-between md:items-center p-4 md:p-6 shadow-md bg-[#f7f5ec] sticky top-0 z-50">
      <h1 class="text-2xl font-bold text-olive-800 mb-2 md:mb-0">Fanaberia</h1>
      <nav class="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
        <a href="#shop" class="hover:underline">Shop</a>
        <router-link to="/blog" class="hover:underline">Blog</router-link>
        <a href="#about" class="hover:underline">About</a>
        <span class="hidden md:inline border-l h-5 border-gray-300"></span>
        <a href="#cart" class="hover:underline">Cart</a>
      </nav>
    </header>

    <!-- Hero Slider -->
    <section class="relative w-full h-[80vh] overflow-hidden bg-gray-100" id="top" @mouseenter="hovering = true" @mouseleave="hovering = false">
      <transition name="fade">
        <div
          v-if="currentSlide && currentSlide.image"
          class="absolute inset-0 bg-cover bg-center w-full h-full"
          :style="{ backgroundImage: `url(${currentSlide.image || '/images/default.jpg'})` }"
          @click="goTo(currentSlide.link)"
        ></div>
      </transition>
      <button @click="prevSlide" class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/60 rounded-full p-2">←</button>
      <button @click="nextSlide" class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/60 rounded-full p-2">→</button>
    </section>

    <!-- Categories -->
    <section class="py-12 bg-[#faf9f5]" id="categories">
      <h2 class="text-2xl font-bold text-center mb-8">Our categories for you</h2>
      <div class="flex flex-wrap justify-center gap-6">
        <div v-for="cat in categories" :key="cat.name" class="flex flex-col items-center text-center">
          <img
            :src="cat.image || '/images/default.jpg'"
            class="w-24 h-24 rounded-full object-cover mb-2 shadow"
            loading="lazy"
           alt="category"/>
          <p class="text-sm font-medium">{{ cat.name }}</p>
        </div>
      </div>
    </section>

    <!-- Promo Banners -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto px-4 mb-12">
      <div v-for="(banner, i) in promos" :key="i" class="cursor-pointer rounded overflow-hidden">
        <img :src="banner.image || '/images/default.jpg'" class="w-full h-64 object-cover hover:opacity-90 transition" @click="goTo(banner.link)"  alt="banner"/>
      </div>
    </section>

    <!-- Shop Section -->
    <section id="shop" class="max-w-6xl mx-auto px-4">
      <h2 class="text-xl font-semibold mb-4">Shop</h2>
      <div class="flex gap-6">
        <aside class="w-48 shrink-0">
          <h3 class="font-semibold mb-2">Filter by Category</h3>
          <ul class="space-y-2">
            <li v-for="cat in uniqueCategories" :key="cat">
              <button @click="selectCategory(cat)" :class="[selectedCategory === cat ? 'text-blue-600 font-bold' : 'text-gray-700']">
                {{ cat }}
              </button>
            </li>
          </ul>
        </aside>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 flex-1">
          <div
            v-for="product in paginatedProducts"
            :key="product.id"
            class="border p-4 rounded shadow hover:shadow-md cursor-pointer"
            @click="$router.push(`/product/${product.id}`)"
          >
            <img :src="product.image || '/images/default.jpg'" class="w-full h-40 object-cover rounded mb-2" />
            <h2 class="font-semibold">{{ product.title }}</h2>
            <p class="text-sm text-gray-600">{{ product.price }}</p>
          </div>
        </div>
      </div>
      <div class="text-center mt-8">
        <button
          v-if="canLoadMore"
          @click="page++"
          class="bg-olive-800 text-white px-4 py-2 rounded shadow hover:bg-olive-700"
        >
          Load More
        </button>
      </div>
    </section>

    <!-- Footer About -->
    <footer id="about" class="mt-16 bg-[#f1efe9] text-gray-800 p-12 min-h-[70vh] text-center">
      <h2 class="text-xl font-bold mb-4">About Fanaberia</h2>
      <p class="max-w-2xl mx-auto leading-relaxed">
        We are a small team passionate about delivering beautiful handmade items and art from local creators. Our mission is to create a cozy and delightful experience both in shopping and storytelling.
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { marked } from 'marked'

const router = useRouter()
const currentSlideIndex = ref(0)
const slides = ref([])
const categories = ref([])
const products = ref([])
const selectedCategory = ref('')
const page = ref(1)
const hovering = ref(false)
let autoInterval = null

const promos = [
  { image: '/images/soy-candle.png', link: '/blog/first-post' },
  { image: '/images/soy-candle.png', link: '/product/hand-cream' }
]

const currentSlide = computed(() => slides.value[currentSlideIndex.value] || {})

const paginatedProducts = computed(() => {
  const filtered = selectedCategory.value
    ? products.value.filter(p => p.category === selectedCategory.value)
    : products.value
  return filtered.slice(0, page.value * 20)
})

const uniqueCategories = computed(() => [...new Set(products.value.map(p => p.category))])
const canLoadMore = computed(() => paginatedProducts.value.length < products.value.length)

const goTo = (link) => {
  if (link?.startsWith('/')) router.push(link)
  else if (link) window.location.href = link
}

const selectCategory = (cat) => {
  selectedCategory.value = cat
  document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
}

const prevSlide = () => {
  currentSlideIndex.value = (currentSlideIndex.value - 1 + slides.value.length) % slides.value.length
}

const nextSlide = () => {
  currentSlideIndex.value = (currentSlideIndex.value + 1) % slides.value.length
}

watch(hovering, (val) => {
  if (val) clearInterval(autoInterval)
  else startAutoSlide()
})

function startAutoSlide() {
  if (autoInterval) clearInterval(autoInterval)
  autoInterval = setInterval(() => {
    if (!hovering.value && slides.value.length > 0) {
      nextSlide()
    }
  }, 5000)
}

onMounted(async () => {
  try {
    const slideFiles = import.meta.glob('/content/slides/*.md', { as: 'raw' })
    for (const path in slideFiles) {
      const raw = await slideFiles[path]()
      const title = raw.match(/^---[\s\S]*?title: ['"]?(.+?)['"]?$/m)?.[1]
      const image = raw.match(/^---[\s\S]*?image: ['"]?(.+?)['"]?$/m)?.[1]
      const link = raw.match(/^---[\s\S]*?link: ['"]?(.+?)['"]?$/m)?.[1]
      if (image) slides.value.push({ title, image, link })
    }
    startAutoSlide()
  } catch (e) {
    console.warn('Slider load error:', e)
  }

  try {
    const catFiles = import.meta.glob('/content/categories/*.md', { as: 'raw' })
    for (const path in catFiles) {
      const raw = await catFiles[path]()
      const name = raw.match(/^---[\s\S]*?name: ['"]?(.+?)['"]?$/m)?.[1]
      const image = raw.match(/^---[\s\S]*?image: ['"]?(.+?)['"]?$/m)?.[1]
      if (name) categories.value.push({ name, image })
    }
  } catch (e) {
    console.warn('Categories load error:', e)
  }

  try {
    const prodFiles = import.meta.glob('/content/products/*.md', { as: 'raw' })
    for (const path in prodFiles) {
      const raw = await prodFiles[path]()
      const title = raw.match(/^---[\s\S]*?title: ['"]?(.+?)['"]?$/m)?.[1]
      const image = raw.match(/^---[\s\S]*?image: ['"]?(.+?)['"]?$/m)?.[1]
      const price = raw.match(/^---[\s\S]*?price: ['"]?(.+?)['"]?$/m)?.[1]
      const category = raw.match(/^---[\s\S]*?category: ['"]?(.+?)['"]?$/m)?.[1] || 'Other'
      if (title) {
        products.value.push({
          id: path.split('/').pop().replace('.md', ''),
          title,
          image,
          price,
          category
        })
      }
    }
  } catch (e) {
    console.warn('Products load error:', e)
  }
})
</script>

<style scoped>
.text-olive-800 {
  color: #556b2f;
}
.bg-olive-800 {
  background-color: #556b2f;
}
.bg-olive-700 {
  background-color: #4a5f2a;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
