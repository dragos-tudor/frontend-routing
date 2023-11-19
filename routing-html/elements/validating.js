import { isHtmlElement } from "./verifying.js"

export const validateHtmlElement = (elem) => isHtmlElement(elem)? "": "Element type should be HTML element."