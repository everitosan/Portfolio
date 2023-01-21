<script lang="ts" >
	import type { PageData } from "./$types"
	import Title from "ui/lib/Title.svelte"
	import Card from "ui/lib/Card.svelte"

	export let data: PageData
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
	{#each data.content as paragraph }
		<p> {paragraph} </p>
	{/each}

</Card>

<style lang="scss" >
	@use "ui/Styles/utils";

	.title__wrapper {
		margin: utils.sizing(6) 0;
	}
</style>
