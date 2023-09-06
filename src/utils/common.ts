export function removeEmptyProperties(obj: Record<string, any>, attrs: string[] = []) {
  if (!obj) return {}
  if (typeof obj != "object") return {}

  if (attrs.length === 0) {
    attrs = Object.keys(obj)
  }
  const res: any = {}

  attrs.forEach((key) => {
    if (obj[key]) {
      res[key] = obj[key]
    }
  })

  return res
}
