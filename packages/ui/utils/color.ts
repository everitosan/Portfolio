import Color from "colorjs.io"

export function clearerColor (color: string):string {
  let base = new Color(color)
  base.lighten(30)
  return base.toString()
}