<script lang="ts">
  import axios from "axios";
  import type { UserData } from "./@types";

  export let locations: UserData[] = [],
    hasFavorites = false;

  const toggleFavorite = async (id: string) => {
    const locationIndex = locations.findIndex((loc) => loc.id === id);
    if (locationIndex !== -1) {
      locations.splice(locationIndex, 1);
      locations = [...locations];

      if (locations.length === 0) hasFavorites = false;
    }

    const body = {
      id,
    };

    return await axios.patch("/api/locations/update-favorite", body);
  };
</script>

{#if hasFavorites}
  <ul class="location-list">
    {#each locations as location}
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
          <button
            type="button"
            class:favorite-button={!!location.favorite}
            on:click={() => toggleFavorite(location.id)}
          >
            Remover dos Favoritos
          </button>
        </div>
      </li>
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
    background: #1f222a;
    border: 0.0625rem solid #36393f;
    border-radius: 0.625rem;
    padding: 1.25rem;
    margin-bottom: 1.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
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

  button.favorite-button {
    background-color: #f44336;
  }
</style>
