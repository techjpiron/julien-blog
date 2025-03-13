import { Form, href, redirect } from "react-router";
import type { Route } from "./+types/post.edit";
import { PostSchema } from "~/schemas";

export async function loader({ params }: Route.LoaderArgs) {
  const { postId } = params;

  const post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
  )
    .then((response) => response.json())
    .then(PostSchema.parse);

  return { post };
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();

  const title = formData.get("title");
  const body = formData.get("body");
  const data = PostSchema.partial().parse({
    title,
    body,
    id: params.postId,
  });

  await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  return redirect(href("/posts/:postId", { postId: String(params.postId) }));
}

export default function EditPost({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData;

  return (
    <dialog open>
      <Form method="POST">
        <h1>Edit Post</h1>
        <label>
          Title
          <input name="title" defaultValue={post.title} />
        </label>
        <label>
          Content
          <input name="body" defaultValue={post.body} />
        </label>
        <button type="submit">Save</button>
      </Form>
    </dialog>
  );
}
