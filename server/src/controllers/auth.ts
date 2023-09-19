import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import {
  CustomSessionObject,
  loginBodySchema,
  registerBodySchema,
} from "../@types/auth";

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { name, email, password } = registerBodySchema.parse(request.body);

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return reply.status(400).send("Email de usuário já existe");
    }

    const hashedPassword = await bcrypt.hash(password, 6);

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

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
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

    const session = request.session as CustomSessionObject;

    session.user = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    console.log(session.user);

    return reply.status(200).send("Login bem-sucedido");
  } catch (error) {
    reply.status(500).send("Erro interno do servidor");
  }
};
