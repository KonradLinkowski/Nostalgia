<script>
  import Modal from './Modal.svelte';
  export let save;

  let memory = '';

  function closeCard() {
    save(null);
  }

  function saveMemory() {
    save(memory);
  }

  const colors = ['red', 'green', 'blue', 'cyan', 'orange'];
</script>

<Modal date={Date.now()} close={closeCard}>
  <div class="memory-form" slot="content">
    <textarea class="memory-form__input" bind:value={memory} placeholder="Today I..."></textarea>
    <button class="memory-form__save" disabled={!memory.length} on:click={saveMemory}>
      <i class="memory-form__save-icon material-icons">save</i>
      <span>Save</span>
    </button>
  </div>
</Modal>
<style>
  .memory-form {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .memory-form__input {
    outline: none;
    border: none;
    flex: 1;
    resize: none;
    background-color: var(--card-color);
    margin: 10px 0;
  }

  .memory-form__save {
    background: none;
    border: none;
    box-shadow: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid black;
    transition: transform 0.1s;
  }
  
  .memory-form__save:not(:disabled):hover,.memory-form__save:focus {
    transform: translateY(-5px);
    box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.75);
  }

  .memory-form__save:active {
    transform: translateY(0);
    box-shadow: none;
  }

  .memory-form__save-icon {
    font-size: 2rem;
    margin-right: 10px;
  }

  .memory-form__save:active {
    background: none;
  }
</style>