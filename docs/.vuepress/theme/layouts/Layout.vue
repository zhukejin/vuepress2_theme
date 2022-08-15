<script setup lang="ts">
import {DefaultThemePageFrontmatter} from 'vuepress'
import {usePageData, usePageFrontmatter} from '@vuepress/client'

import Home from '../components/Home.vue'
import Page from '../components/Page.vue'
import PageMenu from '../components/PageMenu.vue'
import Widgets from '../components/Widgets.vue'
import SiteMenu from '../components/SiteMenu.vue'

const page = usePageData()
const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>()

// console.log(page)

</script>

<template>
  <div class="theme-container">


    <!--    <div class="sidebar-mask" @click="toggleSidebar(false)" />-->


    <aside class="left-side">
      <slot name="sidebar">
        <SiteMenu />
      </slot>
    </aside>

    <main class="main-content">
      <slot name="page">
        <Home v-if="page.path === '/'"/>
        <!--
        @before-enter="onBeforeEnter"
                @before-leave="onBeforeLeave"
        -->
        <Transition
          v-else-if="page.path.startsWith('/posts/')"
          name="fade-slide-y"
          mode="out-in"
        >
          <Page :key="page.path" />
        </Transition>
      </slot>
    </main>

    <aside class="right-side">
      <slot name="sidebar">
<!--        如果是内页-->
        <PageMenu v-if="page.path.startsWith('/posts/')" />

        <Widgets v-else />

      </slot>
    </aside>
  </div>
</template>


<style lang="less">
@import '../static/styles/common.less';

.theme-container {
  display: flex;
}

aside {
  flex-shrink: 0;
  flex-grow: 0;
}

.main-content {
  flex: 1;
  padding: 24px 40px;
}

.left-side {
  width: 16.66667%;
  background: linear-gradient(to right, #1a2433 0%, #253449 80%, #253449 100%);
  color: #fff;
}

.right-side {
  width: 20%;
  background-color: #fdfdfd;
  border-left: 1px solid #f6f6f6;
}


</style>
