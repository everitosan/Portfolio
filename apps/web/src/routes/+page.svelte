<script lang="ts">
	import { page } from '$app/stores'
	import { detectLang } from '$lib/lang'
	import { onMount } from 'svelte'
	import { reducedMotion } from 'ui/utils/motion'
	import type { PageData } from './$types'
	import type { ManifestData } from 'types/entities'

  import { marked } from "marked"
	import Typed from "typed.js"

	export let data: PageData;

	let manifestData: ManifestData | undefined = undefined;
	let content = ""

	const animateText = () => {
		const lang = detectLang();
		const found = data.langs.filter((part) => part.lang === lang);
		manifestData = (found.length > 0) ? found[0].data: data.langs[0].data
		content = marked.parse(manifestData.content)

		if (!reducedMotion()) {	
			let options = {
				strings: [content],
				typeSpeed: 0.2,
				smartBackspace: false
			};
			new Typed('.manifest__content', options);
		}
	}

	onMount(() => {
		animateText()
	});
</script>

<svelte:head>
	{#if manifestData}
		<title>{manifestData.head.title}</title>
		<meta name="description" content={manifestData.head.description} />

		<meta name="title" property="og:title" content={`${manifestData.head.description}`} />
		<meta name="type" property="og:type" content="website" />
		<meta name="url" property="og:url" content={`https://www.evesan.rocks/${$page.params.lang}/`} />
	
		<meta name="twitter:creator" content="@everitosan" />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={`${manifestData.head.description}`} />
	{:else}
		<title>{data.langs[0].data.head.title}</title>
		<meta name="description" content={data.langs[0].data.head.description} />

		<meta name="title" property="og:title" content={`${data.langs[0].data.head.description}`} />
		<meta name="type" property="og:type" content="website" />
		<meta name="url" property="og:url" content={`https://www.evesan.rocks/${$page.params.lang}/`} />
	
		<meta name="twitter:creator" content="@everitosan" />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={`${data.langs[0].data.head.description}`} />

	{/if}
</svelte:head>

<div class="manifest">
	<div class="manifest__content">
		{#if manifestData && reducedMotion()}
			{@html content}
		{/if}
	</div>
</div>

<style lang="scss">
	@use "ui/Styles/utils";
	@use 'ui/Styles/typography';
	@use 'ui/Styles/breakpoints';
	.manifest {
		padding-top: 20vh;
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

		:global(.typed-cursor) {
			display: none;
		}
	}
	@media screen and (max-width: breakpoints.$md) {
		.manifest {
			padding-top: 5vh;
		}
	}
</style>
