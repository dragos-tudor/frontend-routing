
export const isArrayString = (text) => text.startsWith("[") && text.endsWith("]")

export const isDateString = (text) => !isNaN(Date.parse(text))

export const isFloatString = (text) => !isNaN(text) && !isNaN(parseFloat(text))

export const isIntegerString = (text) => !isNaN(text) && !isNaN(parseInt(text))

export const isObjectString = (text) => text.startsWith("{") && text.endsWith("}")