import { href, Link } from "react-router";
import type { Route } from "./+types/index";
import { PostCollectionSchema } from "~/schemas";

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
      <ul className="mt-16 grid grid-cols-3 gap-4 items-stretch">
        {posts.map((post) => (
          <li key={post.id} className="h-full">
            <Link
              className="border p-4 block h-full"
              to={href("/posts/:postId", { postId: String(post.id) })}
              prefetch="viewport"
            >
              <h1 className="font-bold capitalize text-balance">
                {post.title}
              </h1>
              <p>{post.body}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
