import { factory, primaryKey } from "@mswjs/data";
import { setupServer } from "msw/node";
import data from "./data.json";
import { bypass, http, HttpResponse } from "msw";

let nextIndex = 101;

const db = factory({
  post: {
    id: primaryKey(() => nextIndex++),
    title: String,
    body: String,
    userId: () => 0,
  },
});

data.posts.forEach((post) => db.post.create(post));

const server = setupServer(
  http.post(
    "https://jsonplaceholder.typicode.com/posts",
    async ({ request }) => {
      // Hit the real server
      const response = await fetch(bypass(request));

      // If something goes wrong, return the response
      if (response.status !== 201) {
        return response;
      }

      // If everything goes well, save the post
      const data = response.json();
      db.post.create({
        ...data,
        id: nextIndex++,
      });

      return HttpResponse.json(data, { status: 201 });
    },
  ),
  ...db.post.toHandlers("rest", "https://jsonplaceholder.typicode.com/"),
);

server.listen();
