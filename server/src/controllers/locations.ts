import { FastifyRequest, FastifyReply } from "fastify";
import {
  getIdParam,
  getLocationPostBody,
  getLocationPutBody,
} from "../@types/locations";
import { prisma } from "../lib/prisma";

export const getAll = async (request: FastifyRequest, reply: FastifyReply) => {
  const userId = request.user.sub;

  try {
    const locations = await prisma.location.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        id: "asc",
      },
    });

    return locations;
  } catch (error) {
    reply.status(500).send("Erro interno do servidor");
  }
};

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const userId = request.user.sub;

    const { local, country, description } = getLocationPostBody.parse(
      request.body
    );

    await prisma.location.create({
      data: {
        local,
        country,
        description,
        user_id: userId,
      },
    });

    return reply.status(201).send();
  } catch (error) {
    reply.status(500).send("Erro interno do servidor");
  }
};

export const update = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = getIdParam.parse(request.params);
    const { local, country, description } = getLocationPutBody.parse(
      request.body
    );

    const location = await prisma.location.findUnique({
      where: {
        id,
      },
    });

    if (!location) {
      return reply.status(404).send("Localização não encontrada");
    }

    const updatedFavorite = location.favorite;

    await prisma.location.update({
      where: {
        id,
      },
      data: {
        local,
        country,
        description,
        favorite: updatedFavorite,
      },
    });

    return reply.status(204).send();
  } catch (error) {
    reply.status(500).send("Erro interno do servidor");
  }
};

export const updateFavorite = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = getIdParam.parse(request.params);

    const location = await prisma.location.findUnique({
      where: {
        id,
      },
    });

    if (!location) {
      return reply.status(404).send("Localização não encontrada");
    }

    const updatedFavorite = !location.favorite;

    const isFavorite = await prisma.location.update({
      where: {
        id,
      },
      data: {
        favorite: updatedFavorite,
      },
    });

    return isFavorite.favorite;
  } catch (error) {
    reply.status(500).send("Erro interno do servidor");
  }
};

export const remove = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = getIdParam.parse(request.params);

    await prisma.location.delete({
      where: {
        id,
      },
    });

    return reply.status(204).send();
  } catch (error) {
    reply.status(500).send("Erro interno do servidor");
  }
};

export const removeAll = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    await prisma.location.deleteMany();
    return reply.status(204).send();
  } catch (error) {
    reply.status(500).send("Erro interno do servidor");
  }
};
