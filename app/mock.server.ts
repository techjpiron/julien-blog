import { factory, primaryKey } from "@mswjs/data";
import { bypass, http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { PostSchema } from "./schema";

let nextPostId = 101;

const db = factory({
  post: {
    id: primaryKey(() => nextPostId++),
    title: String,
    body: String,
    userId: Number,
  },
});

db.post.create({ id: 1, title: "Hello from MSW", body: "lorem ipsum" });
db.post.create({ id: 2, title: "Second Hello from MSW", body: "lorem ipsum" });
db.post.create({ id: 3, title: "Second Hello from MSW", body: "lorem ipsum" });

const server = setupServer(
  http.post(
    "https://jsonplaceholder.typicode.com/posts",
    async ({ request }) => {
      const response = await fetch(bypass(request));

      if (response.status !== 201) {
        return response;
      }

      const { data, success } = PostSchema.omit({ id: true }).safeParse(
        await request.json(),
      );

      if (!success) {
        return response;
      }

      const post = db.post.create(data);

      return HttpResponse.json({ post }, { status: 201 });
    },
  ),
  ...db.post.toHandlers("rest", "https://jsonplaceholder.typicode.com"),
);

server.listen();
