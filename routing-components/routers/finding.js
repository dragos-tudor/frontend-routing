import { findHtmlAscendant } from "../../routing-html/mod.js";
import { isHtmlRouter } from "./verifying.js";

export const findRouter = (elem) => findHtmlAscendant(elem, isHtmlRouter)