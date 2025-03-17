import type { Route } from "./+types/index";
import { PostCollectionSchema } from "~/schemas";
import { PaginatedPreviewGrid } from "~/components/post/PaginatedPreviewGrid";
import { SearchForm } from "~/components/post/SearchForm";
import { H1, P } from "~/components/ui/Typography";

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
      <H1>Welcome to my Blog</H1>
      <P className="text-xl">
        Lorem ipsum is a dummy or placeholder text commonly used in graphic
        design, publishing, and web development to fill empty spaces in a layout
        that does not yet have content.
      </P>
      <SearchForm />
      <PaginatedPreviewGrid posts={posts} count={12} />
    </>
  );
}
