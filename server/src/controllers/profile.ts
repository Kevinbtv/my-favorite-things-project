import { FastifyReply, FastifyRequest } from "fastify";
import { getUser } from "./users";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = await getUser(request, reply, request.user.sub);

  return reply.status(200).send({
    user: {
      ...getUserProfile,
      password: undefined,
    },
  });
}
