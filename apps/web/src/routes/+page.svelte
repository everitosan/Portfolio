<script lang="ts" >
	import { onMount } from "svelte"
	import { detectLang } from "$lib/lang"

	import Title from "ui/lib/Title.svelte"
	import Card from "ui/lib/Card.svelte"

	onMount(() => {
		const userLang = detectLang()
		console.log(userLang)
	})


</script>


<div class="manifiesto">

</div>
