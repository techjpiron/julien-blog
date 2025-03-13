import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("posts/:postId", "routes/post.index.tsx"),
  route("posts/new", "routes/post.new.tsx"),
  route("posts/:postId/edit", "routes/post.edit.tsx"),
  route("reset", "routes/reset.tsx"),
] satisfies RouteConfig;
