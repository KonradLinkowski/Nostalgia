<script>
  import Modal from './Modal.svelte';
  import { memories } from './memory.store.js';
  import Memory from './Memory.svelte';
  import CreateMemory from './CreateMemory.svelte';

  let memoryIsOpen = false;
  let createMemoryIsOpen = false;
  let appInstalled = window.matchMedia('(display-mode: standalone)').matches;
  let installEvent = null;
  let cardColor = '';

  function openMemory() {
    memoryIsOpen = true;
  }

  function closeMemory() {
    memoryIsOpen = false;
  }

  function saveMemory(memory, cardColor) {
    createMemoryIsOpen = false;
    if (memory) {
      memories.add(memory, cardColor);
    }
  }

  function deleteMemory(memory, date) {
    closeMemory();
    memories.del(memory, date);
  }

  let clearMemoriesIsOpen = false;
  function openClearModal() {
      clearMemoriesIsOpen = true;
  }

  function closeClearModal() {
      clearMemoriesIsOpen = false;
  }

  function clearAndClose() {
      clearMemoriesIsOpen = false;
      memories.reset();
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
    <button disabled={!$memories.length} class="main-actions__button main-actions__button--clear" on:click={openClearModal}>
      <i class="main-actions__button-icon material-icons">delete_forever</i>
      <span>Clear Memories</span>
    </button>
  </div>
  {#if createMemoryIsOpen}
    <CreateMemory save={saveMemory}> </CreateMemory>
  {/if}
  {#if memoryIsOpen}
    <Memory
      memory={$memories[Math.floor(Math.pow(Math.random(), 1.3) * $memories.length)]}
      close={closeMemory}
      dele={deleteMemory}
    ></Memory>
  {/if}
  {#if clearMemoriesIsOpen}
    <Modal close={closeClearModal} date={0}>
      <div class="clear-modal" slot="content">
        <p class="clear-modal__text">Are you sure you want to delete all of your memories?</p>
        <div class="clear-modal__choices">
          <button class="clear-modal__confirm" on:click={() => clearAndClose()}>
            <i class="clear-modal__close-icon material-icons">delete</i>
            <span>Confirm</span>
          </button>
          <button class="clear-modal__cancel" on:click={() => closeClearModal()}>
            <i class="clear-modal__close-icon material-icons">cancel</i>
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </Modal>
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

  .main-actions__button--clear {
    margin-top: 3rem;
  }

  .clear-modal {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .clear-modal__text {
    font-size: 1.5rem;
    text-align: center;
    flex: 1;
  }

  .clear-modal__choices {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .clear-modal__confirm,
  .clear-modal__cancel {
      background: none;
      border: none;
      box-shadow: none;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid black;
      transition: transform 0.1s;
  }

  .clear-modal__close:not(:disabled):hover,.clear-modal__close:focus {
    transform: translateY(-5px);
    box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.75);
  }

  .clear-modal__close:active {
    transform: translateY(0);
    box-shadow: none;
  }

  .clear-modal__close-icon {
    font-size: 2rem;
    margin-right: 10px;
  }

  .clear-modal__close:active {
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
