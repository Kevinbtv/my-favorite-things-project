import fastify from "fastify";
import fastifySession from "@fastify/session";
import fastifyCookie from "@fastify/cookie";

import cors from "@fastify/cors";
import { appRoutes, authRoutes, userRoutes } from "./routes";

export const app = fastify();
app.register(fastifyCookie);
app.register(fastifySession, {
  secret: "4wTbeHGKXahy7hH1BzCkZCha9H8GNeOL",
  cookieName: "session",
  cookie: {
    secure: false,
    httpOnly: true,
  },
});
app.register(cors);

app.register(appRoutes);
app.register(authRoutes);
app.register(userRoutes);
