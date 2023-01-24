<script lang="ts">
  export let variant: "primary" | "secondary" | "tertiary";
</script>

<div class="Card">

  <div class="Card__top">
    <div class={`Card__detail__color Card__detail__color--${variant}`} ></div>
  </div>
  
  <div class="Card__main">

    <div class="details">
      <div class={`Card__detail__color Card__detail__color--${variant}`} ></div>
      <div class={`Card__detail__color Card__detail__color--top Card__detail__color--${variant}`} ></div>
      <div class={`Card__detail__color Card__detail__color--bottom Card__detail__color--${variant}`} ></div>
    </div>

    <div class="Card__main__content">
      <div class={`Card__main__content__wrapper Card__main__content__wrapper--${variant}`}>
        <slot></slot>
      </div>
    </div>
  </div>
  
  <div class="Card__bottom">
    <div class={`Card__detail__color Card__detail__color--${variant}`} ></div>
    <div class="Card__bottom__details">
      <div class={`Card__detail__square --${variant}`}></div>
      <div class={`Card__detail__square --${variant}`}></div>
      <div class={`Card__detail__square --${variant}`}></div>
    </div>
  </div>

</div>

<style lang="scss" >
  @use "../Styles/colors";
  @use "../Styles/utils";
  @use "../Styles/typography";
  @use "../Styles/breakpoints";

  @mixin bg {
    background: rgba(45, 45, 65, 0.9);
    // background: var(--card-background);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  @mixin top-bottom {
    @include bg;
    height: 16px;
    overflow: hidden;
  }

  @keyframes tilt {
    0% {
      opacity: 0.2;
    }
    81% {
      opacity: 0.2;
    }
    83% {
      opacity: 0.6;
    }
    85% {
      opacity: 0.2;
    }
    87% {
      opacity: 0.6;
    }
  }

  :root {
    --card-background: #{colors.$gray};
    --card-primary-color: #{colors.$yellow};
    --card-secondary-color: #{colors.$purple};
    --card-tertiary-color: #{colors.$orange};
  }

  .Card {
    @include typography.regular-text;
    
    display: grid;
    grid-row-gap: utils.sizing(0.5);
    line-height: 31px;
  }

  .Card__top {
    @include top-bottom();
    border-radius: 9px 0 0 0;
  }

  .Card__main {
    @include bg;

    display: grid;
    grid-template-columns: 8px 1fr;
    
    .details {
      position: relative;
      
      .Card__detail__color {
        width: 4px;
        &--top, 
        &--bottom {
          position: absolute;
          left: 0;
          height: 30%;
          width: 8px;
        }

        &--top {
          top: 0;
        }
        &--bottom {
          bottom: 0;
        }
      }
    }

    &__content {
      color: colors.$white;
      padding: utils.sizing(1);
      
      &__wrapper {
        padding: 0 utils.sizing(1);
        overflow-y: scroll;
      }
    }
  }

  .Card__bottom {
    @include top-bottom();
    border-radius: 0 0 0 9px;
    display: flex;
    .Card__bottom__details {
      align-items: center;
      display: flex;
      flex: 1;
      grid-column-gap: utils.sizing(0.5);
      justify-content: flex-end;
      padding-right: utils.sizing(1);
    }
  }

  .Card__detail__square {
    background-color: colors.$gray-opaque;
    border-radius: 2px;
    height: 8px;
    opacity: 0.2;
    transform: skewX(10deg);
    width: 8px;
    
    &.--primary {
      background: radial-gradient(circle, var(--card-primary-color) 0%, rgba(186,171,12,1) 100%);
    }

    &.--secondary {
      background: radial-gradient(circle, var(--card-secondary-color) 0%, colors.$purple-transparent 100%);
    }

    &.--tertiary {
      background: radial-gradient(circle, var(--card-tertiary-color) 0%, colors.$orange-transparent 100%);
    }

    &:nth-child(1) {
      animation: tilt 5s infinite;
    }

    &:nth-child(2) {
      animation: tilt 8s infinite;
    }

    &:nth-child(3) {
      animation: tilt 10s infinite;
    }

  }

  .Card__detail__color {
    height: 100%;
    width: 8px;

    &--primary {
      background: var(--card-primary-color);
    }
    &--secondary {
      background: var(--card-secondary-color);
    }
    &--tertiary {
      background: var(--card-tertiary-color);
    }
  }

  /*
  * Variants for main section
  */
  .Card__main__content__wrapper{
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      background: colors.$gray-opaque;
    }

    &--primary{
      &::-webkit-scrollbar-thumb {
        background: var(--card-primary-color);
      }
    }

    &--secondary{
      &::-webkit-scrollbar-thumb {
        background: var(--card-secondary-color);
      }
    }
    &--tertiary{
      &::-webkit-scrollbar-thumb {
        background: var(--card-tertiary-color);
      }
    }
  }

  @media screen and (min-width: breakpoints.$md) {
    .Card__main__content__wrapper {
      max-height: 60vh;
    }
  }

</style>