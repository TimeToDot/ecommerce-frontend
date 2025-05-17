<template>
  <div class="min-h-screen bg-[#fdfaf4] text-gray-800 scroll-smooth">
    <header
      class="bg-[#f7f5ec] shadow-md sticky top-0 z-50 transition-all duration-300"
      :style="{ backgroundColor: headerBgColor }"
    >
      <div
        class="container mx-auto px-4 md:px-6 py-4 md:py-6 flex justify-content-between items-center flex-col md:flex-row"
        :style="{ opacity: headerOpacity }"
      >
        <h1 class="text-2xl font-bold text-olive-800 mb-2 md:mb-0">Fanaberia</h1>
        <nav class="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
          <router-link to="/blog" class="hover:underline">Blog</router-link>
          <a href="#about" class="hover:underline">O nas</a>
          <span class="hidden md:inline border-l h-5 border-gray-300"></span>
          <a href="#cart" class="hover:underline">Koszyk</a>
        </nav>
      </div>
    </header>

    <section
      class="relative w-full h-[80vh] overflow-hidden bg-gray-100"
      id="top"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      <transition name="fade">
        <div
          v-if="currentSlide && currentSlide.image"
          class="absolute inset-0 bg-cover bg-center w-full h-full"
          :style="{
            backgroundImage: `url(${
              currentSlide.image || '/images/default-slide.jpg'
            })`,
          }"
          @click="goTo(currentSlide.link)"
        ></div>
      </transition>
      <button
        @click="prevSlide"
        class="absolute left-0 top-0 bottom-0 text-white opacity-20 hover:opacity-70 transition-opacity z-10 flex items-center justify-start pl-4 md:pl-8"
      >
        <span class="text-2xl">←</span>
      </button>
      <button
        @click="nextSlide"
        class="absolute right-0 top-0 bottom-0 text-white opacity-20 hover:opacity-70 transition-opacity z-10 flex items-center justify-end pr-4 md:pr-8"
      >
        <span class="text-2xl">→</span>
      </button>
    </section>

    <section class="py-12 bg-[#faf9f5]" id="categories">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold text-center mb-8">
          Nasze kategorie dla Ciebie
        </h2>
        <div class="flex flex-wrap justify-center gap-6">
          <div
            v-for="cat in categories"
            :key="cat.name"
            class="flex flex-col items-center text-center category-item"
          >
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
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 recommended-products-grid">
          <div
            v-for="(promo, i) in promos"
            :key="i"
            class="rounded-lg overflow-hidden shadow-md cursor-pointer"
            @click="goTo(promo.link)"
          >
            <img
              :src="promo.image || '/images/default-promo.jpg'"
              class="w-full h-64 object-cover transition-opacity duration-300 hover:opacity-90 recommended-product-image"
              alt="recommended product"
            />
            <div class="p-4 bg-white">
              <h3 class="font-semibold text-lg">{{ promo.title }}</h3>
              <p class="text-gray-600 text-sm mt-1">
                {{ promo.description }}
              </p>
              <button
                v-if="promo.link"
                class="bg-olive-800 text-white px-4 py-2 rounded-full mt-2 hover:bg-olive-700"
              >
                Zobacz
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-12 bg-[#faf9f5]">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold text-center mb-8">Ulubione</h2>
        <div class="flex flex-wrap justify-center gap-6">
          <div
            v-for="product in favoriteProducts.slice(0, 20)"
            :key="product.id"
            class="border p-4 rounded shadow hover:shadow-md cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
          >
            <div class="aspect-w-3 aspect-h-4 mb-2 overflow-hidden rounded">
              <img
                :src="product.image || '/images/default-product.jpg'"
                class="w-full h-full object-cover transition-transform duration-300 hover:scale-105 product-image"
              />
            </div>
            <h2 class="font-semibold text-md text-center">
              {{ product.title }}
            </h2>
            <p class="text-sm text-gray-600 text-center">{{ product.price }}</p>
          </div>
        </div>
      </div>
    </section>

    <footer
      id="about"
      class="mt-16 bg-[#f1efe9] text-gray-800 p-12 min-h-[30vh] text-center"
    >
      <div class="container mx-auto">
        <h2 class="text-xl font-bold mb-4">O Fanaberii</h2>
        <p class="max-w-2xl mx-auto leading-relaxed">
          Jesteśmy małym zespołem pasjonatów tworzenia pięknych, ręcznie robionych
          przedmiotów i dzieł sztuki od lokalnych twórców. Naszą misją jest
          tworzenie przytulnego i zachwycającego doświadczenia zarówno podczas
          zakupów, jak i odkrywania historii naszych produktów.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { marked } from 'marked'
import './Home.css'

const router = useRouter()
const currentSlideIndex = ref(0)
const slides = ref([])
const categories = ref([])
const products = ref([])
const favoriteProducts = ref([])
const page = ref(1)
const hovering = ref(false)
const isScrolled = ref(false)
const headerBgColor = ref('#f7f5ec') // Początkowy kolor tła headera
const headerOpacity = ref(1) // Początkowa pełna widoczność headera
let autoInterval = null

const promos = ref([
  {
    title: 'Świece sojowe',
    image: '/images/soy-candle.png',
    link: '/blog/first-post',
    description: 'Naturalne, ręcznie robione świece sojowe z olejkami eterycznymi.',
  },
  {
    title: 'Krem do rąk',
    image: '/images/hand-cream.png',
    link: '/product/hand-cream',
    description: 'Odżywczy krem do rąk z naturalnymi składnikami.',
  },
])

const currentSlide = computed(() => slides.value[currentSlideIndex.value] || {})

const paginatedProducts = computed(() => {
  const filtered = selectedCategory.value
    ? products.value.filter((p) => p.category === selectedCategory.value)
    : products.value
  return filtered.slice(0, page.value * 12)
})

const uniqueCategories = computed(() => [
  ...new Set(products.value.map((p) => p.category)),
])
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
  currentSlideIndex.value =
    (currentSlideIndex.value - 1 + slides.value.length) % slides.value.length
}

