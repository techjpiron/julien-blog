import { drop, factory, primaryKey } from "@mswjs/data";
import data from "./data.json" with { type: "json" };
import { faker } from "@faker-js/faker";

let nextPostIndex = 101;

export const db = factory({
  post: {
    id: primaryKey(getNextPostIndex),
    title: String,
    body: String,
    userId: () => 0,
    img: () =>
      faker.helpers.arrayElement([
        "https://images.unsplash.com/photo-1628008043361-965455e417ba",
        "https://images.unsplash.com/photo-1627212449994-94ba54cf521c",
        "https://images.unsplash.com/photo-1621584283449-ebb402d5f0c9",
        "https://images.unsplash.com/photo-1622020805667-b861bdf64228",
        "https://images.unsplash.com/photo-1621272155982-eb405db62303",
        "https://images.unsplash.com/photo-1610963283292-85dd623ce470",
        "https://images.unsplash.com/photo-1602925609853-c84372a09115",
        "https://images.unsplash.com/photo-1604141803609-8874e4b0797c",
      ]),
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
