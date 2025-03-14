import { Form, href, redirect } from "react-router";
import type { Route } from "./+types/post.delete";
import { Heading } from "react-aria-components";
import { Modal } from "~/components/ui/Modal";
import { Dialog } from "~/components/ui/Dialog";
import { Button, ButtonLink } from "~/components/ui/Button";

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
