<template>
  <form @submit.prevent="submit" class="max-w-xl mx-auto text-left">
    <h2 class="text-2xl font-semibold mb-4">Contact Us</h2>

    <input
      v-model="name"
      type="text"
      placeholder="Your name"
      class="w-full mb-2 p-2 border rounded"
      required
    />

    <input
      v-model="email"
      type="email"
      placeholder="Your email"
      class="w-full mb-2 p-2 border rounded"
      required
    />

    <textarea
      v-model="message"
      placeholder="Your message"
      class="w-full mb-2 p-2 border rounded"
      rows="4"
      required
    ></textarea>

    <p v-if="error" class="text-red-600 mb-2">{{ error }}</p>
    <p v-if="success" class="text-green-600 mb-2">Message sent successfully!</p>

    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
      Send Message
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')
const success = ref(false)
const error = ref('')

const isValidEmail = (value) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)

const submit = async () => {
  error.value = ''
  success.value = false

  if (!isValidEmail(email.value)) {
    error.value = 'Please enter a valid email address.'
    return
  }

  if (message.value.trim().length < 10) {
    error.value = 'Message must be at least 10 characters long.'
    return
  }

  try {
    const res = await fetch('https://your-api-id.execute-api.region.amazonaws.com/prod/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        message: message.value
      })
    })

    if (!res.ok) throw new Error()
    success.value = true
    name.value = email.value = message.value = ''
  } catch {
    error.value = 'Failed to send message. Try again later.'
  }
}
</script>