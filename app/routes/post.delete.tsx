import { Form, href, redirect } from "react-router";
import type { Route } from "./+types/post.delete";
import { Modal } from "~/components/Modal";
import { Dialog } from "~/components/Dialog";
import { Heading } from "react-aria-components";
import { Button, ButtonLink } from "~/components/Button";

export async function action({ params }: Route.ActionArgs) {
  await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`, {
    method: "DELETE",
  });

  return redirect(href("/"));
}

export default function DeletePost() {
  return (
    <Modal isOpen>
      <Dialog>
        <Form method="POST">
          <Heading slot="title">Delete Post</Heading>
          <p>Are you sure?</p>
          <div className="grid gap-2 grid-cols-2">
            <ButtonLink to={".."} variant="secondary" autoFocus>
              Cancel
            </ButtonLink>
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </div>
        </Form>
      </Dialog>
    </Modal>
  );
}
