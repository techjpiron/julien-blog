import type { Route } from "./+types/index";
import { getUser } from "~/authentification.server";
import { PostCollectionSchema } from "~/schemas";
import { PaginatedPreviewGrid } from "~/components/post/PaginatedPreviewGrid";
import { SearchForm } from "~/components/post/SearchForm";
import { H1, P } from "~/components/ui/Typography";

export default function Home({ loaderData }: Route.ComponentProps) {
  const { posts, user } = loaderData;

  return (
    <>
      <H1>
        Welcome to my Blog
        {user ? (
          <span className="capitalize">{`, ${user.username}`}</span>
        ) : null}{" "}
        &para;
      </H1>
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
  const user = await getUser(request);

  const url = new URL(request.url);
  const query = url.searchParams.get("q") ?? "";

  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!response.ok) {
    // this will show an error page according to the response status
    throw response;
  }

  const posts = PostCollectionSchema.parse(await response.json()).filter(
    (post) => post.title.match(query),
  );

  return { posts, query, user };
}
