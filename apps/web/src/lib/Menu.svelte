<script lang="ts">
  import Menu from 'ui/lib/Menu.svelte'
  import MenuItem from 'ui/lib/MenuItem.svelte'
  import { DEFAULT_LANG, detectLang } from './lang'
  import { onMount } from 'svelte'
  import { page } from '$app/stores'

  let lang = DEFAULT_LANG
  let section = ''
  let isMounted = false

  onMount(() => {
    lang = detectLang()
    isMounted = true
  })

  $: {
    lang = getLang($page.params.lang)
    section = getSection($page.url.pathname)
  }

  const getLang = (lng: string | undefined): string => {
    if (lng === undefined) {
      if (isMounted) return detectLang()
      return DEFAULT_LANG
    }
    return lng
  }

  const getSection = (pathname: string): string => {
    const path = pathname.split('/')
    if (path.length > 3) return path.slice(2).join('/')
    return 'about'
  }
</script>

<Menu>
  <MenuItem
    icon="laptop"
    variant="primary"
    href={`/${lang}/about/`}
    active={section == 'about/'}
  >
    {lang === 'es' ? 'Acerca' : 'About'}
  </MenuItem>

  <MenuItem
    icon="branch"
    variant="secondary"
    active={section == 'path/'}
    href={`/${lang}/path/`}
  >
    Path
  </MenuItem>

  <MenuItem
    icon="chip"
    variant="tertiary"
    active={section == 'projects/'}
    href={`/${lang}/projects/`}
  >
    {lang === 'es' ? 'Proyectos' : 'Projects'}
  </MenuItem>

  <MenuItem
    icon="chip"
    variant="tertiary"
    active={section == 'blog/'}
    target="_blank"
    href={`https://blog.evesan.rocks/${lang}`}
  >
    Blog
  </MenuItem>

  <div class="Menu__lang">
    <a tabindex="0" href={`/en/${section}`} class:active={lang == 'en'}> En </a>
    <div>/</div>
    <a tabindex="0" href={`/es/${section}`} class:active={lang == 'es'}> Es </a>
  </div>
</Menu>

<style lang="scss">
  @use 'ui/Styles/utils';
  @use 'ui/Styles/colors';
  @use 'ui/Styles/typography';

  .Menu__lang {
    @include typography.small-text;
    display: flex;
    color: rgb(255 255 255 / 36%);
    grid-column-gap: utils.sizing(0.5);

    a {
      color: rgb(255 255 255 / 36%);
      font-weight: 800;
      text-decoration: none;

      &.active { color: colors.$white; }
    }
  }
</style>
