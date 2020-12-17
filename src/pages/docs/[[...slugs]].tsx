import type {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import type { PathParams } from "@/types/docs/PathParams";
import { getPaths } from "@/utils/docs/getPaths";
import type { PageProps } from "@/types/docs/PageProps";
import { getPageProps } from "@/utils/docs/getPageProps";
import type { ReactElement } from "react";
import hydrate from "next-mdx-remote/hydrate";

export async function getStaticPaths(): Promise<
  GetStaticPathsResult<PathParams>
> {
  const paths = await getPaths();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<PathParams>): Promise<
  GetStaticPropsResult<PageProps>
> {
  const props = await getPageProps(params as PathParams);

  return {
    props,
  };
}

export default function Page({
  stringifiedContent,
  metadata,
}: PageProps): ReactElement {
  const hydratedContent = hydrate(stringifiedContent);

  return (
    <>
      <h1>{metadata.title}</h1>
      {hydratedContent}
    </>
  );
}
