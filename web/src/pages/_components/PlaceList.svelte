<script lang="ts">
	import axios from 'axios';
	import Modal from './Modal/Modal.svelte';
	import ConfirmedModal from './Modal/ConfirmedModal.svelte';
	import type { FormData, UserData } from './@types';

	export let locations: UserData[] = [],
		hasList: boolean;

	let local = '',
		country = '',
		description = '',
		id = '',
		editingIndex = -1,
		isOpen = false,
		isOpenConfirmed = false;

	let formData: FormData;
	$: formData = { local, country, description };

	const toggleFavorite = async (identifier: string) => {
		const body = {
			id: identifier,
		};
		const response = await axios.patch('/api/locations/update-favorite', body);
		const location = locations.find((loc) => loc.id === identifier);
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
		const body = {
			id,
			formData,
		};
		return await axios.put('/api/locations/update-location', body);
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
		const body = {
			id: identifier,
		};
		return axios.post('/api/locations/delete-location', body);
	};

	$: {
		if (locations.length === 0) {
			hasList = false;
		}
	}
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

<style lang="scss">
	.location-list {
		list-style: none;
		padding: 0;

		li {
			align-items: center;
			background: #1f222a;
			border-radius: 0.625rem;
			border: 0.0625rem solid #36393f;
			display: flex;
			justify-content: space-between;
			margin-bottom: 1.25rem;
			padding: 1.25rem;

			.location-info {
				align-items: center;
				display: flex;
				width: 60%;

				.favorite-star {
					color: gold;
					font-size: 1.25rem;
					margin-right: 0.3125rem;
				}

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
				align-items: center;
				display: flex;
			}
		}
	}

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

		&:hover {
			background-color: #256e28;
		}

		&.edit-button {
			background-color: #1976d2;

			&:hover {
				background-color: #1565c0;
			}
		}

		&.favorite-button {
			background-color: #ffc107;
			color: #000;

			&:hover {
				background-color: #ffab00;
				color: #000;
			}
		}

		&.delete-button {
			background-color: #f44336;

			&:hover {
				background-color: #d32f2f;
			}
		}
	}
</style>
