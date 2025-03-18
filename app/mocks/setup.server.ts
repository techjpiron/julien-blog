import { seedDb } from "./db.server";
import { handlers } from "./handlers.server";
import { setupServer } from "msw/node";

const server = setupServer(...handlers);

export function setup() {
  seedDb();
  server.listen();
}
