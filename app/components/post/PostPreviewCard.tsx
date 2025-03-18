import { Image } from "@unpic/react";
import { href, Link } from "react-router";
import type { Post } from "~/schemas";
import { focusRing } from "~/components/ui/FocusRing";
import { H2, P } from "~/components/ui/Typography";

export function PostPreviewCard({ post }: { post: Post }) {
  return (
    <Link
      className={focusRing({
        className:
          "group duration-200 ease-out block h-full overflow-hidden rounded-xl border border-gray-200 shadow-sm transform-gpu hover:shadow-xl",
      })}
      to={href("/posts/:postId", { postId: String(post.id) })}
      prefetch="viewport"
      aria-label={post.title}
    >
      <article>
        <Image
          className="transform-gpu text-white grayscale-50 duration-200 ease-out group-hover:grayscale-0"
          src={post.img}
          layout="constrained"
          width={800}
          aspectRatio={1.6}
        />
        <div className="p-5">
          <H2 className="line-clamp-1 capitalize">{post.title}</H2>
          <P className="line-clamp-5">{post.body}</P>
          <P className="font-bold text-gray-800 transition-all duration-100 ease-in-out group-hover:tracking-wide">
            Read more &rarr;
          </P>
        </div>
      </article>
    </Link>
  );
}
