import {App} from '@vuepress/core'

export const generatePosts = () =>
  (app: App) => {
    console.log(app)

    return {
      name: 'vuepress-plugin-generateposts',

      // 渲染页面的时候提取所有 pages 信息
      extendsPage: async (page: any) => {

        // 只有 post 文件夹内的页面，认为是文章
        if (page.path.startsWith('/post')) {
          // console.log(page)
        }
      }
    }
  }
