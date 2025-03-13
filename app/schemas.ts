import { z } from "zod";

export const PostSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  body: z.string(),
  userId: z.coerce.number(),
});

export const PostCollectionSchema = z.array(PostSchema);
