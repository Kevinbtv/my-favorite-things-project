<script lang="ts">
  import type { FormData } from "./@types";

  export let formData: FormData,
    submitFunction: () => void,
    buttonName: string,
    feedBack = "";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<form
  on:submit|preventDefault={submitFunction}
  on:click={() => (feedBack = "")}
>
  <label>
    Local:
    <input type="text" bind:value={formData.local} required />
  </label>
  <label>
    País:
    <input type="text" bind:value={formData.country} required />
  </label>
  <label>
    Descrição:
    <textarea bind:value={formData.description} required />
  </label>

  <button type="submit">{buttonName}</button>
</form>
{#if feedBack}
  <p class="feedback">Enviado com sucesso!</p>
{/if}

<style>
  label {
    display: block;
    margin-bottom: 0.625rem;
  }

  input[type="text"],
  textarea {
    width: 100%;
    padding: 0.625rem;
    margin-bottom: 0.625rem;
    border: 0.0625rem solid #ccc;
    border-radius: 0.3125rem;
    box-sizing: border-box;
  }

  textarea {
    height: 12.5rem;
  }

  button {
    background-color: #007bff;
    color: #fff;
    padding: 0.625rem 1.25rem;
    border: none;
    border-radius: 0.3125rem;
    cursor: pointer;
    margin-right: 0.625rem;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #0056b3;
  }

  .feedback {
    color: #009900;
    font-weight: bold;
    margin-top: 0.625rem;
  }
</style>
