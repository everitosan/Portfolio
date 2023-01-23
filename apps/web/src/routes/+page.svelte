<script lang="ts">
	import { onMount } from 'svelte'
	import { detectLang } from '$lib/lang'
	import type { PageData } from './$types'
	import type { ManifestData } from 'types/entities'
  import { marked } from "marked"
	import Typed from "typed.js"


	export let data: PageData;

	let manifestData: ManifestData | undefined = undefined;

	onMount(() => {
		const lang = detectLang();
		const found = data.langs.filter((part) => part.lang === lang);
		if (found.length > 0) {
			manifestData = found[0].data
			console.log(manifestData)
			let options = {
				strings: [marked.parse(manifestData.content)],
				typeSpeed: 20,
				smartBackspace: false
			};
			var typed = new Typed('.manifest__content', options);
		}
	});
</script>

<svelte:head>
	{#if manifestData}
		<title>{manifestData.head.title}</title>
		<meta name="description" content={manifestData.head.description} />
	{/if}
</svelte:head>

<div class="manifest">
	<div class="manifest__content">
	</div>
</div>

<style lang="scss">
	@use "ui/Styles/utils";
	@use 'ui/Styles/typography';
	@use 'ui/Styles/breakpoints';
	.manifest {
		padding-top: 25vh;
		&__content {
			@include typography.regular-text;

			background: rgb(0,0,0);
			background: radial-gradient(circle, rgb(44 12 90 / 64%) 0%, rgba(34,193,195,0) 82%);
			// display: inline-block;
			padding: utils.sizing(2);
			box-sizing: border-box;

			:global(h1) {
				@include typography.title-text;
			}
			
		}
	}
	@media screen and (max-width: breakpoints.$md) {
		.manifest {
			padding-top: 5vh;
		}
	}
</style>
