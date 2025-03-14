import { PostSchema } from "~/schemas";
import type { Route } from "./+types/post";
import { href, Link, Outlet } from "react-router";

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
      <article>
        <h1 className="text-6xl font-bold capitalize text-balance">
          {post.title}
        </h1>
        <div className="flex gap-2 mt-4">
          <Link
            className="underline"
            to={href("/posts/:postId/edit", { postId: String(post.id) })}
          >
            Edit
          </Link>
          <Link
            className="underline"
            to={href("/posts/:postId/delete", { postId: String(post.id) })}
          >
            Delete
          </Link>
        </div>
        <p className="mt-4 text-gray-600">{post.body}</p>
      </article>
      <Outlet />
    </>
  );
}
