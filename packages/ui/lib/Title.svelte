<script lang="ts">
  export let variant : "primary" | "secondary" | "tertiary";
  import {clearerColor } from "ui/utils/color"
</script>

<div class="Title">
  <div class={`Title__comment Title__comment--${variant}`}></div>
  <div class={`Title__comment Title__comment--${variant}`}></div>
  
  <div class='Title__text'>
    <div class={`Title__text--blur Title__text--blur--${variant}`}>
      <slot></slot>
    </div>
    <h1 class="Title__text--normal">
      <slot></slot>
    </h1>
  </div>
</div>
  
<style lang="scss">
  @use "../Styles/colors";
  @use "../Styles/utils";
  @use "../Styles/breakpoints";

  :root {
    --title-font-size: #{utils.sizing(8)};
    --title-comment-primary-color: #{colors.$yellow};
    --title-comment-secondary-color: #{colors.$purple};
    --title-comment-tertiary-color: #{colors.$orange};
  }

  .Title {
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: utils.sizing(2);
    justify-content: center;
    
  }

  .Title__comment {
    height: 100%;
    width: 18px;
    transform: skewX(30deg);

    &--primary {
      background: var(--title-comment-primary-color);
    }
    &--secondary {
      background: var(--title-comment-secondary-color);
    }
    &--tertiary {
      background: var(--title-comment-tertiary-color);
    }
  }

  .Title__text {
    color: colors.$white;
    font-size: var(--title-font-size);
    font-family: "Revamped", HelveticaNeue-Light,-apple-system,AppleSDGothicNeo-Regular,"lucida grande",tahoma,verdana,arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol",Noto Color Emoji,NotoColorEmoji,EmojiSymbols,Symbola,Noto,"Android Emoji",AndroidEmoji,"Arial Unicode MS","Zapf Dingbats",AppleColorEmoji,"Apple Color Emoji";
    padding-left: utils.sizing(1.5);
    margin: 0;
    position: relative;

    &--blur {
      position: absolute;
      left: utils.sizing(1.5);
      top: 0;
      opacity: 0.9;
      filter: blur(4px);

      &--primary {
        color: var(--title-comment-primary-color);
      }
      &--secondary {
        color: var(--title-comment-secondary-color);
      }
      &--tertiary {
        color: var(--title-comment-tertiary-color);
      }
    }

    &--normal {
      font-size: var(--title-font-size);
      margin: 0;
      position: relative;
    }
  }

  @media screen and (max-width: breakpoints.$md) {

    :root {
      --title-font-size: #{utils.sizing(5)};
    }

    .Title {
      grid-column-gap: utils.sizing(1);
    }

    .Title__comment {
      height: 85%;
      width: 12px;
    }

  }
</style>