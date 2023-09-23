<script lang="ts">
  import axios, { AxiosError } from "axios";
  import FormRegister from "./FormRegister.svelte";
  import Cookies from "js-cookie";

  export let title = "",
    isRegister = false,
    buttonText = "";

  let incorrectPassword = false,
    incorrectUser = false,
    userWithSameEmail = false;

  const createUser = async (e: Event) => {
    const form = e.target as HTMLFormElement;
    const name = form?.name.value;
    const email = form?.email.value;
    const password = form?.password.value;
    userWithSameEmail = false;

    const body = {
      name,
      email,
      password,
    };
    try {
      const response = await axios.post("/api/auth/register", body);

      if (response.status === 201) {
        await authenticateUser(e);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 409) {
        userWithSameEmail = true;
      }
    }
  };

  const authenticateUser = async (e: Event) => {
    const form = e.target as HTMLFormElement;
    const email = form?.email.value;
    const password = form?.password.value;
    incorrectPassword = false;
    incorrectUser = false;

    const body = {
      email,
      password,
    };

    try {
      const response = await axios.post("/api/auth/session", body);
      Cookies.set("token", response.data.token);

      if (response.data) {
        window.location.assign("/new-place");
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
  onSubmit={isRegister ? createUser : authenticateUser}
/>
