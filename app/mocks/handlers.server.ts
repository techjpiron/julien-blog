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
      const result = db.post.create({
        ...data,
        id: getNextPostIndex(),
      });

      return HttpResponse.json(result, { status: 201 });
    },
  ),
  http.patch(
    "https://jsonplaceholder.typicode.com/posts/:id",
    async ({ request, params }) => {
      // Hit the real server
      const response = await fetch(bypass(request));

      // If something goes wrong, return the response
      if (!response.ok) {
        return response;
      }

      // If everything goes well, save the post
      const data = await response.json();
      db.post.update({
        where: {
          id: {
            equals: Number(params.id),
          },
        },
        data,
      });

      return HttpResponse.json(data, { status: 200 });
    },
  ),
  ...db.post.toHandlers("rest", "https://jsonplaceholder.typicode.com/"),
];
