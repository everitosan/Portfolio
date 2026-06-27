<script lang="ts">
  import Icon from './Icon.svelte'

  let mobileToggle = false
  const toggle = () => { mobileToggle = !mobileToggle }
  const close = () => { mobileToggle = false }
</script>

<div class="Menu">
  <button class="Menu__trigger" on:click={toggle}>
    <Icon name="menu" />
  </button>

  <div class="Menu__options" class:Menu__options--show={mobileToggle}>
    <div class="Menu__options__content" on:click={close}>
      <slot />
    </div>
  </div>
</div>

<style lang="scss">
  @use '../Styles/utils';
  @use '../Styles/colors';
  @use '../Styles/breakpoints';

  .Menu {
    color: colors.$white;
  }

  .Menu__options {
    align-items: center;
    display: flex;
    height: 100%;
  }

  .Menu__options__content {
    align-items: center;
    display: flex;
    grid-column-gap: utils.sizing(4);
  }

  @media screen and (min-width: breakpoints.$md) {
    .Menu {
      height: 100%;
    }

    .Menu__trigger {
      display: none;
    }
  }

  @media screen and (max-width: breakpoints.$md) {
    .Menu__trigger {
      background: transparent;
      border: none;
      color: colors.$white;
      display: block;
      transform: skewX(10deg);
      padding: utils.sizing(2);
      cursor: pointer;
    }

    .Menu__options {
      align-items: center;
      background: rgb(0 0 0 / 70%);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      height: 100vh;
      justify-content: center;
      left: 0;
      position: fixed;
      top: 0;
      transition: all 0.4s;
      transform: translate3d(-1000px, 0, 0);
      width: 100%;
      z-index: 0;
      display: flex;
    }

    .Menu__options--show {
      z-index: 2;
      transform: translate3d(0, 0, 0);
    }

    .Menu__options__content {
      flex-direction: column;
      grid-row-gap: utils.sizing(4);
      padding: utils.sizing(4) utils.sizing(6);
    }
  }
</style>
