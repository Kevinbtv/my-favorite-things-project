import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { loginBodySchema } from "../@types/auth";

export const authenticate = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { email, password } = loginBodySchema.parse(request.body);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return reply.status(404).send("Usuário não encontrado");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return reply.status(401).send("Senha incorreta");
    }

    const token = await reply.jwtSign(
      {
        name: user.name,
        email: user.email,
      },
      {
        sign: {
          sub: user.id,
        },
      }
    );

    return reply.status(200).send({
      token,
    });
  } catch (error) {
    reply.status(500).send("Erro interno do servidor");
  }
};
