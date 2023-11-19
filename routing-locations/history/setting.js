import { getHistoryPolyfill } from "./polyfilling.js"

export const setHistory = (elem) =>
  elem.ownerDocument.__history = globalThis.history ?? getHistoryPolyfill()