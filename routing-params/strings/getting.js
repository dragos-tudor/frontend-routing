import { isArrayString, isFloatString, isIntegerString, isObjectString, isDateString } from "./verifying.js"

export const getStringType = (text) => {
  if(isObjectString(text)) return "object"
  if(isArrayString(text)) return "array"
  if(isFloatString(text)) return "float"
  if(isIntegerString(text)) return "integer"
  if(isDateString(text)) return "date"
}


