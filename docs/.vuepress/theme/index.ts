import {path} from '@vuepress/utils'
import {blogPlugin} from 'vuepress-plugin-blog2'

import type {Theme} from '@vuepress/core'
import {generatePosts} from './plugins/generatePosts'

const {shikiPlugin} = require('@vuepress/plugin-shiki')
const {activeHeaderLinksPlugin} = require('@vuepress/plugin-active-header-links')
const {tocPlugin} = require('@vuepress/plugin-toc')

// @ts-ignore
export const customTheme = (options): Theme => ({
  name: 'custom-theme',

  // 定义各种页面的布局
  layouts: {
    Article: path.resolve(__dirname, './layouts/Article.vue'),
    Category: path.resolve(__dirname, './layouts/Category.vue'),
    Tag: path.resolve(__dirname, './layouts/Tag.vue'),
    Timeline: path.resolve(__dirname, './layouts/Timeline.vue'),
    Layout: path.resolve(__dirname, './layouts/Layout.vue'),
  },

  plugins: [
    generatePosts(),
    shikiPlugin({
      theme: 'slack-dark'
    }),
    activeHeaderLinksPlugin({
      // 配置项
    }),
    tocPlugin({
      // 配置项
    }),
    blogPlugin({
      // only files under posts are articles

      // @ts-ignore
      filter: ({filePathRelative}) =>
        filePathRelative && filePathRelative.startsWith('posts/'),

      // getting article info
      // getInfo: ({frontmatter, title}) => ({
      //   title,
      //   author: frontmatter.author || '',
      //   date: frontmatter.date || null,
      //   category: frontmatter.category || [],
      //   tag: frontmatter.tag || [],
      // }),

      category: [
        {
          key: 'categories',
          getter: (page) => <string[]>page.frontmatter.categories || [],
          layout: 'Category',
          itemLayout: 'Category',
          frontmatter: () => ({title: 'Categories', sidebar: false}),
          itemFrontmatter: (name) => ({
            title: `Category ${name}`,
            sidebar: false,
          }),
        },
        {
          key: 'tag',
          getter: (page) => <string[]>page.frontmatter.tags || [],
          layout: 'Tag',
          itemLayout: 'Tag',
          frontmatter: () => ({title: 'Tags', sidebar: false}),
          itemFrontmatter: (name) => ({
            title: `Tag ${name}`,
            sidebar: false,
          }),
        },
      ],

      type: [
        {
          key: 'posts',
          // 返回所有页面
          filter: page => {
            return page.path.startsWith('posts/')
          },
          // layout: 'Article',
          frontmatter: () => ({title: 'Home'}),
          // sort pages with time and sticky
          sorter: (pageA, pageB) => {
            if (pageA.frontmatter.sticky && pageB.frontmatter.sticky) { // @ts-ignore
              return pageB.frontmatter.sticky - pageA.frontmatter.sticky
            }

            if (pageA.frontmatter.sticky && !pageB.frontmatter.sticky)
              return -1

            if (!pageA.frontmatter.sticky && pageB.frontmatter.sticky) return 1

            if (!pageB.frontmatter.date) return 1
            if (!pageA.frontmatter.date) return -1

            return (
              new Date(pageB.frontmatter.date).getTime() -
              new Date(pageA.frontmatter.date).getTime()
            )
          },
        },
        {
          key: 'article',
          // remove archive articles
          filter: (page) => !page.frontmatter.archive,
          path: '/article/',
          layout: 'Article',
          frontmatter: () => ({title: 'Articles'}),
          // sort pages with time and sticky
          sorter: (pageA, pageB) => {
            if (pageA.frontmatter.sticky && pageB.frontmatter.sticky) { // @ts-ignore
              return pageB.frontmatter.sticky - pageA.frontmatter.sticky
            }

            if (pageA.frontmatter.sticky && !pageB.frontmatter.sticky)
              return -1

            if (!pageA.frontmatter.sticky && pageB.frontmatter.sticky) return 1

            if (!pageB.frontmatter.date) return 1
            if (!pageA.frontmatter.date) return -1

            return (
              new Date(pageB.frontmatter.date).getTime() -
              new Date(pageA.frontmatter.date).getTime()
            )
          },
        },
        {
          key: 'timeline',
          // only article with date should be added to timeline
          // @ts-ignore
          filter: (page) => page.frontmatter.date,
          // sort pages with time
          // sorter: (pageA, pageB) =>
          //   new Date(pageB.frontmatter.date).getTime() -
          //   new Date(pageA.frontmatter.date).getTime(),
          path: '/timeline/',
          layout: 'Timeline',
          frontmatter: () => ({title: 'Timeline', sidebar: false}),
        },
      ],
      // hotReload: true,
    }),
  ]
})
