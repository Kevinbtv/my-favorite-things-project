import { register } from "../../../service/api";
import type { APIRoute } from "astro";
import type { AxiosError } from "axios";

export const POST: APIRoute = async ({ request }) => {
  const response = await request.json();

  try {
    const data = await register(response);

    return new Response(null, { status: data?.status });
  } catch (error) {
    const AxiosError = error as AxiosError;
    return new Response(JSON.stringify(AxiosError.response?.data), {
      status: AxiosError.response?.status,
    });
  }
};
