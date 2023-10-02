<script lang="ts">
	export let title: string,
		onSubmit: (e: Event) => Promise<void>,
		isRegister = false,
		buttonText = '',
		incorrectPassword: boolean,
		incorrectUser: boolean,
		userWithSameEmail: boolean,
		formData = {
			name: '',
			email: '',
			password: '',
		};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<form on:submit|preventDefault={onSubmit}>
	<h2>{title}</h2>
	{#if isRegister}
		<div class="form-group">
			<label for="name">Nome</label>
			<input
				type="text"
				id="name"
				name="name"
				bind:value={formData.name}
				required
			/>
		</div>
	{/if}
	<div class="form-group">
		<label for="email">E-mail</label>
		<input
			type="email"
			id="email"
			name="email"
			bind:value={formData.email}
			required
		/>
		{#if incorrectUser}
			<span>E-mail não cadastrado</span>
		{:else if userWithSameEmail}
			<span>E-mail já cadastrado</span>
		{/if}
	</div>
	<div class="form-group">
		<label for="password">Senha</label>
		<input
			type="password"
			id="password"
			name="password"
			bind:value={formData.password}
			required
		/>
		{#if incorrectPassword}
			<span>Senha incorreta</span>
		{/if}
	</div>
	<button type="submit">{buttonText}</button>
</form>

<style lang="scss">
	@import './theme/all';

	form {
		background-color: my-trips-color(charcoal);
		border-radius: 0.3125rem;
		box-shadow: 0 0.125rem 0.625rem rgba(0, 0, 0, 0.1);
		color: my-trips-color(pure-white);
		margin-top: 3.125rem;
		margin: 0 auto;
		padding: 1.25rem;
		width: 18.75rem;

		h2 {
			font-size: 1.5rem;
			margin-bottom: 1.25rem;
			text-align: center;
		}

		.form-group {
			margin-bottom: 1.25rem;

			label {
				background-color: my-trips-color(charcoal);
				bottom: -0.75rem;
				font-size: 0.75rem;
				left: 0.625rem;
				padding-left: 0.3125rem;
				padding-right: 0.3125rem;
				position: relative;
			}

			input {
				background-color: my-trips-color(charcoal);
				border-radius: 0.3125rem;
				border: 0.0625rem solid my-trips-color(steel-gray);
				box-sizing: border-box;
				color: my-trips-color(pure-white);
				font-size: 1rem;
				font-size: 1rem;
				padding: 1rem;
				width: 100%;
			}

			span {
				display: inline-block;
				font-size: 0.875rem;
				margin-top: 0.25rem;
			}
		}

		button {
			background-color: my-trips-color(ocean-blue);
			border-radius: 0.3125rem;
			border: none;
			color: my-trips-color(pure-white);
			cursor: pointer;
			font-size: 1rem;
			padding: 0.625rem 1.25rem;
			transition: background-color 0.3s;
			width: 100%;

			&:hover {
				background-color: my-trips-color(cerulean-blue);
			}
		}
	}
</style>
