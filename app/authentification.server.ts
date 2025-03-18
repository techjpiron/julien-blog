import { redirect } from "react-router";
import { getSession } from "./session.server";

export async function requireAnonymous(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));

  const user = session.get("user");

  if (user) {
    throw redirect("/");
  }
}

export async function getUser(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));

  const user = session.get("user");

  return user;
}

export async function requireUser(request: Request, message: string) {
  const session = await getSession(request.headers.get("Cookie"));

  const user = session.get("user");

  if (!user) {
    const redirectTo = new URL(request.url).pathname;
    throw redirect(
      `/login?message=${encodeURIComponent(message)}&redirectTo=${encodeURIComponent(redirectTo)}`,
    );
  }

  return user;
}
