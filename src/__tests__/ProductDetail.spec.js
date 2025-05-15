import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductDetail from '../view/ProductDetail.vue'
import { createRouter, createWebHistory } from 'vue-router'

describe('ProductDetail.vue', () => {
  it('fetches and displays product details', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            title: 'Product X',
            description: 'Great product!',
            price: '$123',
            image: '/x.jpg'
          })
      })
    )

    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/product/:id', component: ProductDetail }]
    })

    router.push('/product/123')
    await router.isReady()

    const wrapper = mount(ProductDetail, {
      global: {
        plugins: [router]
      }
    })

    await new Promise(resolve => setTimeout(resolve, 10))

    expect(wrapper.text()).toContain('Product X')
    expect(wrapper.text()).toContain('$123')
  })
})