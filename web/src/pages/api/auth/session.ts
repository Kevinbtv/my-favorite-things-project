import type { APIRoute } from "astro";
import { authenticate } from "../../../service/api";
import type { AxiosError } from "axios";

export const POST: APIRoute = async ({ request }) => {
  const response = await request.json();

  try {
    const data = await authenticate(response);

    return new Response(JSON.stringify(data?.data), { status: data?.status });
  } catch (error) {
    const AxiosError = error as AxiosError;
    return new Response(JSON.stringify(AxiosError.response?.data), {
      status: AxiosError.response?.status,
    });
  }
};
