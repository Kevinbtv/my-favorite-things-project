import { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma";
import { getIdParam, getLocationPostBody, getLocationPutBody } from "./@types";

export const appRoutes = async (app: FastifyInstance) => {
  app.get("/locations", async () => {
    const locations = await prisma.location.findMany();
    return locations.sort((a, b) => a.id - b.id);
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

    const locations = await prisma.location.update({
      where: {
        id: +id,
      },
      data: {
        local,
        country,
        description,
        favorite,
      },
    });

    return locations;
  });

  app.delete("/locations/:id", async (request, reply) => {
    const { id } = getIdParam.parse(request.params);
    await prisma.location.delete({
      where: {
        id: +id,
      },
    });

    return reply.status(204).send();
  });
};
