import { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma";
import { getIdParam, getLocationPostBody, getLocationPutBody } from "./@types";

export const appRoutes = async (app: FastifyInstance) => {
    app.get("/locations", async () => {
        const locations = await prisma.location.findMany();
        return locations.sort((a, b) => a.id - b.id);
    });

    app.post("/locations", async (request) => {
        const { local, country, description } = getLocationPostBody.parse(
            request.body
        );

        const location = await prisma.location.create({
            data: {
                local,
                country,
                description,
            },
        });

        return location;
    });

    app.put("/locations/:id", async (request) => {
        const { id } = getIdParam.parse(request.params);
        const { local, country, description, favorite } =
            getLocationPutBody.parse(request.body);

        await prisma.location.update({
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
        return { message: "Task marked as completed" };
    });

    app.delete("/locations/:id", async (request) => {
        const { id } = getIdParam.parse(request.params);
        await prisma.location.delete({
            where: {
                id: +id,
            },
        });
        return {
            message: "Task deleted successfully",
        };
    });
};
