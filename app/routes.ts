import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layout.tsx", [
    index("routes/index.tsx"),
    ...prefix("posts", [
      route(":postId", "routes/post.tsx", [
        route("edit", "routes/post.edit.tsx"),
        route("delete", "routes/post.delete.tsx"),
      ]),
      route("new", "routes/post.new.tsx"),
    ]),
  ]),
  route("reset", "routes/reset.tsx"),
] satisfies RouteConfig;
