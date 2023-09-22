import type { APIRoute } from "astro";
import { authenticate, register } from "../../../service/api";

export const POST: APIRoute = async ({ request }) => {
  const response = await request.json();

  try {
    const data = await authenticate(response);

    return new Response(JSON.stringify(data?.data), { status: data?.status });
  } catch (error) {
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
    });
  }
};
