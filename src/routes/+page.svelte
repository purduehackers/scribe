<script lang="ts">
	import { generateSvg } from '$lib';
	import { onMount } from 'svelte';
	let data = '<p>EMPTY</p>';
	let download: string | null = null;
	let contents = 'Hi';
	let fontSize = 70;
	let xOffset = 50;
	let mount = false;

	$: {
		if (mount) {
			fontSize = Math.max(fontSize, 0);
			xOffset = Math.max(xOffset, 0);
			contents = contents.toUpperCase();
			contents = contents.replace(/[^a-zA-Z\s\n]/g, '');
			data = generateSvg(contents, fontSize, xOffset, xOffset / 2);
			download = URL.createObjectURL(new Blob([data], { type: 'image/svg' }));
		}
	}

	onMount(() => {
		console.log(data);
		mount = true;
	});
</script>

<h1 class="font-bold text-6xl">SCRIBE</h1>
<input type="number" bind:value={xOffset} />
<input type="number" bind:value={fontSize} />
<textarea on:change={(_) => {}} bind:value={contents} />
<p>This only supports letters at the moment</p>
{#if download !== null}
	<a download="text.svg" href={download}>DOWNLOAD</a>
{/if}

{@html data}

<style>
	h1 {
		font-family: 'Space Grotesk';
	}
</style>
