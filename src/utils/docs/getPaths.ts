import type { Path } from "@/types/docs/Path";

export async function getPaths(): Promise<Path[]> {
  // TODO: implement actual functionality.
  return [
    {
      params: {
        slugs: [],
      },
    },
    {
      params: {
        slugs: ["faq"],
      },
    },
    {
      params: {
        slugs: ["api"],
      },
    },
    {
      params: {
        slugs: ["api", "cookies"],
      },
    },
  ];
}
