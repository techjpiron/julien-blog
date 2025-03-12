import { href, Link } from "react-router";
import type { Route } from "./+types/home";
import { PostSchema } from "~/schema";
import { z } from "zod";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts")
    .then((r) => r.json())
    .then((data) => z.array(PostSchema).parse(data));

  return { posts };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData;

  return (
    <>
      <header>
        <Link to={href("/new")}>New Post</Link>
      </header>
      <body>
        <ul className="grid gap-2 grid-cols-3">
          {posts.map((post) => (
            <li key={post.id} className="border border-white p-2 rounded">
              <Link to={href("/post/:postId", { postId: String(post.id) })}>
                <article>
                  <h1>{post.title}</h1>
                  <p>{post.body}</p>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      </body>
    </>
  );
}
