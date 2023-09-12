<script lang="ts">
  import { onMount } from "svelte";
  import { deleteDataApi, getDataApi, editDataApi } from "../../service/api";

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

  const getInfo = async () => {
    const response = await getDataApi();

    if (response?.data) {
      locations = response.data;
    }
  };

  onMount(async () => {
    await getInfo();
  });
</script>

<h2>Lista de Locais Favoritos:</h2>
<ul class="location-list">
  {#each locations as location, i}
    <li>
      <div class="location-info">
        {#if location.favorite}
          <span class="favorite-star">★</span>
        {/if}
        <div class="location-details">
          <p><strong class="field-label">Local:</strong> {location.local}</p>
          <p><strong class="field-label">País:</strong> {location.country}</p>
          <p>
            <strong class="field-label">Descrição:</strong>
            {location.description}
          </p>
        </div>
      </div>
      <div class="location-actions">
        {#if editingIndex === -1}
          <button type="button">Editar</button>
          <button type="button">
            {#if location.favorite}
              Remover dos Favoritos
            {:else}
              Adicionar aos Favoritos
            {/if}
          </button>
        {:else}
          <button type="button">Cancelar</button>
          <button type="button">Salvar</button>
        {/if}
      </div>
    </li>
  {/each}
</ul>

<style>
  ul.location-list {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 20px;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
  }

  .favorite-star {
    color: gold;
    font-size: 20px;
    margin-right: 5px;
  }

  .field-label {
    font-weight: bold;
  }

  .location-info {
    display: flex;
    align-items: center;
  }

  .location-details {
    margin-left: 10px;
  }

  .location-actions {
    margin-top: 10px;
  }
</style>