const nextSlide = () => {
  currentSlideIndex.value =
    (currentSlideIndex.value + 1) % slides.value.length
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

const handleScroll = () => {
  const scrollPosition = window.scrollY
  const threshold = 100 // Wysokość, po której header zaczyna być przezroczysty

  if (scrollPosition > threshold) {
    headerBgColor.value = 'rgba(247, 245, 236, 0.7)' // Przezroczyste tło
    headerOpacity.value = 0.7 // Przezroczystość tekstu
  } else {
    headerBgColor.value = '#f7f5ec' // Pełny kolor tła
    headerOpacity.value = 1 // Pełna widoczność tekstu
  }
}

onMounted(async () => {
  window.addEventListener('scroll', handleScroll)

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
      const id = path.split('/').pop().replace('.md', '')
      const title = raw.match(/^---[\s\S]*?title: ['"]?(.+?)['"]?$/m)?.[1]
      const image = raw.match(/^---[\s\S]*?image: ['"]?(.+?)['"]?$/m)?.[1]
      const price = raw.match(/^---[\s\S]*?price: ['"]?(.+?)['"]?$/m)?.[1]
      const category = raw.match(/^---[\s\S]*?category: ['"]?(.+?)['"]?$/m)?.[1] ||
        'Inne'
      const favorite = raw.match(/^---[\s\S]*?favorite: (true|false)$/m)?.[1] ===
        'true'
      if (title) {
        products.value.push({
          id,
          title,
          image,
          price,
          category,
          favorite,
        })
        if (favorite) {
          favoriteProducts.value.push({
            id,
            title,
            image,
            price,
          })
        }
      }
    }
  } catch (e) {
    console.warn('Products load error:', e)
  }
})
</script>