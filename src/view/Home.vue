<template>
  <div class="min-h-screen flex flex-col">
    <header class="flex items-center justify-between p-4 bg-white shadow-md">
      <div class="text-xl font-bold">MyShop</div>
      <nav class="flex gap-6 text-sm font-medium">
        <router-link to="/shop" class="hover:text-blue-600">Shop</router-link>
        <router-link to="/blog" class="hover:text-blue-600">Blog</router-link>
        <router-link to="/about" class="hover:text-blue-600">About</router-link>
        <router-link to="/cart" class="hover:text-blue-600">Cart</router-link>
      </nav>
    </header>

    <section class="h-[80vh] w-full relative overflow-hidden">
      <div
        class="absolute inset-0 transition-all duration-700"
        :style="{ backgroundImage: `url(${currentSlide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
        @click="goToProduct(currentSlide.link)"
      ></div>
    </section>

    <section class="py-10 bg-gray-50">
      <h2 class="text-2xl font-bold text-center mb-6">Categories</h2>
      <div class="flex flex-wrap justify-center gap-6">
        <div v-for="category in categories" :key="category.name" class="flex flex-col items-center">
          <img :src="category.image" class="w-20 h-20 rounded-full object-cover mb-2" />
          <span class="text-sm font-medium">{{ category.name }}</span>
        </div>
      </div>
    </section>

    <section class="py-10">
      <h2 class="text-2xl font-bold text-center mb-6">Featured Products</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        <div
          v-for="product in featured"
          :key="product.id"
          class="border p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer"
          @click="$router.push(`/product/${product.id}`)"
        >
          <img :src="product.image" class="w-full h-40 object-cover mb-2 rounded" />
          <h3 class="font-semibold">{{ product.title }}</h3>
          <p class="text-sm text-gray-600">{{ product.price }}</p>
        </div>
      </div>
    </section>

    <router-view></router-view>

    <footer id="about" class="bg-gray-800 text-white text-center p-6">
      <p class="text-sm max-w-xl mx-auto">
        We are a small team passionate about delivering quality products and sharing knowledge through our blog.
        Our mission is to create a simple and delightful shopping experience for every customer.
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import matter from 'gray-matter'

const router = useRouter()
const currentSlideIndex = ref(0)
const slides = ref([])
const featured = ref([])
const categories = ref([])

const currentSlide = computed(() => slides.value[currentSlideIndex.value] || {})

const goToProduct = (link) => router.push(link)

const startSlider = () => {
  setInterval(() => {
    currentSlideIndex.value = (currentSlideIndex.value + 1) % slides.value.length
  }, 5000)
}

onMounted(async () => {
  const productFiles = import.meta.glob('/content/products/*.md', { as: 'raw' })
  const slideFiles = import.meta.glob('/content/slides/*.md', { as: 'raw' })
  const categoryFiles = import.meta.glob('/content/categories/*.md', { as: 'raw' })

  const featuredItems = []
  for (const path in productFiles) {
    const raw = await productFiles[path]()
    const { data } = matter(raw)
    if (data.featured) {
      featuredItems.push({
        id: path.split('/').pop().replace('.md', ''),
        title: data.title,
        image: data.image,
        price: data.price
      })
    }
  }
  featured.value = featuredItems.slice(0, 4)

  const slideList = []
  for (const path in slideFiles) {
    const raw = await slideFiles[path]()
    const { data } = matter(raw)
    slideList.push({ image: data.image, link: data.link })
  }
  slides.value = slideList

  const catList = []
  for (const path in categoryFiles) {
    const raw = await categoryFiles[path]()
    const { data } = matter(raw)
    catList.push({ name: data.name, image: data.image })
  }
  categories.value = catList

  startSlider()
})
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
</style>
