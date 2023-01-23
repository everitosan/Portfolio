import Color from "colorjs.io"


export function weberColor (color: string, percentage: number):string {
  let base = new Color(color)
  base.set("hsl.h", base.hsl[0] - 70)
  base.set("hsl.l", base.hsl[2] + 10)
  return base.toString()
}

export function clearerColor (color: string, percentage: number):string {
  let base = new Color(color)
  base.lighten(percentage)
  return base.toString()
}

export function darkerColor (color: string):string {
  let base = new Color(color)
  base.darken(.60)
  return base.toString()
}