import { bypass, http, HttpResponse } from "msw";
import { db, getNextPostIndex } from "./db.server";

export const handlers = [
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
      const data = await response.json();
      db.post.create({
        ...data,
        id: getNextPostIndex(),
      });

      return HttpResponse.json(data, { status: 201 });
    },
  ),
  ...db.post.toHandlers("rest", "https://jsonplaceholder.typicode.com/"),
];
