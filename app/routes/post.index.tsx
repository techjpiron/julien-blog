import { PostSchema } from "~/schemas";
import type { Route } from "./+types/post";

export async function loader({ params }: Route.LoaderArgs) {
  const { postId } = params;

  const post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
  )
    .then((response) => response.json())
    .then(PostSchema.parse);

  return { post };
}

export default function Post({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData;
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}
