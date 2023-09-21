<script lang="ts">
  import axios from "axios";
  import FormRegister from "./FormRegister.svelte";

  export let title = "",
    isRegister = false,
    buttonText = "";

  const createUser = async (e: Event) => {
    const form = e.target;
    const name = form?.name.value;
    const email = form?.email.value;
    const password = form?.password.value;

    const body = {
      name,
      email,
      password,
    };

    console.log(body);

    const response = await axios.post("/api/auth/register", body);
  };

  const authenticateUser = () => {
    console.log("b");
  };
</script>

<FormRegister
  {title}
  {buttonText}
  {isRegister}
  onSubmit={isRegister ? createUser : authenticateUser}
/>
