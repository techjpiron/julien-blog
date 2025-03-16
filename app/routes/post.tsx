import { PostSchema } from "~/schemas";
import type { Route } from "./+types/post";
import { href, isRouteErrorResponse, Link, Outlet } from "react-router";
import { Image } from "@unpic/react";

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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <>
        <h1 className="text-6xl font-bold text-balance capitalize">
          The Post You&apos;re Looking for is missing...
        </h1>
        <p className="mt-4 text-gray-600">
          We&apos;re investigating this case.
        </p>
        <Link to={href("/")} className="mt-4">
          Go back to homepage
        </Link>
      </>
    );
  }

  throw error;
}

export default function Post({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData;
  return (
    <>
      <article>
        <h1 className="text-6xl font-bold text-balance capitalize">
          {post.title}
        </h1>
        <div className="mt-4 flex gap-2">
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
        <Image
          src={post.img}
          layout="constrained"
          width={3000}
          aspectRatio={2.5}
          background="auto"
          alt=""
        />
        <p className="mt-4 text-gray-600">{post.body}</p>
      </article>
      <Outlet />
    </>
  );
}
