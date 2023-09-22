<script lang="ts">
  import axios from "axios";
  import FormRegister from "./FormRegister.svelte";
  import Cookies from "js-cookie";

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

    const response = await axios.post("/api/auth/register", body);

    if (response.status === 201) {
      await authenticateUser(e);
    }
  };

  const authenticateUser = async (e: Event) => {
    const form = e.target;
    const email = form?.email.value;
    const password = form?.password.value;

    const body = {
      email,
      password,
    };

    const response = await axios.post("/api/auth/session", body);
    Cookies.set("token", response.data.token);

    if (response.data) {
      window.location.assign("/new-place");
    }
  };
</script>

<FormRegister
  {title}
  {buttonText}
  {isRegister}
  onSubmit={isRegister ? createUser : authenticateUser}
/>
