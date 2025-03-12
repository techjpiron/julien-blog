import { Form, href, redirect } from "react-router";
import type { Route } from "./+types/new";

export default function NewPost() {
  return (
    <>
      <Form method="POST">
        <label>
          Title:
          <input name="title" />
        </label>
        <label>
          Body:
          <textarea name="body" />
        </label>
        <button type="submit">Save</button>
      </Form>
    </>
  );
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");

  await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title,
      body,
    }),
  });

  return redirect(href("/"));
}
