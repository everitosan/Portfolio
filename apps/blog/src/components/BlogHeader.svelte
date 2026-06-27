<script lang="ts">
  import Header from 'ui/lib/Header.svelte'
  import Logo from 'ui/lib/Logo.svelte'
  import Menu from 'ui/lib/Menu.svelte'
  import MenuItem from 'ui/lib/MenuItem.svelte'

  export let lang: string = 'en'
</script>

<Header>
  <a slot="left" href={`/${lang}`}>
    <Logo />
  </a>
  <Menu slot="right">
    <MenuItem
      icon="laptop"
      variant="primary"
      href={`https://evesan.rocks/${lang}/about/`}
      target="_blank"
    >
      {lang === 'es' ? 'Acerca' : 'About me'}
    </MenuItem>

    <div class="lang">
      <a href="/en" class:active={lang === 'en'}> En </a>
      <div>/</div>
      <a href="/es" class:active={lang === 'es'}> Es </a>
    </div>
  </Menu>
</Header>

<style lang="scss">
  @use 'ui/Styles/colors';
  @use 'ui/Styles/utils';
  @use 'ui/Styles/typography';

  .lang {
    @include typography.small-text;
    display: flex;
    align-items: center;
    gap: utils.sizing(0.5);
    color: rgb(255 255 255 / 36%);
    font-weight: 800;

    a {
      color: rgb(255 255 255 / 36%);
      text-decoration: none;
      &.active { color: colors.$white; }
    }
  }
</style>
