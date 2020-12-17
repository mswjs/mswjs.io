import type { StringifiedContent } from "next-mdx-remote";
import type { PageMetadata } from "./PageMetadata";

export type PageProps = {
  stringifiedContent: StringifiedContent;
  metadata: PageMetadata;
};
