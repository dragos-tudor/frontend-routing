
export const addToHistory = (history, url, state = {}) => history?.pushState(state, "", url)