import { Form, href, redirect, useNavigation } from "react-router";
import type { Route } from "./+types/post.delete";
import { Modal } from "~/components/ui/Modal";
import { Dialog } from "~/components/ui/Dialog";
import { Button } from "~/components/ui/Button";
import { commitSession, getSession } from "~/session.server";
import { Heading, Link, P } from "~/components/ui/Typography";

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

  const isDeleting = navigation.formAction?.match(`/posts/${postId}/delete`);

  return (
    <Modal isOpen>
      <Dialog>
        <Form method="POST">
          <Heading slot="title">Delete Post</Heading>
          <P>
            You&apos;re about to delete this post. You won&apos;t be able to
            undo this action.
          </P>
          <div className="mt-4 flex items-baseline gap-2">
            <Link
              to={".."}
              autoFocus
              onClick={(event) => {
                if (isDeleting) {
                  event.preventDefault();
                  event.stopPropagation();
                }
              }}
            >
              Cancel
            </Link>
            <Button type="submit">
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </Form>
      </Dialog>
    </Modal>
  );
}
