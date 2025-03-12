import { z } from "zod";

export const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  userId: z.number(),
});

export const PostCollectionSchema = z.array(PostSchema);
