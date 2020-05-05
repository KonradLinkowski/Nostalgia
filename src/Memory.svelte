<script>
  import Modal from './Modal.svelte';
  export let memory;
  export let close;
</script>

<Modal date={memory.date} close={close}>
  <p slot="content" class="memory__text">{ memory.text }</p>
</Modal>

<style>
</style>