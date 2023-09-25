<script lang="ts">
	import axios from 'axios';
	import type { UserData } from './@types';

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

		return await axios.patch('/api/locations/update-favorite', body);
	};
</script>

{#if hasFavorites}
	<ul class="location-list">
		{#each locations as location}
			<li class="location-card">
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
					<div class="location-actions">
						<button
							type="button"
							class:favorite-button={!!location.favorite}
							on:click={() => toggleFavorite(location.id)}
						>
							Remover dos Favoritos
						</button>
					</div>
				</div>
			</li>
		{/each}
	</ul>
{:else}
	<p>Não há favoritos</p>
{/if}

<style lang="scss">
	.location-list {
		list-style: none;
		padding: 0;
		display: flex;

		.location-card {
			padding: 1.25rem;
			background: #1f222a;
			border-radius: 0.625rem;
			border: 0.0625rem solid #36393f;
			margin-bottom: 1rem;

			.location-info {
				align-items: center;
				display: grid;
				gap: 1rem;

				.location-details {
					margin-left: 0.625rem;

					p {
						text-align: justify;
					}

					.field-label {
						color: #fff;
						font-weight: bold;
					}
				}
			}

			.location-actions {
				button {
					background-color: #2e7d32;
					border-radius: 0.3125rem;
					border: none;
					color: #fff;
					cursor: pointer;
					font-weight: bold;
					margin-left: 0.625rem;
					padding: 0.5rem 1rem;
					transition: background-color 0.3s;

					&.favorite-button {
						background-color: #ffc107;
						color: #000;

						&:hover {
							background-color: #ffab00;
						}
					}
				}
			}
		}
	}
</style>
