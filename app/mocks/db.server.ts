import data from "./data.json" with { type: "json" };
import { faker } from "@faker-js/faker";
import { drop, factory, primaryKey } from "@mswjs/data";

let nextPostIndex = 101;

export const db = factory({
  post: {
    id: primaryKey(getNextPostIndex),
    title: String,
    body: String,
    userId: () => 0,
    img: () => faker.helpers.arrayElement(data.photos),
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
