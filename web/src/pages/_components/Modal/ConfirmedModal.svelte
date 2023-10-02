<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';

	export let isOpen: boolean;

	const dispatch = createEventDispatcher();

	const closeModal = () => {
		isOpen = false;
	};

	const onKeyDownHandler = (event: KeyboardEvent) => {
		let stopDefaultBehaviourFlag = false;

		if (event.key === 'Escape' && isOpen) {
			closeModal();
			stopDefaultBehaviourFlag = true;
		}

		if (stopDefaultBehaviourFlag) {
			event.preventDefault();
			event.stopPropagation();
		}
	};

	onMount(() => {
		document.addEventListener('keydown', onKeyDownHandler);
		return () => {
			document.removeEventListener('keydown', onKeyDownHandler);
		};
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if isOpen}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="modal" on:click|self={closeModal} transition:fly>
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<div
			on:click|stopPropagation
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			id="modal-wrapper"
		>
			<h3 id="modal-title">Você tem certeza?</h3>
			<div class="button-container">
				<button
					type="button"
					on:click={() => dispatch('confirmed')}
					class="confirm-button">Sim</button
				>
				<button type="button" on:click={closeModal} class="cancel-button"
					>Cancelar</button
				>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	@import '../theme/all';

	.modal {
		align-items: center;
		background-color: rgb(0 0 0 / 32%);
		bottom: 0;
		display: flex;
		justify-content: center;
		left: 0;
		position: fixed;
		right: 0;
		top: 0;
		z-index: 16000003;

		#modal-wrapper {
			align-items: center;
			background: my-trips-color(dark-slate);
			border-radius: 1rem;
			box-shadow: 0 0.75rem 1.5rem 0 rgb(0 0 0 / 12%);
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			height: 12.5rem;
			justify-content: center;
			max-height: calc(100vh - 8rem);
			max-width: 37.625rem;
			padding: 1.5rem 4rem;
			position: relative;
			width: 35rem;

			#modal-title {
				font-size: 1.5rem;
				color: my-trips-color(pure-white);
				margin-bottom: 2rem;
			}

			.button-container {
				display: flex;
				justify-content: center;
				gap: 1rem;

				.confirm-button,
				.cancel-button {
					padding: 0.5rem 1rem;
					border: none;
					border-radius: 0.25rem;
					cursor: pointer;
					font-size: 1rem;
					color: my-trips-color(pure-white);
					background-color: transparent;
					transition: background-color 0.3s;
				}

				.confirm-button {
					border: 0.0625rem solid my-trips-color(fiery-red);

					&:hover {
						background-color: my-trips-color(brick-red);
					}
				}

				.cancel-button {
					background-color: my-trips-color(ocean-blue);

					&:hover {
						background-color: my-trips-color(cerulean-blue);
					}
				}
			}
		}
	}
</style>
