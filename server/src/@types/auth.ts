import z from "zod";

export const registerBodySchema = z.object({
  email: z.string(),
  name: z.string(),
  password: z.string(),
});

export const loginBodySchema = z.object({
  email: z.string(),
  password: z.string(),
});
