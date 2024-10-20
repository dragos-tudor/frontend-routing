import { getStringType } from "./getting.js"

export const fromStringType = (text) => {
  if(typeof text !== 'string') return text
  switch(text){
    case "": return ""
    case "true": return true
    case "false": return false
    case "null": return null
    case "undefined": return undefined
  }
  switch(getStringType(text)){
    case "object": return JSON.parse(text)
    case "array": return JSON.parse(text)
    case "float": return parseFloat(text)
    case "integer": return parseInt(text)
    case "date": return new Date(Date.parse(text))
    default: return text
  }
}

