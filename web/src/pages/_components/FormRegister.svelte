<script lang="ts">
  export let title: string,
    onSubmit: () => void,
    isRegister = false,
    buttonText = "",
    incorrectPassword: boolean,
    incorrectUser: boolean,
    userWithSameEmail: boolean;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<form on:submit|preventDefault={onSubmit}>
  <h2>{title}</h2>
  {#if isRegister}
    <div class="form-group">
      <label for="name">Nome</label>
      <input type="text" id="name" name="name" required />
    </div>
  {/if}
  <div class="form-group">
    <label for="email">E-mail</label>
    <input type="email" id="email" name="email" required />
    {#if incorrectUser}
      <span>E-mail não cadastrado</span>
    {:else if userWithSameEmail}
      <span>E-mail já cadastrado</span>
    {/if}
  </div>
  <div class="form-group">
    <label for="password">Senha</label>
    <input type="password" id="password" name="password" required />
    {#if incorrectPassword}
      <p>Senha incorreta</p>
    {/if}
  </div>
  <button type="submit">{buttonText}</button>
</form>

<style>
  form {
    background-color: #1e2127;
    color: #ffffff;
    border-radius: 5px;
    padding: 20px;
    width: 300px;
    margin: 0 auto;
    margin-top: 50px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  }

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
  }

  span {
    display: inline-block;
    margin-top: 4px;
    font-size: 14px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  label {
    padding-left: 5px;
    padding-right: 5px;
    position: relative;
    bottom: -12px;
    left: 10px;
    background-color: #1e2127;
    font-size: 12px;
  }

  input {
    width: 100%;
    padding: 1rem;
    font-size: 16px;
    background-color: #1e2127;
    border: 1px solid #45494f;
    border-radius: 5px;
    color: #ffffff;
    box-sizing: border-box;
    font-size: 1rem;
  }

  button[type="submit"] {
    background-color: #3498db;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
  }

  button[type="submit"]:hover {
    background-color: #2980b9; /* Cor do botão ao passar o mouse */
  }
</style>
