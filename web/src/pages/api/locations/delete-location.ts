import type { APIRoute } from 'astro';
import { deleteDataApi } from '../../../service/api';

export const POST: APIRoute = async ({ request }) => {
	const response = await request.json();
	const { id } = response;

	try {
		const data = await deleteDataApi(id);

		return new Response(null, { status: data?.status });
	} catch (error) {
		return new Response(JSON.stringify({ error: 'An error occurred' }), {
			status: 500,
		});
	}
};
