<script lang="ts" context="module" >
  
  export type ProjectCardProps = {
    name: string,
    url: string,
    description: string
  }
  
</script>

<script lang="ts" >
  import { darkerColor, clearerColor, weberColor } from "../utils/color"
  
  export let data: ProjectCardProps
  export let color: string = "#6B03EF"

  const lightColor = clearerColor(color, 0.4)
  const darkColor = darkerColor(color)


  const onMouseEnter = () => {
    initialLetterColor = `url(#${getGradientId()})`
    bgColor = `url(#${getGradientId()})`
  }
  
  const onMouseLeave = () => {
    initialLetterColor = lightColor
    bgColor = color
  }

  const getGradientId = () => {
    const from = color.replaceAll("#", "")
    return `gradient-bg-${from}`
  }

  // initial values for colors
  let initialLetterColor = lightColor
  let bgColor = color

</script>

<div class="ProjectCard" on:mouseenter={onMouseEnter} on:mouseleave={onMouseLeave}>
  <a target="_blank" rel="noreferrer" href={data.url} >
    <svg width="125" height="176" viewBox="0 0 200 282" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path stroke={bgColor} stroke-width="8" d="M0 265.059V0.518494H193.333L200 7.03427V117.528L186.667 130.56V282H17.3333L0 265.059Z" />
      <path fill-rule="evenodd" clip-rule="evenodd" fill={darkColor} d="M7.40741 6.19135H6.90741V6.69135V257.309V257.516L7.05386 257.662L23.1032 273.712L23.2497 273.858H23.4568H180.247H180.747V273.358V125.417L192.946 113.218L193.093 113.071V112.864V12.8642V12.6571L192.946 12.5106L186.773 6.33779L186.627 6.19135H186.42H7.40741ZM7.90741 225.21V7.19135H186.213L192.093 13.0713V112.657L179.893 124.856L179.747 125.003V125.21V225.21H32.0988V230.148H9.87654V225.21H7.90741ZM7.90741 244.963V252.37H17.284V244.963H7.90741Z"/>
      <text class="initialL" font-family="Hacked" font-size="150px"  x="50%" y="60%" text-anchor="middle" style={`fill: ${initialLetterColor};`} > {data.name.substring(0, 1)} </text>  
      <text font-family="Saira Condensed" font-size="36px"  x="50%" y="94%" text-anchor="middle" style="fill: #fff;" > {data.name} </text>  
      <defs>
        <linearGradient id={`${getGradientId()}`} x1="-2.5" y1="1" x2="118" y2="184" gradientUnits="userSpaceOnUse">
          <stop stop-color={color}/>
          <stop offset="0.534" stop-color={weberColor(color, 0.2)}/>
          <stop offset="1" stop-color={color}/>
        </linearGradient>
      </defs>
    </svg>
  </a>  
</div>

<style lang="scss">
</style>