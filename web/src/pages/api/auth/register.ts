import type { APIRoute } from "astro";
import { register } from "../../../service/api";

export const POST: APIRoute = async ({ request }) => {
  const response = await request.json();
  console.log(response);

  try {
    const data = await register(response);

    return new Response(null, { status: data?.status });
  } catch (error) {
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
    });
  }
};
