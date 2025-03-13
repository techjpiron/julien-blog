import { drop, factory, primaryKey } from "@mswjs/data";
import data from "./data.json";

let nextPostIndex = 101;

export const db = factory({
  post: {
    id: primaryKey(getNextPostIndex),
    title: String,
    body: String,
    userId: () => 0,
  },
});

export function seedDb() {
  drop(db);
  data.posts.forEach((post) => db.post.create(post));
  nextPostIndex = 101;
}

export function getNextPostIndex() {
  return nextPostIndex++;
}
