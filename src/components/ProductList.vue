<template>
    <section id="shop" class="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="product in products"
        :key="product.id"
        class="border p-4 rounded shadow hover:shadow-md transition cursor-pointer"
        @click="goToProduct(product.id)"
      >
        <img :src="product.image" :alt="product.title" class="w-full h-40 object-cover mb-2 rounded" />
        <h3 class="text-lg font-semibold">{{ product.title }}</h3>
        <p class="text-gray-600">{{ product.price }}</p>
      </div>
    </section>
  </template>

  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const products = ref([])

  const loadProducts = async () => {
    try {
      const res = await fetch('https://your-api-id.execute-api.eu-central-1.amazonaws.com/prod/products')
      if (!res.ok) throw new Error('Fetch failed')
      const data = await res.json()
      products.value = data.slice(0, 50)
    } catch (err) {
      console.error('Error loading products:', err.message)
    }
  }

  const goToProduct = id => {
    router.push(`/product/${id}`)
  }

  onMounted(loadProducts)
  </script>