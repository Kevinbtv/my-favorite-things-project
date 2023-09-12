<script lang="ts">
  import { createDataApi } from "../../service/api";

  interface Location {
    local: string;
    country: string;
    description: string;
    favorite: boolean;
  }

  type FormData = Omit<Location, "favorite">;

  let locations: Array<Location> = [],
    local = "",
    country = "",
    description = "",
    id = "",
    editingIndex = -1,
    formData: FormData;

  const createFormData = async () => {
    formData = { local, country, description };
    return await createDataApi(formData);
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
  <button type="submit">Adicionar Local</button>
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
  }
</style>
