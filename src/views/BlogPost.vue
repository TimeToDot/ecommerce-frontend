<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold mb-2">{{ post.title }}</h1>
    <p class="text-gray-500 text-sm mb-4">{{ post.date }}</p>
    <article class="prose prose-lg max-w-none" v-html="post.body"></article>
    <div class="mt-8">
      <router-link to="/blog" class="text-blue-600 hover:underline">← Back to blog</router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'

const route = useRoute()
const post = ref({ title: '', date: '', body: '' })

onMounted(async () => {
  try {
    const slug = route.params.slug
    const file = await import(`/content/blog/${slug}.md?raw`)
    const raw = file.default
    const title = raw.match(/^---[\s\S]*?title: ['"]?(.+?)['"]?$/m)?.[1] || ''
    const date = raw.match(/^---[\s\S]*?date: ['"]?(.+?)['"]?$/m)?.[1] || ''
    const content = raw.replace(/^---[\s\S]*?---/, '').trim()
    post.value = {
      title,
      date,
      body: marked.parse(content)
    }
    document.title = `${title} | Fanaberia Blog`

    const meta = document.querySelector('meta[name="description"]') || document.createElement('meta')
    meta.name = 'description'
    meta.content = content.substring(0, 160)
    document.head.appendChild(meta)
  } catch (e) {
    console.warn('Failed to load blog post:', e)
  }
})
</script>

<style scoped>
.prose :deep(p) {
  margin: 1rem 0;
}
</style>