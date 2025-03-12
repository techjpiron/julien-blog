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
    <main>
      <h1>Welcome to my Blog</h1>
      <ul className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <li key={post.id} className="block border border-white p-4">
            <Link
              to={href("/posts/:postId", { postId: String(post.id) })}
              prefetch="viewport"
            >
              <h1>{post.title}</h1>
              <p>{post.body}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
