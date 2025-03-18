import { Form, redirect } from "react-router";
import type { Route } from "./+types/logout";
import { commitSession, getSession } from "~/session.server";
import { Button } from "~/components/ui/Button";

export function LogoutForm() {
  return (
    <Form method="post" action="/logout">
      <Button type="submit" variant="link">
        Sign out
      </Button>
    </Form>
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
