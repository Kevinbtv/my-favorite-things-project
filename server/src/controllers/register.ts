import { FastifyReply, FastifyRequest } from "fastify";
import bcryptjs from "bcryptjs";
import { registerBodySchema } from "../@types/auth";
import { prisma } from "../lib/prisma";

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { name, email, password } = registerBodySchema.parse(request.body);

    const hashedPassword = await bcryptjs.hash(password, 6);

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      return reply.status(409).send("Email de usuário já existe");
    }

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return reply.status(201).send("Usuário registrado com sucesso");
  } catch (error) {
    reply.status(500).send("Erro interno do servidor");
  }
};
