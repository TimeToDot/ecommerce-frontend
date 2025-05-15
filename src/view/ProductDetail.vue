<template>
    <div class="p-6 max-w-2xl mx-auto">
      <img v-if="product.image" :src="product.image" alt="product.title" class="w-full max-w-lg mx-auto mb-6" />
      <h1 class="text-2xl font-bold mb-2">{{ product.title }}</h1>
      <p class="text-gray-600 mb-4">{{ product.description }}</p>
      <p class="text-xl text-green-600">{{ product.price }}</p>
    </div>
  </template>

  <script setup>
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const product = ref({})

  onMounted(async () => {
    const id = route.params.id
    try {
      const res = await fetch(`https://your-api-id.execute-api.eu-central-1.amazonaws.com/prod/products/${id}`)
      if (!res.ok) throw new Error('Failed to fetch product')
      product.value = await res.json()
    } catch (err) {
      product.value = {
        title: 'Product not found',
        description: '',
        price: '',
        image: ''
      }
    }
  })
  </script>