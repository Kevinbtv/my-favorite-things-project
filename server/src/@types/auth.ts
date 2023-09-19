import z from "zod";
import { FastifySessionObject } from "@fastify/session";

export const registerBodySchema = z.object({
  email: z.string(),
  name: z.string(),
  password: z.string(),
});

export const loginBodySchema = z.object({
  email: z.string(),
  password: z.string(),
});

export interface CustomSessionObject extends FastifySessionObject {
  user: {
    id: string;
    email: string;
    name: string;
  };
}
