import { z } from "zod";

export const PostSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  body: z.string(),
  userId: z.coerce.number(),
});
export type Post = z.infer<typeof PostSchema>;

export const PostCollectionSchema = z.array(PostSchema);
export type PostCollection = z.infer<typeof PostCollectionSchema>;
