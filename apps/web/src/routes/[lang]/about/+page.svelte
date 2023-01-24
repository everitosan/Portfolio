<script lang="ts" >
	import type { PageData } from "./$types"
	import Title from "ui/lib/Title.svelte"
	import Card from "ui/lib/Card.svelte"
  import { marked } from "marked"
	import { renderer } from "ui/utils/md-renderer"

	export let data: PageData

	marked.use({renderer})
</script>

<svelte:head>
	<title> { data.head.title } </title>
	<meta name="description" content={data.head.description} >
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
