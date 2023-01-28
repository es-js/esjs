import {MarkdownOptions} from "vitepress";

export const markdown = (highlighter) => {
  return {
    highlight: (str, lang) => {
      const preRE = /^<pre.*?>/

      return highlighter.codeToHtml(str, { lang }).replace(preRE, '<pre v-pre>')
    },
  } as MarkdownOptions
}
