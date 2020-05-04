<script>
	import { memories } from './memory.store.js';
	import Memory from './Memory.svelte';
	import CreateMemory from './CreateMemory.svelte';

	let memoryIsOpen = false;
	let createMemoryIsOpen = false;

	function openMemory() {
		memoryIsOpen = true;
	}

	function closeMemory() {
		memoryIsOpen = false;
	}

	function saveMemory(memory) {
		createMemoryIsOpen = false;
		if (memory) {
			memories.add(memory);
		}
	}

	function createMemory() {
		createMemoryIsOpen = true;
	}
</script>

<header class="header">
	<h1 class="header__title">Nostalgia</h1>
	<p>This is the place to hide your memories</p>
</header>
<main class="main">
	<button class="main__button main__button--save" on:click={createMemory}>Create</button>
	<button disabled={!$memories.length} class="main__button main__button--save" on:click={openMemory}>Load</button>
	{#if createMemoryIsOpen}
		<CreateMemory save={saveMemory}></CreateMemory>
	{/if}
	{#if memoryIsOpen}
		<Memory memory={$memories[Math.floor(Math.random() * $memories.length)]} close={closeMemory}></Memory>
	{/if}
</main>
<footer class="footer">
	<a class="footer__link" href="https://github.com/KonradLinkowski/Nostalgia">Github</a>
</footer>

<style>
	.header {
		text-align: center;
		width: 100%;
	}

	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}

	.footer {
		position: fixed;
		bottom: 0px;
		width: 100%;
		padding: 10px;
		display: flex;
		justify-content: center;
	}

	.footer__link {
		color: black;
		text-decoration: underline;
	}
</style>