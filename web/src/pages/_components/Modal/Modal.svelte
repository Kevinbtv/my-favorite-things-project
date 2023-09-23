<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import Form from '../Form.svelte';
	import type { FormData } from '../@types';

	export let isOpen: boolean, formData: FormData;
	$: formData;

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
			<Form
				bind:formData
				buttonName="Salvar"
				submitFunction={() => dispatch('editFormData')}
			/>
			<button type="button" on:click={closeModal} id="modal-close">
				Fechar modal
			</button>
		</div>
	</div>
{/if}

<style lang="scss">
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
			background: #232426;
			border-radius: 1rem;
			box-shadow: 0 0.75rem 1.5rem 0 rgb(0 0 0 / 12%);
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			max-height: calc(100vh - 8rem);
			max-width: 37.625rem;
			padding: 1.5rem 4rem;
			position: relative;
			width: 35rem;

			#modal-close {
				align-self: start;
				background-color: #fff;
				border: none;
				background-position: center;
				background-repeat: no-repeat;
				color: transparent;
				cursor: pointer;
				font-size: 0;
				height: 1.5rem;
				line-height: 0;
				margin-right: 1rem;
				background-image: url('./assets/modal_fechar.svg');
				margin-top: 0.5rem;
				position: absolute;
				right: 0;
				text-shadow: none;
				width: 1.5rem;
			}
		}
	}
</style>
