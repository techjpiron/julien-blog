import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("posts/:postId", "routes/post.tsx"),
] satisfies RouteConfig;
