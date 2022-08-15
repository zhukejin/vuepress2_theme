<template>
  <div class="article-wrapper">
    <div v-if="!items.length">Nothing in here.</div>
    <article class="article" v-for="{ info, path } in items">
      <header class="title">
        <RouterLink :to="path">
          {{ info.title }}
        </RouterLink>
      </header>
      <hr />
      <div class="article-info">
        <span v-if="info.author" class="author">Author: {{ info.author }}</span>
        <span v-if="info.date" class="date"
        >Date: {{ new Date(info.date).toLocaleDateString() }}</span
        >
        <span v-if="info.category" class="category"
        >Category: {{ info.category.join(",") }}</span>
        <span v-if="info.tag" class="tag">Tag: {{ info.tag.join(",") }}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>
