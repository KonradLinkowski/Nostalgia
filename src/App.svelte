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
	<p class="header__subtitle">This is the place to hide<br><strong>Your Memories</strong></p>
</header>
<main class="main">
	<button class="main__button main__button--create" on:click={createMemory}>
		<i class="main__button-icon material-icons">add</i>
		<span>Create Memory</span>
	</button>
	<button disabled={!$memories.length} class="main__button main__button--recall" on:click={openMemory}>
		<i class="main__button-icon material-icons">cloud</i>
		<span>Recall Memory</span>
	</button>
	{#if createMemoryIsOpen}
		<CreateMemory save={saveMemory}></CreateMemory>
	{/if}
	{#if memoryIsOpen}
		<Memory memory={$memories[Math.floor(Math.random() * $memories.length)]} close={closeMemory}></Memory>
	{/if}
</main>
<footer class="footer">
	<a class="footer__link" target="_blank" href="https://github.com/KonradLinkowski/Nostalgia">Github</a>
</footer>

<style>
	.header {
		text-align: center;
		width: 100%;
	}

	.header__title {
		margin: 20px 0 20px 0;
		font-size: 4rem;
		font-family: 'Sacramento', cursive;
	}

	.header__subtitle {
		margin: 10px 0 50px 0;
		font-size: 2rem;
		line-height: 2rem;
		font-family: 'Parisienne', cursive;
	}

	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}

	.main__button {
		background: none;
		border: none;
		box-shadow: none;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2px solid black;
		margin-bottom: 20px;
	}

	.main__button-icon {
		font-size: 2rem;
		margin-right: 10px;
	}

	.main__button:active {
		background: none;
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