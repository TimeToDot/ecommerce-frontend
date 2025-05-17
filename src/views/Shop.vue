<template>
  <div class="min-h-screen bg-[#fdfaf4] text-gray-800 scroll-smooth">
    <header class="bg-[#f7f5ec] shadow-md sticky top-0 z-50">
      <div class="container mx-auto px-4 md:px-6 py-4 md:py-6 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-olive-800">Fanaberia</h1>
        <nav class="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
          <a href="#shop" class="hover:underline">Sklep</a>
          <router-link to="/blog" class="hover:underline">Blog</router-link>
          <a href="#about" class="hover:underline">O nas</a>
          <span class="hidden md:inline border-l h-5 border-gray-300"></span>
          <a href="#cart" class="hover:underline">Koszyk</a>
        </nav>
      </div>
    </header>

    <section class="relative w-full h-[80vh] overflow-hidden bg-gray-100" id="top" @mouseenter="hovering = true" @mouseleave="hovering = false">
      <transition name="fade">
        <div
          v-if="currentSlide && currentSlide.image"
          class="absolute inset-0 bg-cover bg-center w-full h-full"
          :style="{ backgroundImage: `url(${currentSlide.image || '/images/default-slide.jpg'})` }"
          @click="goTo(currentSlide.link)"
        >
          <div class="absolute inset-0 bg-black/20 flex items-center justify-center">
            <h2 v-if="currentSlide.title" class="text-white text-3xl md:text-5xl font-semibold text-center">{{ currentSlide.title }}</h2>
          </div>
        </div>
      </transition>
      <button @click="prevSlide" class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/60 rounded-full p-3 text-xl">←</button>
      <button @click="nextSlide" class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/60 rounded-full p-3 text-xl">→</button>
    </section>

    <section class="py-12 bg-[#faf9f5]" id="categories">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold text-center mb-8">Nasze kategorie dla Ciebie</h2>
        <div class="flex flex-row justify-center gap-6 overflow-x-auto">
          <div v-for="cat in categories" :key="cat.name" class="flex flex-col items-center text-center min-w-[120px]">
            <div class="w-24 h-24 rounded-full overflow-hidden shadow">
              <img
                :src="cat.image || '/images/default-category.jpg'"
                class="w-full h-full object-cover"
                loading="lazy"
                alt="category"
              />
            </div>
            <p class="text-sm font-medium mt-2">{{ cat.name }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-12 bg-[#fdfaf4]">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold text-center mb-8">Polecamy</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(promo, i) in promos" :key="i" class="rounded-lg overflow-hidden shadow-md cursor-pointer" @click="goTo(promo.link)">
            <img :src="promo.image || '/images/default-promo.jpg'" class="w-full h-64 object-cover transition-opacity duration-300 hover:opacity-90" alt="recommended product" />
            <div class="p-4 bg-white">
              <h3 class="font-semibold text-lg">{{ promo.title }}</h3>
              <p class="text-gray-600 text-sm mt-1">{{ promo.description }}</p>
              <button v-if="promo.link" class="bg-olive-800 text-white px-4 py-2 rounded-full mt-2 hover:bg-olive-700">Zobacz</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="shop" class="py-12 bg-[#faf9f5]">
      <div class="container mx-auto px-4">
        <h2 class="text-xl font-semibold mb-4">Sklep</h2>
        <div class="flex gap-6">
          <aside class="w-48 shrink-0">
            <h3 class="font-semibold mb-2">Filtruj według kategorii</h3>
            <ul class="space-y-2">
              <li v-for="cat in uniqueCategories" :key="cat">
                <button @click="selectCategory(cat)" :class="[selectedCategory === cat ? 'text-blue-600 font-bold' : 'text-gray-700']">
                  {{ cat }}
                </button>
              </li>
            </ul>
          </aside>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-1">
            <div
              v-for="product in paginatedProducts"
              :key="product.id"
              class="border p-4 rounded shadow hover:shadow-md cursor-pointer"
              @click="$router.push(`/product/${product.id}`)"
            >
              <div class="aspect-w-4 aspect-h-3 mb-2 overflow-hidden rounded">
                <img :src="product.image || '/images/default-product.jpg'" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
              </div>
              <h2 class="font-semibold text-md">{{ product.title }}</h2>
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
            Załaduj więcej
          </button>
        </div>
      </div>
    </section>

    <footer id="about" class="mt-16 bg-[#f1efe9] text-gray-800 p-12 min-h-[30vh] text-center">
      <div class="container mx-auto">
        <h2 class="text-xl font-bold mb-4">O Fanaberii</h2>
        <p class="max-w-2xl mx-auto leading-relaxed">
          Jesteśmy małym zespołem pasjonatów tworzenia pięknych, ręcznie robionych przedmiotów i dzieł sztuki od lokalnych twórców. Naszą misją jest tworzenie przytulnego i zachwycającego doświadczenia zarówno podczas zakupów, jak i odkrywania historii naszych produktów.
        </p>
      </div>
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

const promos = ref([
  { title: 'Świece sojowe', image: '/images/soy-candle.png', link: '/blog/first-post', description: 'Naturalne, ręcznie robione świece sojowe z olejkami eterycznymi.' },
  { title: 'Krem do rąk', image: '/images/hand-cream.png', link: '/product/hand-cream', description: 'Odżywczy krem do rąk z naturalnymi składnikami.' }
])

const currentSlide = computed(() => slides.value[currentSlideIndex.value] || {})

const paginatedProducts = computed(() => {
  const filtered = selectedCategory.value
    ? products.value.filter(p => p.category === selectedCategory.value)
    : products.value
  return filtered.slice(0, page.value * 12)
})

const uniqueCategories = computed(() => [...new Set(products.value.map(p => p.category))])
const canLoadMore = computed(() => paginatedProducts.value.length < products.value.length)

const goTo = (link) => {
  if (link?.startsWith('/')) router.push(link)
  else if (link) window.location.href = link
}

const selectCategory = (cat) => {
  selectedCategory.value = cat
  page.value = 1
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
      const category = raw.match(/^---[\s\S]*?category: ['"]?(.+?)['"]?$/m)?.[1] || 'Inne'
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