import { Form, href, redirect } from "react-router";
import type { Route } from "./+types/post.new";
import { PostSchema } from "~/schemas";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const title = formData.get("title");
  const body = formData.get("body");
  const data = PostSchema.omit({ id: true }).parse({
    title,
    body,
    userId: 0,
  });

  const newPost = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((d) => {
      console.log(d);
      return d;
    })
    .then(PostSchema.parse);

  return redirect(href("/posts/:postId", { postId: String(newPost.id) }));
}

export default function NewPost() {
  return (
    <Form method="POST">
      <h1>New Post</h1>
      <label>
        Title
        <input name="title" />
      </label>
      <label>
        Content
        <textarea name="body" />
      </label>
      <button type="submit">Save</button>
    </Form>
  );
}
