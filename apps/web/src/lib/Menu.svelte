<script lang="ts">
	import MenuItem from 'ui/lib/MenuItem.svelte';
	import Icon from 'ui/lib/Icon.svelte';
	import { page } from '$app/stores';

	let lang = 'en';
	let section = '';
	let mobileToggle = true;

	$: {
		lang = getLang($page.params.lang);
		section = getSection($page.url.pathname);
		mobileToggle = false
	}

	const getLang = (lng: string | undefined): string => {
		return lng ? lng : 'en';
	};

	const getSection = (pathname: string): string => {
		const path = pathname.split('/');
		if (path.length > 3) {
			const sectionPath = path.slice(2, path.length);
			return sectionPath.join('/');
		}
		return 'about';
	};

	const toggleMenu = () => {
		mobileToggle = !mobileToggle;
	};
</script>

<div class="Menu">
	<button class="Menu__trigger" on:click={toggleMenu}>
		<Icon name="menu" />
	</button>

	<div class="Menu__options" class:Menu__options--show={mobileToggle}>
		<div class="Menu__options__content">
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
				href={`/${lang}/path/`}>Path</MenuItem
			>
			<MenuItem
				icon="chip"
				variant="tertiary"
				active={section == 'projects/'}
				href={`/${lang}/projects/`}
			>
				{lang === 'es' ? 'Proyectos' : 'Projects'}
			</MenuItem>

			<div class="Menu__lang">
				<a tabindex="0" href={`/en/${section}`} class:active={lang == 'en'}> En </a>
				<div>/</div>
				<a tabindex="0" href={`/es/${section}`} class:active={lang == 'es'}> Es </a>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@use 'ui/Styles/utils';
	@use 'ui/Styles/colors';
	@use 'ui/Styles/typography';
	@use 'ui/Styles/breakpoints';

	.Menu {
		color: colors.$white;
	}

	.Menu__options {
		grid-column-gap: utils.sizing(4);
		align-items: center;
		display: flex;
		height: 100%;
		&__content {
			align-items: center;
			display: flex;
			grid-column-gap: utils.sizing(4);
		}
	}

	.Menu__lang {
		@include typography.small-text;
		display: flex;
		grid-column-gap: utils.sizing(0.5);
		a {
			color: colors.$white;
			text-decoration: none;

			&.active {
				font-weight: 800;
				color: rgb(255 255 255 / 36%);
			}
		}
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
		}

		.Menu__lang {
			font-size: utils.sizing(2.5);
		}

		.Menu__options {
			align-items: center;
			background: rgb(0 0 0 / 70%);
			backdrop-filter: blur(6px);
			-webkit-backdrop-filter: blur(6px);
			grid-row-gap: utils.sizing(2);
			height: 100vh;
			justify-content: center;
			left: 0;
			position: fixed;
			top: 0;
			transition: all 0.4s;
			transform: translate3d(-1000px, 0, 0);
			width: 100%;
			z-index: 0;

			&__content {
				flex-direction: column;
				grid-row-gap: utils.sizing(4);
				padding: utils.sizing(4) utils.sizing(6);
			}

			&--show {
				z-index: 2;
				display: flex;
				transform: translate3d(0, 0, 0);
			}
		}
	}
</style>
