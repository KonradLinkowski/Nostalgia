<script>
  import Modal from './Modal.svelte';
  export let save;
  export let cardColor;

  let memory = '';


  function closeCard() {
    save(null);
  }

  function saveMemory() {
    save(memory, cardColor);
  }


  function newRandomColor() {
    const colors = ['red', 'green', 'blue', 'cyan', 'orange'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  cardColor = newRandomColor()
  function changeColor() {
    var colorElem = document.querySelector("body > main > div.modal.svelte-7jwz2f > article")
    cardColor = newRandomColor();
    colorElem.style = `--card-color: var(--color-${cardColor});`
  }

</script>

<Modal date={Date.now()} cardColor={cardColor} close={closeCard}>
  <div class="memory-form" slot="content">
    <textarea class="memory-form__input" bind:value={memory} placeholder="Today I..."></textarea>
    <div class="memory-form__buttons">
      <button class="memory-form__save" disabled={!memory.length} on:click={saveMemory}>
        <i class="memory-form__save-icon material-icons">save</i>
        <span>Save</span>
      </button>
      <button class="memory-form__color" on:click={changeColor}>
        <i class="memory-form__color-icon material-icons">palette</i>
        <span>Change Colour</span>
      </button>
    </div>
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

  .memory-form__save,
  .memory-form__color {
    background: none;
    width: 100%;
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
    background: none;
  }

  .memory-form__save-icon,
  .memory-form__color-icon {
    font-size: 2rem;
    margin-right: 10px;
  }
</style>
