<script lang="ts">
  import { createDataApi } from "../../service/api";
  import Form from "./Form.svelte";
  import type { FormData } from "./@types";

  let local = "",
    country = "",
    description = "",
    feedbackMessage = "",
    formData: FormData;

  $: formData = { local, country, description };

  const createFormData = async () => {
    const response = await createDataApi(formData);

    if (response) {
      formData = {
        local: "",
        country: "",
        description: "",
      };
      feedbackMessage = "Envio feito com sucesso!";
    } else {
      feedbackMessage = "Erro ao enviar os dados.";
    }
  };
</script>

<Form
  bind:formData
  submitFunction={createFormData}
  buttonName="Adicionar local"
  bind:feedBack={feedbackMessage}
/>
