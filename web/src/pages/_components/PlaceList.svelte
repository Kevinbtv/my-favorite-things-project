<script lang="ts">
  import { onMount } from "svelte";
  import { getDataApi, toggleFavoriteData } from "../../service/api";
  import Modal from "./Modal/Modal.svelte";

  interface Location {
    id: string;
    local: string;
    country: string;
    description: string;
    favorite: boolean;
  }

  let locations: Array<Location> = [],
    local = "",
    country = "",
    description = "",
    id = "",
    editingIndex = -1,
    hasList: boolean,
    isOpen = false;

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

  const editLocation = (identifier: string) => {
    const locationToEdit = locations.find((loc) => loc.id === identifier);

    if (locationToEdit) {
      local = locationToEdit.local;
      country = locationToEdit.country;
      description = locationToEdit.description;
      id = identifier;
      editingIndex = locations.indexOf(locationToEdit);
      isOpen = true;
    }
  };

  const updateLocation = (identifier: string) => {
    const locationToEdit = locations.find((loc) => loc.id === identifier);

    if (locationToEdit) {
      locationToEdit.local = local;
      locationToEdit.country = country;
      locationToEdit.description = description;
      locations = [...locations];
      isOpen = true;
    }
  };

  onMount(async () => {
    await getInfo();
  });
</script>

<Modal
  bind:local
  bind:country
  bind:description
  bind:id
  bind:isOpen
  on:editFormData={() => updateLocation(id)}
/>

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
          <button
            type="button"
            class="edit-button"
            on:click={() => editLocation(location.id)}>Editar</button
          >
          <button
            type="button"
            class:favorite-button={!!location.favorite}
            on:click={() => toggleFavorite(location.id)}
          >
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
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  ul.location-list {
    list-style: none;
    padding: 0;
  }

  li {
    background: #1f222a;
    border: 1px solid #36393f;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .favorite-star {
    color: gold;
    font-size: 20px;
    margin-right: 5px;
  }

  .field-label {
    font-weight: bold;
    color: #fff;
  }

  .location-info {
    display: flex;
    align-items: center;
  }

  .location-details {
    margin-left: 10px;
  }

  .location-actions {
    display: flex;
    align-items: center;
  }

  button {
    background-color: #2e7d32;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 8px 16px;
    cursor: pointer;
    margin-left: 10px;
    font-weight: bold;
  }

  button.edit-button {
    background-color: #1976d2;
  }

  button.favorite-button {
    background-color: #f44336;
  }
</style>
