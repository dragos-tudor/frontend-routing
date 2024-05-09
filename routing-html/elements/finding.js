import { getHtmlBody, getHtmlParentElement } from "./getting.js"
import { flatHtmlChildren } from "./flattening.js"
import { existsHtmlElement, existsHtmlElements } from "./verifying.js"

const findHtmlElement = (elems, func) => elems.find(func)

const findsHtmlDescendant = (elems, func) =>
  findHtmlElement(elems, func) ||
  (existsHtmlElements(elems)?
    findsHtmlDescendant(flatHtmlChildren(elems), func):
    undefined)

const findsHtmlDescendants = (elems, func, result = []) =>
  (!existsHtmlElements(elems) && result) ||
  findsHtmlDescendants(flatHtmlChildren(elems), func, [...result, ...elems.filter(func)])

export const findHtmlAscendant = (elem, func) =>
  (existsHtmlElement(elem) || undefined) &&
  (func(elem) && elem ||
   findHtmlAscendant(getHtmlParentElement(elem), func))

export const findHtmlDescendant = (elem, func) =>
  findsHtmlDescendant([elem], func)

export const findHtmlDescendants = (elem, func) =>
  findsHtmlDescendants([elem], func)

export const findHtmlRoot = (elem) =>
  globalThis["Deno"]?
    findHtmlAscendant(elem, (elem) => !getHtmlParentElement(elem)):
    getHtmlBody(elem)