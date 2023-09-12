<script lang="ts">
  import { onMount } from "svelte";
  import { getDataApi } from "../../service/api";

  interface Location {
    local: string;
    country: string;
    description: string;
    favorite: boolean;
  }

  let locations: Array<Location> = [],
    hasFavorites = false;

  const getInfo = async () => {
    const response = await getDataApi();

    if (response?.data) {
      locations = response.data;
      hasFavorites = locations.some((location) => location.favorite);
    }
  };

  onMount(async () => {
    await getInfo();
  });
</script>

<h2>Lista de Locais Favoritos:</h2>
{#if hasFavorites}
  <ul class="location-list">
    {#each locations as location}
      {#if location.favorite}
        <li>
          <div class="location-info">
            <div class="location-details">
              <p>
                <strong class="field-label">Local:</strong>
                {location.local}
              </p>
              <p>
                <strong class="field-label">País:</strong>
                {location.country}
              </p>
              <p>
                <strong class="field-label">Descrição:</strong>
                {location.description}
              </p>
            </div>
          </div>
          <div class="location-actions">
            <button type="button">
              {#if location.favorite}
                Remover dos Favoritos
              {:else}
                Adicionar aos Favoritos
              {/if}
            </button>
          </div>
        </li>
      {/if}
    {/each}
  </ul>
{:else}
  <p>Não há favoritos</p>
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
