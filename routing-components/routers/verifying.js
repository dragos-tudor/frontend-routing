import { getHtmlName } from "../../routing-html/mod.js"

export const isHtmlRouter = (elem) => getHtmlName(elem) === "router"