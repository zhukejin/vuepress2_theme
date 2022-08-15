<template>
  <div class="article-wrapper">
    Home
  </div>
</template>

<script lang="ts" setup>
import {useBlogCategory, useBlogType} from 'vuepress-plugin-blog2/lib/client'
// import ParentLayout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";
const type = useBlogType('posts')

console.log(type.value)
</script>
