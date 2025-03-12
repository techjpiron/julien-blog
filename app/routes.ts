import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/new", "routes/new.tsx"),
  route("/post/:postId", "routes/post.tsx"),
] satisfies RouteConfig;
