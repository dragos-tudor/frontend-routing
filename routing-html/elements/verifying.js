
export const isHtmlElement = (elem) => elem.nodeType === 1

export const isDisplayedHtmlElement = (elem) => elem.style.display == "display"

export const isNotDisplayedHtmlElement = (elem) => elem.style.display == "none"