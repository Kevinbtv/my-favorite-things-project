import z from "zod";
export const getLocationPostBody = z.object({
  local: z.string(),
  country: z.string(),
  description: z.string(),
});

export const getLocationPutBody = z.object({
  local: z.string(),
  country: z.string(),
  description: z.string(),
  favorite: z.boolean(),
});

export const getLocationPatchBody = z.object({
  favorite: z.boolean(),
});

export const getIdParam = z.object({
  id: z.string(),
});
