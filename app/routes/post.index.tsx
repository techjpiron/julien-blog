import { PostSchema } from "~/schemas";
import type { Route } from "./+types/post.index";
import { href, Link } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
  const { postId } = params;

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
  );
  if (!response.ok) {
    throw response;
  }
  const post = PostSchema.parse(await response.json());

  return { post };
}

export default function Post({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData;
  return (
    <>
      <header>
        <Link to={href("/posts/:postId/edit", { postId: String(post.id) })}>
          Edit
        </Link>
        <Link to={href("/posts/:postId/delete", { postId: String(post.id) })}>
          Delete
        </Link>
      </header>
      <article>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </article>
    </>
  );
}
