import { defineUserConfig } from "@vuepress/cli";
import {customTheme} from "./theme";

const base = <"/" | `/${string}/`>process.env.BASE || "/";

export default defineUserConfig({
    base,

    title: "凤歌笑孔丘",
    description: "前端|JavaScript|Typescript",

    theme: customTheme({
        logo: "/logo.svg",

        repo: "",

        // navbar: [
        //     "/",
        //     {
        //         text: "Article",
        //         link: "/article/",
        //     },
        //     {
        //         text: "Category",
        //         link: "/category/",
        //     },
        //     {
        //         text: "Tag",
        //         link: "/tag/",
        //     },
        //     {
        //         text: "Timeline",
        //         link: "/timeline/",
        //     },
        // ],
    }),
});