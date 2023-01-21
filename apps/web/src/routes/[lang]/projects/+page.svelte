<script lang="ts">
  import type { PageData } from "./$types"
  
  import Title from "ui/lib/Title.svelte";
  import Card from  "ui/lib/Card.svelte";
  import ProjectCard from "ui/lib/ProjectCard.svelte"

	export let data: PageData
</script>

<svelte:head>
  <title> { data.head.title } </title>
	<meta name="description" content={data.head.description} >
</svelte:head>

<div class="title__wrapper">

  <Title variant="tertiary">
    { data.title}
  </Title>
</div>

<Card variant="tertiary">
  {#each data.categories as category}
    <h2 class="category__name" > {category.name} </h2>
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

	.title__wrapper {
		margin: utils.sizing(6) 0;
	}

  .category__name {
    @include typography.title-text;
  }

  .projects {
    display: flex;
    flex-wrap: wrap;
    grid-column-gap: utils.sizing(4);
    padding: 0 utils.sizing(2);
  }
</style>