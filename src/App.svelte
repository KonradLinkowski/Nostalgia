<script>
	import { memories } from './memory.store.js';
	import Memory from './Memory.svelte';
	import MemoryForm from './MemoryForm.svelte';

	let memoryIsOpen = false;

	function openMemory() {
		memoryIsOpen = true;
	}

	function closeMemory() {
		memoryIsOpen = false;
	}

	function saveMemory(memory) {
		memories.add(memory);
	}
</script>

<header class="header">
	<h1 class="header__title">Nostalgia</h1>
</header>
<main class="main">
	<MemoryForm save={saveMemory}></MemoryForm>
	<button disabled={!$memories.length} class="main__button main__button--save" on:click={openMemory}>Load</button>
	{#if memoryIsOpen}
		<Memory memory={$memories[Math.floor(Math.random() * $memories.length)]} close={closeMemory}></Memory>
	{/if}
</main>
<footer></footer>

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
</style>