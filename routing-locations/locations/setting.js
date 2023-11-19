
const getDefaultLocation = (url) => new URL("http://localhost" + url)

export const setLocation = (elem, url) =>
  elem.ownerDocument.__location = globalThis.location ?? getDefaultLocation(url)