<script>
  import { fly, fade } from 'svelte/transition';
  import { onMount, onDestroy } from 'svelte';
  export let date;
  export let cardColor = "red";
  export let close;
  export let action = null;

  const formatter = new Intl.DateTimeFormat('en-gb', { year: 'numeric', month: 'short', day: '2-digit' }) ;
  let formattedDate;

  $: if (date) {
    const dat = new Date(date);
    formattedDate = formatter.format(dat);
  }

  let modal;

  const handleKeydown = e => {
    if (e.key === 'Escape') {
      close();
      return;
    }

    if (e.key === 'Tab') {
      // trap focus
      const nodes = modal.querySelectorAll('*');
      const tabbable = Array.from(nodes).filter(n => n.tabIndex >= 0 && !n.disabled);

      let index = tabbable.indexOf(document.activeElement);
      if (index === -1 && e.shiftKey) index = 0;

      index += tabbable.length + (e.shiftKey ? -1 : 1);
      index %= tabbable.length;

      tabbable[index].focus();
      e.preventDefault();
    }
  };
  
  const previouslyFocused = typeof document !== 'undefined' && document.activeElement;

  if (previouslyFocused) {
    onDestroy(() => {
      previouslyFocused.focus();
    });
  }
</script>

<svelte:window on:keydown={handleKeydown}/>

<div class="modal" role="dialog" aria-modal="true" bind:this={modal}>
  <div
    transition:fade="{{ duration: 300 }}"
    on:click={close}
    class="modal__overlay"
  ></div>
  <article
    transition:fly="{{ y: 500, duration: 300 }}"
    style="--card-color: var(--color-{cardColor});"
    class="modal__card">
    {#if date}
      <span class="modal__date">{formattedDate}</span>
    {/if}
    <div class="modal__body">
      <slot name="content"></slot>
    </div>
    <button class="modal__button modal__button--close" autofocus on:click={close}>
      <i class="material-icons">close</i>
    </button>
    {#if action}
      <button class="modal__button modal__button--action" on:click={action}>
        <slot name="action"></slot>
      </button>
    {/if}
  </article>
</div>

<style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 30;
  }

  .modal__overlay {
    position: absolute;
    background: black;
    opacity: 0.2;
    width: 100%;
    height: 100%;
    transition: trasform 0.3s;
  }

  .modal__card {
    --card-color: var(--color-red);
    position: relative;
    margin: 10px;
    padding: 40px;
    border-radius: 10px;
    width: 500px;
    max-width: 100%;
    height: 400px;
    max-height: 100%;
    background: var(--card-color);
    display: flex;
    flex-direction: column;
    box-shadow: 0 11px 15px -7px rgba(0,0,0,.2), 0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12);
  }

  .modal__date {
    position: absolute;
    top: 0;
    left: 0;
    margin: 10px;
    font-size: 0.8rem;
  }

  .modal__body {
    word-break:  break-word;
    white-space: pre-wrap;
    overflow-y: auto;
    flex: 1;
  }
  
  .modal__button {
    margin: 10px;
    padding: 0;
    width: 30px;
    height: 30px;
    line-height: 10px;
    background: none;
    border: none;
    box-shadow: none;
    border-radius: 50%;
  }

  .modal__button:active {
    background: none;
    border: none;
    box-shadow: none;
  }

  .modal__button:hover,.modal__button:focus {
    background-color: rgba(0, -0, 0, 0.1);
  }

  .modal__button--close {
    position: absolute;
    top: 0;
    right: 0;
  }

  .modal__button--action {
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>
