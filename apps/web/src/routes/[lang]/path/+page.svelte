<script lang="ts">
  import { page } from '$app/stores'
  import type { PageData } from "./$types"

  import Title from "ui/lib/Title.svelte"
  import Card from  "ui/lib/Card.svelte"
  import PositionCard from  "ui/lib/PositionCard.svelte"

	export let data: PageData
</script>

<svelte:head>
  <title> { data.head.title } </title>
	<meta name="description" content={data.head.description} >

  <meta name="title" property="og:title" content={`${data.head.description}`} />
	<meta name="type" property="og:type" content="website" />
	<meta name="url" property="og:url" content={`https://www.evesan.rocks/${$page.params.lang}/path/`} />

	<meta name="twitter:creator" content="@everitosan" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={`${data.head.description}`} />

</svelte:head>

<div class="title__wrapper">

  <Title variant="secondary">
    { data.title }
  </Title>
</div>

<Card variant="secondary">
  <div class="positions">
    {#each data.positions as position}
      <PositionCard description={position.description} color={position.color} >
        <img alt={position.company} src={position.logo} slot="image" />
        <div slot="title"> {position.position} </div>
        <span slot="lapse" > {position.lapse} </span>
        <div slot="company" > {position.company} </div>
      </PositionCard>
  {/each}
  </div>
</Card>

<style lang="scss" >
	@use "ui/Styles/utils";

	.title__wrapper {
		margin: utils.sizing(6) 0;
	}

  .positions {
    display: grid;
    padding: utils.sizing(4) 0 ;
    grid-row-gap: utils.sizing(6);
  }
</style>