export default class ImmutableClone<T, U> {
  constructor(private original:T, private mutator: U) { }
  get():T {
    let newObject: any = Object.assign({}, this.original)
    Object.keys(this.mutator)
      .filter((key) => typeof (<any>this.mutator)[key] !== 'undefined' && (<any>this.mutator)[key] !== null)
      .forEach((key) => { newObject[key] = (<any>this.mutator)[key] })
    return newObject as T
  }
}

