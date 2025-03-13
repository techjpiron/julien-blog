import { setupServer } from "msw/node";
import { seedDb } from "./db.server";
import { handlers } from "./handlers.server";

const server = setupServer(...handlers);

export function setup() {
  seedDb();
  server.listen();
}
