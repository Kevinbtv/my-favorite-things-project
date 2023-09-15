<script lang="ts">
  import { onMount } from "svelte";
  import {
    deleteDataApi,
    editDataApi,
    getDataApi,
    toggleFavoriteData,
  } from "../../service/api";
  import Modal from "./Modal/Modal.svelte";
  import ConfirmedModal from "./Modal/ConfirmedModal.svelte";
  import type { FormData, UserData } from "./@types";

  let locations: Array<UserData> = [],
    local = "",
    country = "",
    description = "",
    id = "",
    editingIndex = -1,
    hasList: boolean,
    isOpen = false,
    isOpenConfirmed = false;

  let formData: FormData;
  $: formData = { local, country, description };

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
      ({ local, country, description, id } = locationToEdit);
      editingIndex = locations.indexOf(locationToEdit);
      isOpen = true;
    }
  };
  const editFormData = async () => {
    isOpen = false;
    return await editDataApi(id, formData);
  };

  const updateLocation = (identifier: string) => {
    const locationToEdit = locations.find((loc) => loc.id === identifier);
    if (locationToEdit) {
      Object.assign(locationToEdit, formData);
      locations = [...locations];

      editFormData();
    }
  };

  const areYouSure = (identifier: string) => {
    id = identifier;
    isOpenConfirmed = true;
  };

  const deleteLocation = async (identifier: string) => {
    const locationIndex = locations.findIndex((loc) => loc.id === identifier);
    if (locationIndex !== -1) {
      locations.splice(locationIndex, 1);
      locations = [...locations];
    }
    isOpenConfirmed = false;
    return await deleteDataApi(identifier);
  };

  $: {
    if (locations.length === 0) {
      hasList = false;
    }
  }

  onMount(async () => {
    await getInfo();
  });
</script>

<Modal bind:formData bind:isOpen on:editFormData={() => updateLocation(id)} />
<ConfirmedModal
  bind:isOpen={isOpenConfirmed}
  on:confirmed={() => deleteLocation(id)}
/>

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
            class:favorite-button={!!location.favorite}
            on:click={() => toggleFavorite(location.id)}
          >
            {#if location.favorite}
              Remover dos Favoritos
            {:else}
              Adicionar aos Favoritos
            {/if}
          </button>
          <button
            type="button"
            class="edit-button"
            on:click={() => editLocation(location.id)}>Editar</button
          >

          <button
            type="button"
            class="delete-button"
            on:click={() => areYouSure(location.id)}
          >
            Excluir
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
    background: #1f222a;
    border: 0.0625rem solid #36393f;
    border-radius: 0.625rem;
    padding: 1.25rem;
    margin-bottom: 1.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .favorite-star {
    color: gold;
    font-size: 1.25rem;
    margin-right: 0.3125rem;
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
    margin-left: 0.625rem;
  }

  .location-actions {
    display: flex;
    align-items: center;
  }

  button {
    background-color: #2e7d32;
    color: #fff;
    border: none;
    border-radius: 0.3125rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    margin-left: 0.625rem;
    font-weight: bold;
  }

  button.edit-button {
    background-color: #1976d2;
  }

  button.favorite-button {
    color: #000;
    background-color: #ffc107;
  }

  button.delete-button {
    background-color: #f44336;
  }
</style>
