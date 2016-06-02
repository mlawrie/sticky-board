export class Timer {
  setTimeout(f:() => void, ms:number): NodeJS.Timer {
    return global.setTimeout(f, ms)
  } 
  clearTimeout(t: NodeJS.Timer | undefined) {
    clearTimeout(t!)
  }
}