import { href, redirect } from "react-router";
import type { Route } from "./+types/post.new";
import { PostSchema } from "~/schemas";
import { PostForm } from "~/components/post/PostForm";
import { Modal } from "~/components/Modal";
import { Dialog } from "~/components/Dialog";

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
    .then(PostSchema.parse);

  return redirect(href("/posts/:postId", { postId: String(newPost.id) }));
}

export default function NewPost() {
  return (
    <Modal isOpen>
      <Dialog>
        <PostForm />
      </Dialog>
    </Modal>
  );
}
