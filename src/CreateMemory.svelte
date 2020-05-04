<script>
  import { fly, fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  export let save;

  let newMemory = '';
  let date = new Date();

  const formatter = new Intl.DateTimeFormat('en-gb', { year: 'numeric', month: 'short', day: '2-digit' }) ;
  let formattedDate;

  $: {
    formattedDate = formatter.format(date);
  }

  function closeCard() {
    save(null);
  }

  function saveMemory() {
    save(newMemory);
  }

  const colors = ['red', 'green', 'blue', 'cyan', 'orange'];
</script>

<div class="memory">
  <div
    transition:fade
    on:click={closeCard}
    class="memory__overlay"
  ></div>
  <article
    transition:fly="{{ y: 500 }}"
    style="--card-color: var(--color-{ colors[date % colors.length] });"
    class="memory__card">
    <span class="memory__date">{formattedDate}</span>
    <textarea class="memory__text" bind:value={newMemory} placeholder="Today I..."></textarea>
    <button class="memory__save" on:click={saveMemory}>Save</button>
    <button class="memory__close" on:click={closeCard}>x</button>
  </article>
</div>

<style>
  .memory {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .memory__overlay {
    position: absolute;
    background: black;
    opacity: 0.2;
    width: 100%;
    height: 100%;
    transition: trasform 0.3s;
  }

  .memory__card {
    --card-color: var(--color-red);
    position: relative;
    margin: 10px;
    padding: 20px;
    border-radius: 10px;
    width: 500px;
    max-width: 100%;
    height: 400px;
    max-height: 100%;
    background: var(--card-color);
    transition: transform 0.3s;
    transform: translateY(0);
    display: flex;
    flex-direction: column;
  }

  .memory__date {
    position: absolute;
    top: 0;
    left: 0;
    margin: 10px;
    font-size: 12px;
  }
  
  .memory__close {
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px;
    padding: 10px;
    width: 30px;
    height: 30px;
    line-height: 10px;
    background: none;
    border: none;
    box-shadow: none;
  }

  .memory__close:active {
    background: none;
    border: none;
    box-shadow: none;
  }

  .memory__text {
    outline: none;
    border: none;
    flex: 1;
    resize: none;
    background-color: var(--card-color);
    margin: 10px 0;
  }
</style>