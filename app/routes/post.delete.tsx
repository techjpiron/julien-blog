import { Form, href, redirect, useNavigate, useNavigation } from "react-router";
import type { Route } from "./+types/post.delete";
import { requireUser } from "~/authentification.server";
import { commitSession, getSession } from "~/session.server";
import { Button } from "~/components/ui/Button";
import { Dialog } from "~/components/ui/Dialog";
import { Modal, ModalOverlay } from "~/components/ui/Modal";
import { Heading, Link, P } from "~/components/ui/Typography";
import { useBackLink } from "~/components/ui/useBackLink";

export default function DeletePost({ params }: Route.ComponentProps) {
  const { postId } = params;
  const navigation = useNavigation();
  const navigate = useNavigate();
  const backLink = useBackLink();

  const isDeleting = navigation.formAction?.match(`/posts/${postId}/delete`);

  return (
    <ModalOverlay
      isDismissable
      defaultOpen
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      onOpenChange={(open) => {
        if (!open) {
          navigate(backLink);
        }
      }}
    >
      <Modal
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, stiffness: 30 }}
      >
        <Dialog>
          <Form method="POST">
            <Heading slot="title">Delete Post</Heading>
            <P>
              You&apos;re about to delete this post. You won&apos;t be able to
              undo this action.
            </P>
            <div className="mt-4 flex items-baseline gap-2">
              <Link
                to={backLink}
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
    </ModalOverlay>
  );
}

export function meta() {
  return [
    {
      name: "robots",
      content: "noindex",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  await requireUser(request, "You need to be signed in to delete this post.");
}

export async function action({ params, request }: Route.ActionArgs) {
  await requireUser(request, "You need to be signed in to delete this post.");
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
