import { reactive, watch } from 'vue'

const saved = localStorage.getItem('cart')

export const cart = reactive({
  items: saved ? JSON.parse(saved) : [],

  add(product) {
    const existing = cart.items.find(i => i.id === product.id)
    existing ? existing.quantity++ : cart.items.push({ ...product, quantity: 1 })
  },

  remove(id) {
    cart.items = cart.items.filter(i => i.id !== id)
  },

  clear() {
    cart.items = []
  },

  total() {
    return cart.items.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('$', '').trim())
      return sum + price * item.quantity
    }, 0)
  }
})

watch(() => cart.items, () => {
  localStorage.setItem('cart', JSON.stringify(cart.items))
}, { deep: true })
