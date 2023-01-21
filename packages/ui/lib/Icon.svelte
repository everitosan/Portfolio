<script lang="ts" >
  export let name: "chip" | "laptop" | "branch" | "github" | "linkedin" | "menu" | "unsplash" | "youtube" = "laptop"
</script>

<span class={`icon-${name}`}></span>


<style lang="scss" >
  @use "../Styles/colors";
  span {
    color: inherit;
  }
</style>