<script>
  import { onMount } from 'svelte';
  export let memory;
  export let close;

  const formatter = new Intl.DateTimeFormat('en-gb', { year: 'numeric', month: 'short', day: '2-digit' }) ;
  let hidden = true;
  let formattedDate;

  $: {
    const date = new Date(memory.date);
    formattedDate = formatter.format(date);
  }

  function closeCard() {
    hidden = true;
    setTimeout(() => {
      close();
    }, 300);
  }

  onMount(() => {
    setTimeout(() => {
      hidden = false;
    }, 10);
  });

  const colors = ['red', 'green', 'blue', 'cyan', 'orange'];
</script>

<div class="memory">
  <div
    on:click={closeCard}
    class="memory__overlay"
    class:memory__overlay--hidden={hidden}
  ></div>
  <article
    class:memory__card--hidden={hidden}
    style="--card-color: var(--color-{ colors[memory.date % colors.length] });"
    class="memory__card">
    <span class="memory__date">{formattedDate}</span>
    <p>{ memory.text }</p>
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

  .memory__overlay--hidden {
    opacity: 0;
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
  }

  .memory__card--hidden {
    transform: translateY(200%);
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
</style>