import fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes, authRoutes, userRoutes } from "./routes";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";

export const app = fastify();
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(cors);
app.register(authRoutes);
app.register(appRoutes);
app.register(userRoutes);
