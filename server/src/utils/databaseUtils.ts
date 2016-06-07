export const firstResult = (results: [any]) => {
  if(results.length > 0) {
    return results[0]
  }
  throw('record not found')
}

export const filterKeys = (obj:any, whitelist:[string]) => {
  const validKeys = Object.keys(obj).filter((k) => whitelist.indexOf(k) != -1)
  const newObj:any = {}
  validKeys.forEach((key) => newObj[key] = obj[key])
  return newObj  
}

