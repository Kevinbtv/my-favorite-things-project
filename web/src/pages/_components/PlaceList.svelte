<script lang="ts">
  import { onMount } from "svelte";
  import {
    deleteDataApi,
    getDataApi,
    editDataApi,
    toggleFavoriteData,
  } from "../../service/api";

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
    formData: FormData,
    hasList: boolean,
    isFavorite: boolean;

  const getInfo = async () => {
    const response = await getDataApi();

    if (response?.data) {
      locations = response.data;
      hasList = locations.some((location) => location);
    }
  };

  const toggleFavorite = async (id: string) => {
    const response = await toggleFavoriteData(id);
    const location = locations.find((loc) => loc.id === id);
    if (location) {
      location.favorite = response?.data;
      locations = [...locations];
    }
  };

  onMount(async () => {
    await getInfo();
  });
</script>

<h2>Lista de Locais Favoritos:</h2>
{#if hasList}
  <ul class="location-list">
    {#each locations as location}
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
          <button type="button">Editar</button>
          <button type="button" on:click={() => toggleFavorite(location.id)}>
            {#if location.favorite}
              Remover dos Favoritos
            {:else}
              Adicionar aos Favoritos
            {/if}
          </button>
        </div>
      </li>
    {/each}
  </ul>
{:else}
  <p>Não há listas</p>
{/if}

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
