<script lang="ts">
  import Header from 'ui/lib/Header.svelte'
  import Logo from 'ui/lib/Logo.svelte'
  import Menu from 'ui/lib/Menu.svelte'
  import MenuItem from 'ui/lib/MenuItem.svelte'

  export let lang: string = 'es'
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
      Acerca
    </MenuItem>
  </Menu>
</Header>

<style lang="scss">
  @use 'ui/Styles/colors';
  @use 'ui/Styles/utils';
  @use 'ui/Styles/typography';
</style>
