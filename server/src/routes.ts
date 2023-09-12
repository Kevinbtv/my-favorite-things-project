import { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma";
import {
  getIdParam,
  getLocationPatchBody,
  getLocationPostBody,
  getLocationPutBody,
} from "./@types";

export const appRoutes = async (app: FastifyInstance) => {
  app.get("/locations", async () => {
    const locations = await prisma.location.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return locations;
  });

  app.post("/locations", async (request, reply) => {
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
  });

  app.put("/locations/:id", async (request, reply) => {
    const { id } = getIdParam.parse(request.params);
    const { local, country, description, favorite } = getLocationPutBody.parse(
      request.body
    );

    await prisma.location.update({
      where: {
        id,
      },
      data: {
        local,
        country,
        description,
        favorite,
      },
    });

    return reply.status(204).send();
  });

  app.patch("/locations/:id", async (request, reply) => {
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
  });

  app.delete("/locations/:id", async (request, reply) => {
    const { id } = getIdParam.parse(request.params);

    await prisma.location.delete({
      where: {
        id,
      },
    });

    return reply.status(204).send();
  });

  app.delete("/locations/delete-all", async (request, reply) => {
    await prisma.location.deleteMany();
    return reply.status(204).send();
  });
};
