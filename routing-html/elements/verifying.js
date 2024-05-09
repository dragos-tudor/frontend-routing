
export const existsHtmlElement = (elem) => !!elem

export const existsHtmlElements = (elems) => elems.length !== 0

export const isHiddenHtmlElement = (elem) => elem.hidden

export const isHtmlElement = (elem) => elem.nodeType === 1

export const isShownHtmlElement = (elem) => elem.style.display != "none"