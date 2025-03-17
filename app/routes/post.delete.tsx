import { Form, href, redirect, useNavigation } from "react-router";
import type { Route } from "./+types/post.delete";
import { Heading } from "react-aria-components";
import { Modal } from "~/components/ui/Modal";
import { Dialog } from "~/components/ui/Dialog";
import { Button, ButtonLink } from "~/components/ui/Button";
import { commitSession, getSession } from "~/session.server";

export function meta() {
  return [
    {
      name: "robots",
      content: "noindex",
    },
  ];
}

export async function action({ params, request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`, {
    method: "DELETE",
  });

  session.flash("notifications", [
    { message: "The post was successfully deleted", timeout: 5_000 },
  ]);

  return redirect(href("/"), {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function DeletePost({ params }: Route.ComponentProps) {
  const { postId } = params;
  const navigation = useNavigation();
  return (
    <Modal isOpen>
      <Dialog>
        <Form method="POST">
          <Heading slot="title">Delete Post</Heading>
          <p>Are you sure?</p>
          <div className="grid grid-cols-2 gap-2">
            <ButtonLink to={".."} variant="secondary" autoFocus>
              Cancel
            </ButtonLink>
            <Button type="submit" variant="destructive">
              {navigation.formAction?.match(`/posts/${postId}/delete`)
                ? "Deleting..."
                : "Delete"}
            </Button>
          </div>
        </Form>
      </Dialog>
    </Modal>
  );
}
