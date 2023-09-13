<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { createDataApi, editDataApi } from "../../service/api";

  interface Location {
    local: string;
    country: string;
    description: string;
    favorite: boolean;
  }

  type FormData = Omit<Location, "favorite">;

  export let local = "",
    country = "",
    description = "",
    formData: FormData | undefined = undefined,
    feedbackMessage = "",
    id = "",
    isModal = false,
    isOpen;

  const dispatch = createEventDispatcher();

  const editFormData = async () => {
    const body = {
      local,
      country,
      description,
    };
    const response = await editDataApi(id, body);
    dispatch("editFormData");
    isOpen = false;
    return response;
  };

  const createFormData = async () => {
    formData = { local, country, description };
    await createDataApi(formData);

    local = "";
    country = "";
    description = "";
    feedbackMessage = "Envio feito com sucesso!";
  };
</script>

<h2>Locais Favoritos para Visitar</h2>

<form on:submit|preventDefault={createFormData}>
  <label>
    Local:
    <input type="text" bind:value={local} />
  </label>
  <label>
    País:
    <input type="text" bind:value={country} />
  </label>
  <label>
    Descrição:
    <textarea bind:value={description} />
  </label>
  <div class="actions">
    {#if feedbackMessage}
      <div class="feedback">{feedbackMessage}</div>
    {/if}
    {#if isModal}
      <button type="button" on:click={editFormData}>Salvar</button>
    {:else}
      <button type="submit">Adicionar Local</button>
    {/if}
  </div>
</form>

<style>
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-bottom: 10px;
  }

  input[type="text"],
  textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
  }

  textarea {
    height: 200px;
  }

  button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #0056b3;
  }

  .feedback {
    color: #009900;
    font-weight: bold;
    margin-top: 10px;
  }
</style>
