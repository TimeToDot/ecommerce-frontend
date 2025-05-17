// src/components/Blog.vue
<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Blog</h1>
    <article v-for="post in posts" :key="post.slug" class="mb-8 border-b pb-4">
      <h2 class="text-xl font-semibold">{{ post.title }}</h2>
      <p class="text-gray-600 text-sm mb-2">{{ post.date }}</p>
      <div class="prose" v-html="post.body"></div>
    </article>
  </div>
</template>

<script>
import matter from 'gray-matter'

export default {
  data() {
    return { posts: [] };
  },
  async mounted() {
    const files = import.meta.glob('/content/blog/*.md', { as: 'raw' });
    const posts = [];
    for (const path in files) {
      const raw = await files[path]();
      const { data, content } = matter(raw);
      posts.push({ ...data, body: marked.parse(content), slug: path });
    }
    this.posts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
}
</script>

<style scoped>
.prose :deep(p) {
  margin: 0.5rem 0;
}
</style>
