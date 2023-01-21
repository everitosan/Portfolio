<script lang="ts">
  import type { PageData } from "./$types"

  import Title from "ui/lib/Title.svelte"
  import Card from  "ui/lib/Card.svelte"
  import PositionCard from  "ui/lib/PositionCard.svelte"

	export let data: PageData
</script>

<svelte:head>
  <title> { data.head.title } </title>
	<meta name="description" content={data.head.description} >
</svelte:head>

<div class="title__wrapper">

  <Title variant="secondary">
    { data.title }
  </Title>
</div>

<Card variant="secondary">
  <div class="positions">
    {#each data.positions as position}
      <PositionCard color={position.color} >
        <img alt={position.company} src={position.logo} slot="image" />
        <div slot="title"> {position.position} </div>
        <span slot="lapse" > {position.lapse} </span>
        <div slot="company" > {position.company} </div>
        <div slot="description" > {position.description} </div>
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