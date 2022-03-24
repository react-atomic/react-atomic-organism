import { marked } from "marked";
import highlight from "syntax-colorer";
marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight,
});
export default marked;
