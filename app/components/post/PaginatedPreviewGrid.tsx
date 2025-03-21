import { href, useSearchParams } from "react-router";
import { z } from "zod";
import type { PostCollection } from "~/schemas";
import { PostPreviewCard } from "~/components/post/PostPreviewCard";
import { H2, Link } from "~/components/ui/Typography";

export function PaginatedPreviewGrid({
  posts,
  count,
}: {
  posts: PostCollection;
  count: number;
}) {
  const [searchParams] = useSearchParams();

  const page = z.coerce.number().parse(searchParams.get("p") ?? 1);
  const q = searchParams.get("q") ?? "";

  const start = (page - 1) * count;
  const end = start + count;
  const selectedPosts = posts.slice(start, end);

  const maxPage = Math.ceil(posts.length / count);
  const isFirstPage = page <= 1;
  const isLastPage = page >= maxPage;

  if (selectedPosts.length == 0) {
    return <H2>No result for your search</H2>;
  }

  return (
    <>
      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {selectedPosts.map((post) => (
          <li key={post.id}>
            <PostPreviewCard post={post} />
          </li>
        ))}
      </ul>
      <div className="my-8 flex justify-between">
        <Link
          className={isFirstPage ? "invisible" : ""}
          to={{
            pathname: href("/"),
            search: new URLSearchParams({
              q,
              p: String(page - 1),
            }).toString(),
          }}
        >
          &larr; Previous Page
        </Link>
        <Link
          className={isLastPage ? "invisible" : ""}
          to={{
            pathname: href("/"),
            search: new URLSearchParams({
              q,
              p: String(page + 1),
            }).toString(),
          }}
        >
          Next Page &rarr;
        </Link>
      </div>
    </>
  );
}
