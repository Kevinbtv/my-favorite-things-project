<script lang="ts">
	import axios, { AxiosError } from 'axios';
	import FormRegister from './FormRegister.svelte';
	import Cookies from 'js-cookie';

	export let title = '',
		isRegister = false,
		buttonText = '';

	let incorrectPassword = false,
		incorrectUser = false,
		userWithSameEmail = false,
		formData = {
			name: '',
			email: '',
			password: '',
		};

	const createUser = async () => {
		userWithSameEmail = false;

		try {
			const response = await axios.post('/api/auth/register', formData);

			if (response.status === 201) {
				await authenticateUser();
			}
		} catch (error) {
			const axiosError = error as AxiosError;
			if (axiosError.response?.status === 409) {
				userWithSameEmail = true;
			}
		}
	};

	const authenticateUser = async () => {
		incorrectPassword = false;
		incorrectUser = false;

		const body = {
			...formData,
			name: undefined,
		};

		try {
			const response = await axios.post('/api/auth/session', body);
			Cookies.set('token', response.data.token);

			if (response.data) {
				window.location.assign('/new-place');
			}
		} catch (error) {
			const axiosError = error as AxiosError;
			if (axiosError.response?.status === 401) {
				incorrectPassword = true;
			}

			if (axiosError.response?.status === 404) {
				incorrectUser = true;
			}
		}
	};
</script>

<FormRegister
	{title}
	{buttonText}
	{isRegister}
	{incorrectPassword}
	{incorrectUser}
	{userWithSameEmail}
	bind:formData
	onSubmit={isRegister ? createUser : authenticateUser}
/>
