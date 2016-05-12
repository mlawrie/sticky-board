export default class Immutable<T> {
  private _instance: T
  
  constructor(instance: T) {
    this._instance = Object.freeze(instance)
  }
  
  modify(modifier: (t:T) => void) {
    const clone = Object.assign({}, this._instance)
    modifier(clone)
    return new Immutable<T>(clone)
  }
  
  get() { return this._instance }
}