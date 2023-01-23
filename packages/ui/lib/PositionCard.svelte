<script lang="ts">
  import { marked } from 'marked'

  export let color: string = "red"
  export let description: string = ""

  const renderer = {
    link(href: string, title: string, text: string) {
      return `<a target="_blank" rel="noreferrer" href="${href}" >${text}</a>`
    }
  }
  marked.use({renderer})

</script>

<div class="PositionCard" >
  <div  class="PositionCard__title" style={`border-color: ${color}`}>
    <div class="PositionCard__title__block" style={`background: ${color}`}> ░ </div>
    <slot name="title">
    </slot>
  </div>

  <div class="PositionCard__main">
    <div class="PositionCard__main__top">
      <div class="PositionCard__main__top--diagonal" style={`background: ${color}`}></div>
      <div class="PositionCard__main__top--start" style={`background: ${color}`}></div>
      <div class="PositionCard__main__top--med" style={`background: ${color}`}></div>
      <div class="PositionCard__main__top--final" style={`background: ${color}`}></div>
    </div>

    <div class="PositionCard__main__detail" style={`border-color: ${color}`}>
      <div class="PositionCard__main__detail__text" style={`border-color: ${color}`}>
        <figure class="PositionCard__main__detail__text__image" style={`background: ${color}24; border-color: ${color}`} >
          <slot name="image" ></slot>
        </figure>

        <div class="PositionCard__main__detail__text__company" style={`background: ${color}`} >
          <div class="PositionCard__main__detail__text__company__content" >
            <slot name="company"></slot>
          </div>
        </div>

        <div class="PositionCard__main__detail__text__description" style={`background: ${color}24; `}>
          {@html marked.parse(description)}
        </div>

      </div>
      <div class="PositionCard__main__detail__lapse" style={`border-color: ${color}`}>
        <span style={`color: ${color}`}> >> </span>
        <slot name="lapse"></slot>
      </div>
      <div style={`border-left: 1px solid ${color}; transform: skewX(-28deg) translateX(7px) scaleX(1.1) `} > </div>
      <div style={`border-top: 1px solid ${color}`}> </div>
    </div>
  </div>
</div>

<style lang="scss" >
  @use "../Styles/breakpoints";
  @use "../Styles/typography";
  @use "../Styles/colors";
  @use "../Styles/utils";

  $border-radius: 3px;

  .PositionCard__title {
    @include typography.title-text;
  
    align-items: center;
    border-top-width: 1px;
    border-top-style: solid;
    display: flex;
    grid-column-gap: utils.sizing(2);

    &__block {
      height: 40px;
      width: 20px;
    }
  }

  .PositionCard__main {
    &__top {
      display: flex;
      justify-content: flex-end;
      height: 16px;

      &--diagonal {
        position: relative;
        transform: skewX(-16deg);
        left: 2px;
        width: 40px;
      }

      &--start {
        width: 80px;
      }

      &--med {
        height: 60%;
        position: relative;
        top: 40%;
        width: 40px;
      }

      &--final {
        border-radius: 0 $border-radius 0 0;
        width: 40px;
      }
    }

    &__detail {
      border-top-width: 1px;
      border-top-style: solid;
      border-left-width: 1px;
      border-left-style: solid;

      display: grid;
      grid-template-columns: 140px 15px 1fr;
      grid-template-rows: 1fr 30px;

      &__text {
        grid-column-start: 1;
        grid-column-end: 4;
        border-right-style: solid;
        border-right-width: 1px;
        display: grid;
        grid-template-columns: 115px 36px 1fr;
        padding: utils.sizing(1);
        grid-column-gap: utils.sizing(1);
        grid-row-gap: utils.sizing(1);

        &__image {
          align-items: center;
          border-style: solid;
          border-width: 1px;
          border-radius: $border-radius;
          display: grid;
          height: 115px;
          justify-content: center;
          margin: 0;
          width: 115px;

          :global(img) {
            display: block;
            width: 70%;
            margin: 0 auto;
          }
        }

        &__company {
          align-items: center;
          display: flex;
          height: 115px;
          justify-content: center;
          width: 36px;

          &__content {
            @include typography.techie-big-text;
            transform: rotateZ(-90deg);
          }
        }

        &__description {
          @include typography.regular-text;

          box-sizing: border-box;
          overflow: hidden;
          padding: utils.sizing(1) utils.sizing(2);
          transition: all 0.3s;
          
          :global(p) {
            margin: 0;
            color: colors.$white;
          }

          :global(a) {
            color: inherit;
            opacity: 0.6;
            &:hover {
              opacity: 1;
            }
          }

          :global(h3) {
            @include typography.title-text;
            font-size: 16px;
          }
        }
      }

      &__lapse {
        border-bottom-width: 1px;
        border-bottom-style: solid;
        padding: 0 utils.sizing(1);
        @include typography.techie-small-text;
      }

    }
  }

  @media screen and (max-width: breakpoints.$md) {
    .PositionCard__main__detail__text {
      grid-template-columns: 1fr 36px 115px 1fr;

      &__image {
        grid-column-start: 3;
        grid-row-start: 1;
      }
      &__company {
        grid-column-start: 2;
      }
      &__description {
        grid-column: 1 / span 4;
      }
    }
  }
</style>