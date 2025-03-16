import { Image } from "@unpic/react";
import { href, Link } from "react-router";
import type { Post } from "~/schemas";

export function PostPreviewCard({ post }: { post: Post }) {
  return (
    <Link
      className="block h-full border p-4"
      to={href("/posts/:postId", { postId: String(post.id) })}
      prefetch="viewport"
      aria-label={post.title}
    >
      <article>
        <h1 className="font-bold text-balance capitalize">{post.title}</h1>
        <Image
          src={post.img}
          layout="constrained"
          height={100}
          aspectRatio={2.5}
        />
        <p>{post.body}</p>
      </article>
    </Link>
  );
}
