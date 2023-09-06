<script lang="ts">
  import { onMount } from "svelte";
  import { createDataApi, deleteDataApi, getDataApi } from "../../service/api";

  interface BodyData {
    id: string;
    local: string;
    country: string;
    description: string;
  }

  interface FormData {
    local: string;
    country: string;
    description: string;
  }

  let mounted = false;
  let local: string;
  let country: string;
  let description: string;
  let formData: FormData;
  let responseData: BodyData[] = [];

  const handlleSubmit = async () => {
    formData = { local, country, description };
    const response = await createDataApi(formData);

    if (response?.status) {
      getInfo();
    }
  };

  const getInfo = async () => {
    const response = await getDataApi();

    if (response?.data) {
      responseData = response.data;
    }
  };

  const deleteInfo = async (id: string) => {
    const response = await deleteDataApi(id);

    if (response?.status) {
      getInfo();
    }
  };

  onMount(() => {
    mounted = true;

    getInfo();
  });
</script>

<form
  class="default-grid-form"
  method="POST"
  novalidate={mounted}
  on:submit|preventDefault={handlleSubmit}
>
  <div>
    <label for="local">Local</label>
    <input type="text" name="local" id="local" bind:value={local} />
  </div>

  <div>
    <label for="local">País</label>
    <input type="text" name="country" id="country" bind:value={country} />
  </div>

  <div>
    <label for="local">Descrição</label>
    <textarea name="description" id="description" bind:value={description} />
  </div>

  <button type="submit">Enviar</button>
</form>

<div>
  {#each responseData as data}
    <div>
      <p>{data.id}</p>
      <p>{data.local}</p>
      <p>{data.country}</p>
      <p>{data.description}</p>
      <button on:click={() => deleteInfo(data.id)}>Deleta isso</button>
    </div>
  {/each}
</div>
