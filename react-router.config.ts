import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  prerender: async () => ["/about"],
} satisfies Config;
