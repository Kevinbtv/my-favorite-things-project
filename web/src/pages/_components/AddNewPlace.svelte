<script lang="ts">
	import axios from 'axios';
	import Form from './Form.svelte';
	import type { FormData } from './@types';

	export let token: string;

	let local = '',
		country = '',
		description = '',
		feedbackMessage = '',
		formData: FormData;

	$: formData = { local, country, description };

	const createFormData = async () => {
		const response = await axios.post('/api/locations/create-location', {
			formData,
			token,
		});

		if (response) {
			formData = {
				local: '',
				country: '',
				description: '',
			};
			feedbackMessage = 'Envio feito com sucesso!';
		} else {
			feedbackMessage = 'Erro ao enviar os dados.';
		}
	};
</script>

<Form
	bind:formData
	submitFunction={createFormData}
	buttonName="Adicionar local"
	bind:feedBack={feedbackMessage}
/>
