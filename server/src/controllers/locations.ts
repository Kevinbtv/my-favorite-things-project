import { FastifyRequest, FastifyReply } from "fastify";
import { getIdParam, getLocationPostBody, getLocationPutBody } from "../@types";
import { prisma } from "../lib/prisma";

export const getAll = async () => {
  const locations = await prisma.location.findMany({
    orderBy: {
      id: "asc",
    },
  });
  return locations;
};

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const { local, country, description } = getLocationPostBody.parse(
    request.body
  );

  await prisma.location.create({
    data: {
      local,
      country,
      description,
    },
  });

  return reply.status(201).send();
};

export const update = async (request: FastifyRequest, reply: FastifyReply) => {
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
};

export const updateFavorite = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
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
};

export const remove = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = getIdParam.parse(request.params);

  await prisma.location.delete({
    where: {
      id,
    },
  });

  return reply.status(204).send();
};

export const removeAll = async (
  equest: FastifyRequest,
  reply: FastifyReply
) => {
  await prisma.location.deleteMany();
  return reply.status(204).send();
};
