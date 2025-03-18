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
