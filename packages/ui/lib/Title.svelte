<script lang="ts">
  export let variant : "primary" | "secondary" | "tertiary";
</script>

<div class="Title">
  <div class={`Title__comment Title__comment--${variant}`}></div>
  <div class={`Title__comment Title__comment--${variant}`}></div>
  
  <div class='Title__text'>
    <h1 class={`Title__text--normal Title__text--normal--${variant}`}>
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
    --title-comment-primary-color-transparent: #{colors.$yellow-transparent};
    --title-comment-secondary-color: #{colors.$purple};
    --title-comment-secondary-color-transparent: #{colors.$purple-transparent};
    --title-comment-tertiary-color: #{colors.$orange};
    --title-comment-tertiary-color-transparent: #{colors.$orange-transparent};
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


    &--normal {
      font-size: var(--title-font-size);
      margin: 0;
      position: relative;
      &--primary {
        text-shadow: 
          2px 0px 4px var(--title-comment-primary-color-transparent),
          -2px 0px 4px var(--title-comment-primary-color-transparent);
      }
      &--secondary {
        text-shadow: 
          2px 0px 4px var(--title-comment-secondary-color-transparent),
          -2px 0px 4px var(--title-comment-secondary-color-transparent);
      }
      &--tertiary {
        text-shadow: 
          2px 0px 4px var(--title-comment-tertiary-color-transparent),
          -2px 0px 4px var(--title-comment-tertiary-color-transparent);
      }
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