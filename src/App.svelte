<script>
	import { memories } from './memory.store.js';
	import Memory from './Memory.svelte';
	import CreateMemory from './CreateMemory.svelte';

	let memoryIsOpen = false;
	let createMemoryIsOpen = false;
	let appInstalled = window.matchMedia('(display-mode: standalone)').matches;
	let installEvent = null;

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

	function deleteMemory(memory, date) {
		closeMemory();
		memories.del(memory, date);
	}

	function createMemory() {
		createMemoryIsOpen = true;
	}

	function handleInstallPrompt(e) {
		appInstalled = false;
		installEvent = e;
	}

	function install() {
    installEvent.prompt()
    installEvent.userChoice
    .then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        appInstalled = true;
      }
    })
	}
</script>

<svelte:window on:beforeinstallprompt={handleInstallPrompt}/>

<header class="header">
	<h1 class="header__title">Nostalgia</h1>
	<p class="header__subtitle">This is the place to hide<br><strong>Your Memories</strong></p>
</header>
<main class="main">
	<div class="main-actions">
		<button class="main-actions__button main-actions__button--create" on:click={createMemory}>
			<i class="main-actions__button-icon material-icons">add</i>
			<span>Create Memory</span>
		</button>
		<button disabled={!$memories.length} class="main-actions__button main-actions__button--recall" on:click={openMemory}>
			<i class="main-actions__button-icon material-icons">cloud</i>
			<span>Recall Memory</span>
		</button>
	</div>
	{#if createMemoryIsOpen}
		<CreateMemory save={saveMemory}></CreateMemory>
	{/if}
	{#if memoryIsOpen}
		<Memory
			memory={$memories[Math.floor(Math.pow(Math.random(), 1.3) * $memories.length)]}
			close={closeMemory}
			dele={deleteMemory}
		></Memory>
	{/if}
</main>
<footer class="footer">
	<a class="footer__link" target="_blank" href="https://github.com/KonradLinkowski/Nostalgia">Github</a>
	{#if !appInstalled}
		<button class="install-button" on:click={install}>
			<i class="install-button__icon material-icons">save_alt</i>
		</button>
	{/if}
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
		justify-content: center;
		flex: 1;
	}

	.main-actions {
		display: inline-flex;
		flex-direction: column;
		align-items: stretch;
	}

	.main-actions__button {
		background: none;
		border: none;
		box-shadow: none;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2px solid black;
		margin-bottom: 20px;
    transition: transform 0.1s;
	}

	.main-actions__button:not(:disabled):hover,.main-actions__button:focus {
		transform: translateY(-5px);
	  box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.75);
	}

	.main-actions__button:active {
    transform: translateY(0);
	  box-shadow: none;
  }

	.main-actions__button-icon {
		font-size: 2rem;
		margin-right: 20px;
	}

	.main-actions__button:active {
		background: none;
	}

	.footer {
		padding: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 10px;
	}

	.footer__link {
		color: black;
	}

	.footer__link:hover,.footer__link:focus {
		text-decoration: underline;
		outline: none;
	}

	.install-button {
    padding: 0;
    line-height: 0;
    background: none;
    border: none;
    box-shadow: none;
		border-radius: 50%;
		margin-left: 30px;
  }

  .install-button:active {
    background: none;
    border: none;
    box-shadow: none;
  }

  .install-button:hover,.install-button:focus {
    background-color: rgba(0, -0, 0, 0.1);
  }
</style>