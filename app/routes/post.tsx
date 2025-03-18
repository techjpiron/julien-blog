import { Image } from "@unpic/react";
import { href, isRouteErrorResponse, Outlet } from "react-router";
import type { Route } from "./+types/post";
import { PostSchema } from "~/schemas";
import { H1, P, Link } from "~/components/ui/Typography";

export default function Post({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData;
  return (
    <>
      <article>
        <Link to={href("/")}>&larr; Back to articles</Link>
        <H1 className="mt-6 text-6xl font-bold text-balance capitalize">
          {post.title} &para;
        </H1>
        <div className="flex gap-2">
          <Link to={href("/posts/:postId/edit", { postId: String(post.id) })}>
            Edit
          </Link>
          <Link to={href("/posts/:postId/delete", { postId: String(post.id) })}>
            Delete
          </Link>
        </div>
        <Image
          className="mt-4 rounded-xl text-white"
          src={post.img}
          layout="constrained"
          width={3000}
          aspectRatio={2.5}
          background="auto"
          alt={post.title}
        />
        <P className="mt-4">{post.body}</P>
      </article>
      <Outlet />
    </>
  );
}

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `${data?.post?.title} | Julien's Blog` },
    {
      name: "description",
      content: data?.post?.body,
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const { postId } = params;

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
  );

  if (!response.ok) {
    // this will show an error page according to the response status
    throw response;
  }

  const post = PostSchema.parse(await response.json());

  return { post };
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status == 404) {
    return (
      <>
        <H1>Sorry, the Post You&apos;re Looking for is missing...</H1>
        <P className="text-xl">We&apos;re investigating this case.</P>
        <Link to={href("/")} className="mt-4">
          Go back to homepage
        </Link>
      </>
    );
  }

  // Let index page deal with the issue
  throw error;
}
