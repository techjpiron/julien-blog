import type { PostCollection } from "~/schemas";
import { PostPreviewCard } from "./PostPreviewCard";
import { Link, useSearchParams } from "react-router";
import { z } from "zod";

export function PaginatedPreviewGrid({
  posts,
  count,
}: {
  posts: PostCollection;
  count: number;
}) {
  const [searchParams] = useSearchParams();

  const page = z.coerce.number().parse(searchParams.get("p") ?? 1);

  const start = (page - 1) * count;
  const end = start + count;
  const selectedPosts = posts.slice(start, end);

  const maxPage = Math.ceil(posts.length / count);

  return (
    <>
      <ul className="mt-8 grid grid-cols-3 gap-4">
        {selectedPosts.map((post) => (
          <li key={post.id}>
            <PostPreviewCard post={post} />
          </li>
        ))}
      </ul>
      <div className="my-8 flex justify-between">
        {page > 1 ? (
          <Link to={`?p=${page - 1}`}>&larr; Previous Page</Link>
        ) : (
          <span
            role="link"
            aria-disabled
            className="cursor-not-allowed text-gray-500"
          >
            &larr; Previous Page
          </span>
        )}
        {page < maxPage ? (
          <Link to={`?p=${page + 1}`}>Next Page &rarr;</Link>
        ) : (
          <span
            role="link"
            aria-disabled
            className="cursor-not-allowed text-gray-500"
          >
            Next Page &rarr;
          </span>
        )}
      </div>
    </>
  );
}
