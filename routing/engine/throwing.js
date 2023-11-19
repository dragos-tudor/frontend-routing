
export const throwError = (message) => { if(!message) return false; throw new Error(message); }

export const throwErrors = (messages) => { if(!messages.length) return false; throw new Error(messages.join(",")); }