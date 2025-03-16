import { z } from "zod";

export const PostSchema = z.object({
  id: z.coerce.number(),
  title: z.string().min(2, "Your title must contain at least 2 characters"),
  body: z.string().min(5, "Your content must contain at least 5 characters"),
  userId: z.coerce.number(),
  img: z.string().url(),
});
export type Post = z.infer<typeof PostSchema>;

export const InsertPostSchema = PostSchema.pick({ title: true, body: true });
export type InsertPost = z.infer<typeof InsertPostSchema>;

export const UpdatePostSchema = PostSchema.pick({
  id: true,
  title: true,
  body: true,
});
export type UpdatePost = z.infer<typeof UpdatePostSchema>;

export const PostCollectionSchema = z.array(PostSchema);
export type PostCollection = z.infer<typeof PostCollectionSchema>;
