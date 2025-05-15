<template>
    <section class="max-w-6xl mx-auto p-6">
      <h1 class="text-2xl font-bold mb-4">Shop</h1>
      <div class="flex flex-wrap gap-3 mb-6">
        <button
          v-for="cat in uniqueCategories"
          :key="cat"
          @click="activeCategory = cat"
          :class="['px-4 py-2 rounded', activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-200']"
        >
          {{ cat }}
        </button>
        <button v-if="activeCategory" class="text-sm text-red-500" @click="activeCategory = ''">Clear</button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="border p-4 rounded shadow hover:shadow-md cursor-pointer"
          @click="$router.push(`/product/${product.id}`)"
        >
          <img :src="product.image" class="w-full h-40 object-cover rounded mb-2" />
          <h2 class="font-semibold">{{ product.title }}</h2>
          <p class="text-sm text-gray-600">{{ product.price }}</p>
        </div>
      </div>
    </section>
  </template>

  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import matter from 'gray-matter'

  const products = ref([])
  const activeCategory = ref('')

  const filteredProducts = computed(() => {
    return activeCategory.value
      ? products.value.filter(p => p.category === activeCategory.value)
      : products.value
  })

  const uniqueCategories = computed(() => [...new Set(products.value.map(p => p.category))])

  onMounted(async () => {
    const files = import.meta.glob('/content/products/*.md', { as: 'raw' })
    for (const path in files) {
      const raw = await files[path]()
      const { data } = matter(raw)
      products.value.push({
        id: path.split('/').pop().replace('.md', ''),
        title: data.title,
        image: data.image,
        price: data.price,
        category: data.category || 'General'
      })
    }
  })
  </script>
  