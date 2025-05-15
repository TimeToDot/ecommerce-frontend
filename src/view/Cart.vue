<template>
  <section class="max-w-2xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Your Cart</h1>

    <div v-if="cart.items.length">
      <ul class="divide-y divide-gray-200 mb-4">
        <li v-for="item in cart.items" :key="item.id" class="py-3 flex justify-between items-center">
          <div>
            <p class="font-semibold">{{ item.title }}</p>
            <p class="text-sm text-gray-600">Quantity: {{ item.quantity }}</p>
          </div>
          <div class="text-right">
            <p class="text-green-600">{{ item.price }}</p>
            <button @click="remove(item.id)" class="text-red-500 text-sm">Remove</button>
          </div>
        </li>
      </ul>

      <div class="mb-4">
        <p class="text-lg font-semibold">Total: ${{ cart.total().toFixed(2) }}</p>
      </div>

      <div class="mb-4">
        <input v-model="name" placeholder="Your name" class="w-full mb-2 p-2 border rounded" required />
        <input v-model="email" placeholder="Your email" type="email" class="w-full mb-2 p-2 border rounded" required />
      </div>

      <div class="flex gap-4">
        <button @click="checkout" class="bg-blue-600 text-white px-4 py-2 rounded">Checkout</button>
        <button @click="cart.clear()" class="bg-gray-300 text-black px-4 py-2 rounded">Clear</button>
      </div>

      <p v-if="success" class="text-green-600 mt-4">Order submitted successfully!</p>

      <div v-if="success" class="bg-green-50 border border-green-300 text-green-700 p-4 rounded mt-4 text-left">
        <h2 class="text-lg font-semibold mb-2">Dziękujemy za zamówienie!</h2>
        <p class="mb-1">Prosimy o wykonanie przelewu na poniższe dane:</p>
        <p><strong>Bank:</strong> 12 3456 7890 1234 5678 9012 3456</p>
        <p><strong>Odbiorca:</strong> Twoja Firma Sp. z o.o.</p>
        <p><strong>Tytuł przelewu:</strong> Zamówienie na nazwisko {{ name }}</p>
        <p class="mt-2 text-sm text-gray-500">Zamówienie zostanie zrealizowane po zaksięgowaniu płatności.</p>
      </div>

      <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
    </div>

    <p v-else class="text-gray-600">Your cart is empty.</p>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { cart } from '@/stores/cart'

const name = ref('')
const email = ref('')
const success = ref(false)
const error = ref('')

const remove = id => cart.remove(id)

const isValidEmail = (value) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)

const checkout = async () => {
  error.value = ''
  success.value = false

  if (name.value.trim().length < 2) {
    error.value = 'Name must be at least 2 characters.'
    return
  }

  if (!isValidEmail(email.value)) {
    error.value = 'Please enter a valid email address.'
    return
  }

  if (!confirm(`Do you want to place the order for $${cart.total().toFixed(2)}?`)) return

  try {
    const res = await fetch('https://your-api-id.execute-api.region.amazonaws.com/prod/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        items: cart.items
      })
    })
    if (!res.ok) throw new Error()
    success.value = true
    name.value = email.value = ''
    cart.clear()
  } catch {
    error.value = 'Failed to submit order. Please try again later.'
  }
}
</script>