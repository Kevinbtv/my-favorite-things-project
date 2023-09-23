import type { APIRoute } from "astro";
import { createDataApi } from "../../../service/api";

export const POST: APIRoute = async ({ request }) => {
  const response = await request.json();
  const { formData, token } = response;

  try {
    const data = await createDataApi(formData, token);

    return new Response(null, { status: data?.status });
  } catch (error) {
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
    });
  }
};
