import type { Route } from "./+types/post";

export async function loader({ params }: Route.LoaderArgs) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`,
  );
  const data = await response.json();
  return { data };
}

export default function Post({ params, loaderData }: Route.ComponentProps) {
  return (
    <article>
      <h1>Title {params.postId}</h1>
      <pre>{JSON.stringify(loaderData, null, 2)}</pre>
    </article>
  );
}
