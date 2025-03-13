import { redirect } from "react-router";
import { seedDb } from "~/mocks/db.server";

export function action() {
  seedDb();
  return redirect("/");
}
