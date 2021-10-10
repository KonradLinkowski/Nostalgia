<script>
  import Modal from './Modal.svelte';
  export let memory;
  export let close;
  export let dele;

  let deleteModalIsOpen = false;
  function openDeleteModal() {
    deleteModalIsOpen = true;
  }

  function closeDeleteModal(del) {
    deleteModalIsOpen = false;
    dele();
  }
</script>

<Modal date={memory.date} cardColor={memory.color} close={close} action={openDeleteModal}>
  <p slot="content" class="memory__text">{ memory.text }</p>
  <i class="material-icons" slot="action">delete</i>
</Modal>
{#if deleteModalIsOpen}
  <Modal close={closeDeleteModal} date={0}>
    <div class="delete-modal" slot="content">
      <p class="delete-modal__text">Do you want to delete this Memory?</p>
      <button class="delete-modal__close" on:click={() => dele(memory.text, memory.date)}>
        <i class="delete-modal__close-icon material-icons">delete</i>
        <span>Delete Memory</span>
      </button>
    </div>
  </Modal>
{/if}

<style>
.delete-modal {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.delete-modal__text {
  font-size: 1.5rem;
  text-align: center;
  flex: 1;
}

.delete-modal__close {
    background: none;
    border: none;
    box-shadow: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid black;
    transition: transform 0.1s;
  }
  
.delete-modal__close:not(:disabled):hover,.delete-modal__close:focus {
  transform: translateY(-5px);
  box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.75);
}

.delete-modal__close:active {
  transform: translateY(0);
  box-shadow: none;
}

.delete-modal__close-icon {
  font-size: 2rem;
  margin-right: 10px;
}

.delete-modal__close:active {
  background: none;
}
</style>