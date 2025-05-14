import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductList from '../components/ProductList.vue'
import { createRouter, createWebHistory } from 'vue-router'

describe('ProductList.vue', () => {
  it('renders list of products', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [] // nie potrzebujemy tras do testu listy
    })

    const wrapper = mount(ProductList, {
      global: {
        plugins: [router]
      },
      data() {
        return {
          products: [
            { id: '1', title: 'Test Product', price: '$99', image: '/test.jpg' }
          ]
        }
      }
    })

    expect(wrapper.text()).toContain('Test Product')
    expect(wrapper.findAll('img')).toHaveLength(1)
  })
})