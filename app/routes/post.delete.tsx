import { Form, href, redirect } from "react-router";
import type { Route } from "./+types/post.delete";

export async function action({ params }: Route.ActionArgs) {
  await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`, {
    method: "DELETE",
  });

  return redirect(href("/"));
}

export default function DeletePost() {
  return (
    <dialog open>
      <Form method="POST">
        <h1>Delete Post</h1>
        <p>Are you sure?</p>
        <button type="submit">Delete</button>
      </Form>
    </dialog>
  );
}
