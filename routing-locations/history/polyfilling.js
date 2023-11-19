
export const getHistoryPolyfill = (hrefs = []) => Object.freeze({ hrefs, pushState: (_, __, href) => hrefs.push(href) })