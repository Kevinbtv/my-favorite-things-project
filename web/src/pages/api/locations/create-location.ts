import type { APIRoute } from "astro";
import { createDataApi } from "../../../service/api";

export const POST: APIRoute = async ({ request }) => {
  const response = await request.json();

  try {
    const data = await createDataApi(response);

    return new Response(null, { status: data?.status });
  } catch (error) {
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
    });
  }
};
