<script lang="ts" >
	import type { PageData } from "./$types"
  import { page } from '$app/stores'

  import { marked } from "marked"
	import { renderer } from "ui/utils/md-renderer"
	import Card from "ui/lib/Card.svelte"
	import Title from "ui/lib/Title.svelte"

	export let data: PageData

	marked.use({renderer})
</script>

<svelte:head>
	<title> { data.head.title } </title>
	<meta name="description" content={data.head.description} >

	<meta name="title" property="og:title" content={`${data.head.description}`} />
	<meta name="type" property="og:type" content="website" />
	<meta name="url" property="og:url" content={`https://www.evesan.rocks/${$page.params.lang}/path/`} />
	<!-- <meta name="image" property="og:image" content="https://prezento.vercel.app/preview.png" /> -->

	<meta name="twitter:creator" content="@everitosan" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={`${data.head.description}`} />
	<!-- <meta name="twitter:image" content="https://prezento.vercel.app/preview.png" /> -->

</svelte:head>

<div class="title__wrapper">
	<Title variant="primary" >
		{ data.title }
	</Title>
</div>

<Card variant="primary">
	{@html marked.parse(data.content)}
</Card>

<style lang="scss" >
	@use "ui/Styles/utils";

	.title__wrapper {
		margin: utils.sizing(6) 0;
	}
</style>
