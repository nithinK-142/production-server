import { z } from "zod";

export const createAnimeSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    episodes: z.number().int().nonnegative(),
    status: z.enum(["ongoing", "completed"]),
    genres: z.array(z.string()).optional(),
    rating: z.number().min(0).max(10).optional()
  }).strict()
});