import fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./routes";

export const app = fastify();

app.register(cors);
app.register(appRoutes);
