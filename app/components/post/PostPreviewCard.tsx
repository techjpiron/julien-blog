import { Image } from "@unpic/react";
import { href, Link } from "react-router";
import type { Post } from "~/schemas";
import { H2, P } from "../ui/Typography";
import { focusRing } from "../ui/FocusRing";

export function PostPreviewCard({ post }: { post: Post }) {
  return (
    <Link
      className={focusRing({
        className:
          "block h-full overflow-hidden rounded-xl border border-gray-200 shadow-sm",
      })}
      to={href("/posts/:postId", { postId: String(post.id) })}
      prefetch="viewport"
      aria-label={post.title}
    >
      <article>
        <Image
          src={post.img}
          layout="constrained"
          width={800}
          aspectRatio={1.6}
        />
        <div className="p-5">
          <H2 className="line-clamp-1">{post.title}</H2>
          <P className="line-clamp-5">{post.body}</P>
          <P className="font-bold text-gray-800 hover:tracking-wide">
            Read more &rarr;
          </P>
        </div>
      </article>
    </Link>
  );
}
