<script lang="ts">
  import { onMount } from "svelte"

  let hovered = false

  const onMouseEnter = () => {
    hovered = true
  }

  const onMouseLeave = () => {
    hovered = false
  }

  onMount(() => {
    // alert(window.innerWidth)
  })


</script>

  
<div 
  on:mouseenter={onMouseEnter}
  on:mouseleave={onMouseLeave}
  class="Logo" 
  class:animated={hovered}  >
  <div class="Logo--large">
    ███████╗██╗░░░██╗███████╗░██████╗░█████╗░███╗░░██╗ <br>
    ██╔════╝██║░░░██║██╔════╝██╔════╝██╔══██╗████╗░██║ <br>
    █████╗░░╚██╗░██╔╝█████╗░░╚█████╗░███████║██╔██╗██║ <br>
    ██╔══╝░░░╚████╔╝░██╔══╝░░░╚═══██╗██╔══██║██║╚████║ <br>
    ███████╗░░╚██╔╝░░███████╗██████╔╝██║░░██║██║░╚███║ <br>
    ╚══════╝░░░╚═╝░░░╚══════╝╚═════╝░╚═╝░░╚═╝╚═╝░░╚══╝ <br>
  </div>
</div>

<style lang="scss" >
  @use "../Styles/colors";
  @use "../Styles/utils";
  @use "../Styles/breakpoints";

  :root {
    --logo-color-1: #{colors.$pink-sweet};
    --logo-color-2: #{colors.$blue-sweet};
    --logo-color-1-start: 0%;
    --logo-color-2-start: 100%;
  }

  @keyframes textShine {
    to {
      background-position: 200%;
    }
  }

  .Logo {
    background: radial-gradient(circle, var(--logo-color-1) var(--logo-color-1-start), var(--logo-color-2) var(--logo-color-2-start));
    background-clip: text;
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    border-radius: 1px;
    color: colors.$white;
    font-family: HelveticaNeue-Light,-apple-system,AppleSDGothicNeo-Regular,"lucida grande",tahoma,verdana,arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol",Noto Color Emoji,NotoColorEmoji,EmojiSymbols,Symbola,Noto,"Android Emoji",AndroidEmoji,"Arial Unicode MS","Zapf Dingbats",AppleColorEmoji,"Apple Color Emoji";
    font-size: 4px;
    padding: utils.sizing(.5) utils.sizing(2) utils.sizing(0) utils.sizing(2);
    width: fit-content;

    &.animated {
      animation: textShine 1s ease-in-out infinite;
    }

  }
  
  @media screen and (max-width: breakpoints.$sm) {
    .Logo {
      font-size: 3px;
    }
  }
    
</style>