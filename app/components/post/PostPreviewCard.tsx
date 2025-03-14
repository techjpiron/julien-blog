import { href, Link } from "react-router";
import type { Post } from "~/schemas";

export function PostPreviewCard({ post }: { post: Post }) {
  return (
    <Link
      className="border p-4 block h-full"
      to={href("/posts/:postId", { postId: String(post.id) })}
      prefetch="viewport"
      aria-label={post.title}
    >
      <article>
        <h1 className="font-bold capitalize text-balance">{post.title}</h1>
        <p>{post.body}</p>
      </article>
    </Link>
  );
}
