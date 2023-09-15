<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";

  export let isOpen: boolean;

  const dispatch = createEventDispatcher();

  const closeModal = () => {
    isOpen = false;
  };

  const onKeyDownHandler = (event: KeyboardEvent) => {
    let stopDefaultBehaviourFlag = false;

    if (event.key === "Escape" && isOpen) {
      closeModal();
      stopDefaultBehaviourFlag = true;
    }

    if (stopDefaultBehaviourFlag) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  onMount(() => {
    document.addEventListener("keydown", onKeyDownHandler);
    return () => {
      document.removeEventListener("keydown", onKeyDownHandler);
    };
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if isOpen}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="modal" on:click|self={closeModal} transition:fly>
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <div
      on:click|stopPropagation
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      id="modal-wrapper"
    >
      <h3 id="modal-title">Você tem certeza?</h3>
      <div class="button-container">
        <button
          type="button"
          on:click={() => dispatch("confirmed")}
          class="confirm-button">Sim</button
        >
        <button type="button" on:click={closeModal} class="cancel-button"
          >Cancelar</button
        >
      </div>
    </div>
  </div>
{/if}

<style>
  .modal {
    align-items: center;
    background-color: rgb(0 0 0 / 32%);
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 16000003;
  }

  #modal-wrapper {
    background: #232426;
    border-radius: 1rem;
    box-shadow: 0 0.75rem 1.5rem 0 rgb(0 0 0 / 12%);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: calc(100vh - 8rem);
    max-width: 37.625rem;
    padding: 1.5rem 4rem;
    position: relative;
    justify-content: center;
    height: 12.5rem;
    width: 35rem;
  }

  #modal-title {
    font-size: 1.5rem;
    color: #fff;
    margin-bottom: 2rem;
  }

  .button-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .confirm-button,
  .cancel-button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 1rem;
    color: #fff;
    background-color: #007bff;
    transition: background-color 0.2s, transform 0.2s;
  }

  .confirm-button:hover {
    background-color: #0056b3;
  }

  .cancel-button {
    background-color: #dc3545;
  }

  .cancel-button:hover {
    background-color: #c82333;
  }
</style>
