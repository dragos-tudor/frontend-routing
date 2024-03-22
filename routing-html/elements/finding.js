import { getHtmlBody, getHtmlParentElement } from "./getting.js";

export const findHtmlAscendant = (elem, func) => {
  if(!elem) return
  if(func(elem)) return elem
  return findHtmlAscendant(getHtmlParentElement(elem), func)
}

export const findHtmlAscendants = (elem, func, elems = []) => {
  if(!elem) return elems
  if(func(elem)) elems.push(elem)
  return findHtmlAscendants(getHtmlParentElement(elem), func, elems)
}

export const findHtmlDescendant = (elem, func) => {
  if(func(elem)) return elem
  for(let index = 0; index < elem.children.length; index++) {
    const descendant = findHtmlDescendant(elem.children[index], func)
    if(descendant) return descendant
  }
}

export const findHtmlDescendants = (elem, func, elems = []) => {
  if(func(elem)) elems.push(elem)
  for(let index = 0; index < elem.children.length; index++)
    findHtmlDescendants(elem.children[index], func, elems)
  return elems
}

export const findHtmlRoot = (elem) =>
  globalThis["Deno"]?
    findHtmlAscendant(elem, (elem) => !getHtmlParentElement(elem)):
    getHtmlBody(elem)