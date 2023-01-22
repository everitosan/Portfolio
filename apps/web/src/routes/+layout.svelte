<script>
	import Header from "ui/lib/Header.svelte"
	import Logo from "ui/lib/Logo.svelte"
	import Menu from "$lib/Menu.svelte"

	import './styles.css';

	// fonts
  import "@fontsource/saira-condensed"
	import "@fontsource/orbitron"
	import "@fontsource/share-tech-mono"


</script>

<div class="app">
	<Header>
		<a slot="left" href="/">
			<Logo></Logo>
		</a>
		<Menu slot="right" ></Menu>
	</Header>

	<main>
		<slot />
	</main>

</div>

<style lang="scss">
	@use "ui/Styles/utils";
	@use "ui/Styles/colors";
	@use "ui/Styles/breakpoints";

	main {
		box-sizing: border-box;
		color: colors.$white;
		margin: 0 auto;
		max-width:  breakpoints.$xl;
		padding: utils.sizing(4) utils.sizing(6);
	}

	.app {
		a {
			text-decoration: none;
		}
	}

	@media screen and (max-width: breakpoints.$md) {
		main {
			padding: utils.sizing(2) utils.sizing(2);
		}
	}

</style>
