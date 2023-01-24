<script lang="ts">
  import { page } from '$app/stores'
  import type { PageData } from "./$types"
  
  import Title from "ui/lib/Title.svelte";
  import Card from  "ui/lib/Card.svelte";
  import ProjectCard from "ui/lib/ProjectCard.svelte"

	export let data: PageData
</script>

<svelte:head>
  <title> { data.head.title } </title>
	<meta name="description" content={data.head.description} >

  <meta name="title" property="og:title" content={`${data.head.description}`} />
	<meta name="type" property="og:type" content="website" />
	<meta name="url" property="og:url" content={`https://www.evesan.rocks/${$page.params.lang}/projects/`} />

	<meta name="twitter:creator" content="@everitosan" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={`${data.head.description}`} />
</svelte:head>

<div class="title__wrapper">

  <Title variant="tertiary">
    { data.title}
  </Title>
</div>

<Card variant="tertiary">
  {#each data.categories as category}
    <h2 class="category__name" > ░ {category.name} </h2>
    <div class="projects">
      {#each category.projects as project}
        <ProjectCard data={project} color={category.color} />
      {/each}
    </div>
  {/each}
</Card>

<style lang="scss" >
	@use "ui/Styles/utils";
  @use "ui/Styles/typography";
  @use "ui/Styles/breakpoints";

	.title__wrapper {
		margin: utils.sizing(6) 0;
	}

  .category__name {
    @include typography.title-text;
  }

  .projects {
    display: flex;
    flex-wrap: wrap;
    grid-column-gap: utils.sizing(3);
    grid-row-gap: utils.sizing(4);
    padding: 0 utils.sizing(2);
  }

  @media screen and (max-width: breakpoints.$md) {
    .projects {
      justify-content: center;
      grid-column-gap: utils.sizing(2);
    }
  }
</style>