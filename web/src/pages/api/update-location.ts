import type { APIRoute } from "astro";
import { editDataApi } from "../../service/api";

export const PUT: APIRoute = async ({ request }) => {
  const response = await request.json();
  const { id, formData } = response;

  try {
    const data = await editDataApi(id, formData);

    return new Response(null, { status: data?.status });
  } catch (error) {
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
    });
  }
};
