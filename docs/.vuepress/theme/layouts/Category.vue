<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <div class="category-wrapper">
          <RouterLink
            v-for="({ items, path }, name) in categoryMap.map"
            :key="name"
            :to="path"
            class="category"
          >
            {{ name }}
            <span class="category-num">
              {{ items.length }}
            </span>
          </RouterLink>
        </div>
        <ArticleList :items="categoryMap.currentItems" />
      </main>
    </template>
  </ParentLayout>
</template>
<script setup lang="ts">
import { useBlogCategory } from "vuepress-plugin-blog2/lib/client";
import ArticleList from "../components/ArticleList.vue";
// import ParentLayout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";
import ParentLayout from "../layouts/Layout.vue";
const categoryMap = useBlogCategory("category");

// console.log(categoryMap)
</script>
