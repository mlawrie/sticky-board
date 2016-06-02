export class BodyEventListener {
  add(type: string, f: (ev: UIEvent) => any) {
    document.body.addEventListener(type, f)
  }
  remove(type: string, f: (ev: UIEvent) => any) {
    document.body.removeEventListener(type, f)
  }
}
