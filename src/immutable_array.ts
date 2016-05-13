export default class ImmutableArray<T> {
  private _array: T[]
  
  constructor(array: T[]) {
    this._array = Object.freeze(array)
  }
  
  length() { return this._array.length }
  
  get(index:number) { return this._array[index] }
  
  append(object:T) {
    const newArray = this._array.slice()
    newArray.push(object)
    return new ImmutableArray<T>(newArray)
  }
  
  replace(replacement: T, predicate: (t:T) => boolean) {
    return this.map((item) => predicate(item) ? replacement : item)
  }
  
  map(action: (i:T) => T) { return new ImmutableArray<T>(this._array.map(action)) }
  
  forEach(action: (value:T, index:number) => void) { this._array.forEach(action) }
}