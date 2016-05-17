const objectAssign = require('object-assign')

export default <T, U>() => {
  return (original: T, mutator: U):T => {
    let newObject: any = objectAssign({}, original)
    Object.keys(mutator)
      .filter((key) => typeof (<any>mutator)[key] !== 'undefined' && (<any>mutator)[key] !== null)
      .forEach((key) => { newObject[key] = (<any>mutator)[key] })
    return newObject as T
  }
}
