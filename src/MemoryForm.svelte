<script>
  export let save;
  let newMemory = '';

  function submit() {
    save(newMemory);
    newMemory = '';
  }
</script>

<section class="memory-form">
  <label class="memory-form__label" for="new-memory">New Memory</label>
  <textarea class="memory-form__input" id="new-memory" bind:value={newMemory}></textarea>
  <button class="memory-form__button" on:click={submit}>Save</button>
</section>

<style>
  .memory-form {
		display: flex;
    flex-direction: column;
    padding: 10px;
    width: 500px;
    max-width: 100%;
	}

	.memory-form__input {
		resize: none;
		width: 100%;
		height: 320px;
    background-color: var(--background-color);
	}
</style>