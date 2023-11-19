import { PathDelimiter } from "../paths/PathDelimiter.js"

export const trimUrl = (url, char = PathDelimiter) => {
  if(!url.length) return url
  if(url.startsWith(char) && url.endsWith(char)) return url.substr(1, url.length - 1)
  if(url.startsWith(char)) return url.substr(1)
  if(url.endsWith(char)) return url.substr(0, url.length - 1)
  return url
}