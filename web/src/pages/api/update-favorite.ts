import type { APIRoute } from "astro";
import { editDataApi, toggleFavoriteData } from "../../service/api";

export const PATCH: APIRoute = async ({ request }) => {
  const response = await request.json();

  try {
    const data = await toggleFavoriteData(response.id);

    return new Response(JSON.stringify(data?.data), {
      status: data?.status,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
    });
  }
};
