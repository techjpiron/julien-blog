import { href, redirect } from "react-router";
import type { Route } from "./+types/post.edit";
import { PostSchema } from "~/schemas";
import { PostForm } from "~/components/post/PostForm";
import { Dialog } from "~/components/ui/Dialog";
import { Modal } from "~/components/ui/Modal";

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
    <Modal isOpen>
      <Dialog>
        <PostForm defaultValue={post} />
      </Dialog>
    </Modal>
  );
}
