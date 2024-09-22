<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker';
	import { generateSvg } from '$lib';
	import { onMount } from 'svelte';
	let data = '<p>EMPTY</p>';
	let download: string | null = null;
	let contents = 'Hi';
	let fontSize = 70;
	let xOffset = 50;
	let mount = false;
	let hex: string = '#000000';
	let invert: boolean = false;

	$: {
		if (mount) {
			fontSize = Math.max(fontSize, 0);
			xOffset = Math.max(xOffset, 0);
			// contents = contents.toUpperCase();
			contents = contents.replace(/[^a-zA-Z\s\n]/g, '');
			data = generateSvg(contents, fontSize, xOffset, xOffset / 2, hex, invert);
			download = URL.createObjectURL(new Blob([data], { type: 'image/svg' }));
		}
	}

	onMount(() => {
		mount = true;
	});
</script>

<svelte:head>
	<title>SCRIBE</title>
</svelte:head>

<div class="flex flex-col items-center outline-amber-400 outline-2 outline m-2 p-5 [&>*]:m-1">
	<h1 class="font-bold text-6xl">SCRIBE</h1>
	<p>A utility to generate isometric SVGs of arbitrary text.</p>
	<div class="flex flex-col items-center">
		<label for="contents" class="mb-3">Contents:</label>
		<textarea id="contents" bind:value={contents} />
		<div class="flex">
			<label for="invert" class="mr-3">Invert:</label>
			<input id="invert" type="checkbox" bind:checked={invert} />
		</div>
		<ColorPicker bind:hex label={`${invert ? 'Fill' : 'Stroke'} Color`} position="responsive" />
	</div>
	<p class="text-sm">⚠️ This only supports letters at the moment.</p>
	{#if download !== null}
		<a download="text.svg" href={download} class="p-3 bg-gray-200 rounded-md hover:bg-gray-400"
			>DOWNLOAD</a
		>
	{/if}
	<div class="outline-red-400 outline-2 outline-dashed flex flex-col [&>*]:m-1 items-center p-1">
		<p>⚠️ Changing these settings may adversely impact rendering!</p>
		<div class="inline">
			<label for="offset" class="mr-3">X Offset:</label>
			<input id="offset" type="number" bind:value={xOffset} />
		</div>
		<div class="inline">
			<label for="font" class="mr-3">Font Size:</label>
			<input id="font" type="number" bind:value={fontSize} />
		</div>
	</div>

	<p class="text-xs text-gray-500">
		🧱 A Purdue Hackers Project · <a
			href="https://github.com/PurdueHackers/scribe"
			class="underline"
			target="_blank">Open Source</a
		>
	</p>
</div>

{@html data}

<style>
	h1 {
		font-family: 'Space Grotesk';
	}
</style>
