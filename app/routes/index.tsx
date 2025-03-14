import type { Route } from "./+types/index";
import { PostCollectionSchema } from "~/schemas";
import { PaginatedPreviewGrid } from "~/components/post/PaginatedPreviewGrid";

export async function loader() {
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then(PostCollectionSchema.parse);

  return { posts };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData;

  return (
    <>
      <h1 className="text-6xl font-bold text-balance">Welcome to my Blog</h1>
      <PaginatedPreviewGrid posts={posts} count={12} />
    </>
  );
}
