<header class="Header" >
  <div></div>
  <div class="Header__content">
    <div class="left">
        <slot name="left" ></slot>
    </div>
    <div class="diagonal">
      <div class="diagonal__content">
        <slot name="diagonal"></slot>
      </div>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
  <div class="Header__last" ></div>
</header>

<style lang="scss">
  @use "../Styles/colors";
  @use "../Styles/utils";
  @use "../Styles/breakpoints";
  
  :root {
    --header-diagonal: 30deg;
  }

  .Header {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr minmax(120px, breakpoints.$xl) 1fr;
    height: 80px;
  }

  .Header__content {
    display: grid;
    grid-template-columns: 1fr 0.4fr 1fr;

    & > div {
      display: grid;
      align-items: center;
    }

    .diagonal {
      border-left: 1px solid colors.$white;
      border-bottom: 1px solid colors.$white;
      transform: skewX(var(--header-diagonal));
      &__content {
        transform: skewX(-var(--header-diagonal));
        display: flex;
        justify-content: center;
        color: colors.$white;
      }
    }
    .left {
      padding-left: utils.sizing(6);
    }
    .right { 
      border-bottom: 1px solid colors.$white;
      justify-content: flex-end;
      padding-right: utils.sizing(6);
    }
  }

  .Header__last {
    border-bottom: 1px solid colors.$white;
  }

  @media screen and (max-width: breakpoints.$md) {
    .Header__content {
      grid-template-columns: 1fr 0.1fr 0.2fr;
      .left {
        padding-left: utils.sizing(2);
      }
      .right {
        padding-right: utils.sizing(2);
      }
    }
  }

</style>