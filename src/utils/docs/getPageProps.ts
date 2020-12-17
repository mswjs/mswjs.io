import type { PathParams } from "@/types/docs/PathParams";
import type { PageProps } from "@/types/docs/PageProps";
import { join } from "path";
//import { promises as fileSystem } from "fs";
//import parseMarkdown from "gray-matter";
import renderToString from "next-mdx-remote/render-to-string";

export async function getPageProps(params: PathParams): Promise<PageProps> {
  const pagePath = join(process.cwd(), "docs");

  /*const source = await fileSystem.readFile(docsPagePath, "utf8");

  const { content, data: metadata } = parseMarkdown(source); */

  const stringifiedContent = await renderToString("*example*");

  return {
    stringifiedContent,
    metadata: {
      title: "TODO",
      description: "TODO",
    },
  };
}
