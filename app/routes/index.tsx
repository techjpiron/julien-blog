import type { Route } from "./+types/index";
import { PostCollectionSchema } from "~/schemas";
import { PaginatedPreviewGrid } from "~/components/post/PaginatedPreviewGrid";
import { SearchForm } from "~/components/post/SearchForm";

export function meta() {
  return [
    { title: "Julien's Blog" },
    {
      name: "description",
      content: "Welcome to Julien's Blog. This is part of his portfolio.",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") ?? "";

  const posts = await fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then(PostCollectionSchema.parse)
    .then((posts) => posts.filter((post) => post.title.match(query)));

  return { posts, query };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData;

  return (
    <>
      <h1 className="text-6xl font-bold text-balance">Welcome to my Blog</h1>
      <SearchForm />
      <PaginatedPreviewGrid posts={posts} count={12} />
    </>
  );
}
