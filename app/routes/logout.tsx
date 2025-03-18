import { Form, redirect, useNavigate } from "react-router";
import type { Route } from "./+types/logout";
import { commitSession, getSession } from "~/session.server";
import { Button } from "~/components/ui/Button";
import { Dialog } from "~/components/ui/Dialog";
import { Modal, ModalOverlay } from "~/components/ui/Modal";
import { Heading, Link, P } from "~/components/ui/Typography";
import { useBackLink } from "~/components/ui/useBackLink";

export default function Logout() {
  const navigate = useNavigate();
  const backLink = useBackLink();

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
            <Heading slot="title">Sign out</Heading>
            <P>You&apos;re about to sign out. Are you sure?</P>
            <div className="mt-4 flex items-baseline gap-2">
              <Link to={backLink} autoFocus>
                Cancel
              </Link>
              <Button type="submit">Sign out</Button>
            </div>
          </Form>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  session.unset("user");
  session.flash("notifications", [
    { message: "You've been signed out", timeout: 3_000 },
  ]);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}
