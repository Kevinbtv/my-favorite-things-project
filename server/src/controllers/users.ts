import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";

export const getAllUsers = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    return reply.status(500).send("Erro interno do servidor");
  }
};

export const getUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
  id: string
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  } catch (error) {
    return reply.status(500).send("Erro interno do servidor");
  }
};

export const deleteAllUsers = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    await prisma.user.deleteMany();
    return reply.status(204).send();
  } catch (error) {
    return reply.status(500).send("Erro interno do servidor");
  }
};
