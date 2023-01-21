<script lang="ts">
  import Icon from "./Icon.svelte"

  export let href: string = ""
  export let icon:  "chip" | "laptop" | "branch" = "laptop";
  export let variant : "primary" | "secondary" | "tertiary" = "primary"
  export let active: boolean = false

</script>

<div class={`MenuItem MenuItem--${variant}${active? "--active": ""}`} >
  <a 
    class="MenuItem__link"
    tabindex="0"
    href={href}>
    <Icon name={icon} />
    <slot></slot>
  </a>
</div>
  
<style lang="scss" >
  @use "../Styles/colors";
  @use "../Styles/utils";
  @use "../Styles/breakpoints";
  @use "../Styles/typography";

  :root {
    --menuItem-primary-color: #{colors.$yellow};
    --menuItem-secondary-color: #{colors.$purple};
    --menuItem-tertiary-color: #{colors.$orange};
  }

  .MenuItem {
    @include typography.small-text;

    color: colors.$white;
    background: none;
    border: none;

    &__link {
      align-items: center;
      display: flex;
      color: inherit;
      grid-column-gap: utils.sizing(1);
      text-decoration: none;
    }

   
  }

  @media screen and (min-width: breakpoints.$md) {
    .MenuItem {
      border-top:  4px solid rgba(0,0,0,0.5);
      border-bottom:  4px solid transparent;
      padding: utils.sizing(3.1) utils.sizing(0.5);

      &--primary--active {
        border-top-color: var(--menuItem-primary-color);
      }
      &--secondary--active {
        border-top-color: var(--menuItem-secondary-color);
      }
      &--tertiary--active {
        border-top-color: var(--menuItem-tertiary-color);
      }
    }
  }
  @media screen and (max-width: breakpoints.$md) {
		.MenuItem {
      font-size: utils.sizing(3);

      &--primary--active {
        color: var(--menuItem-primary-color);
      }
      &--secondary--active {
        color: var(--menuItem-secondary-color);
      }
      &--tertiary--active {
        color: var(--menuItem-tertiary-color);
      }
		}
	}
</style>