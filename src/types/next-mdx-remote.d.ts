declare module "next-mdx-remote" {
  export type StringifiedContent = {
    compiledSource: string;
    renderedOutput: string;
    scope?: Record<string, unknown>;
  };
}

declare module "next-mdx-remote/render-to-string" {
  import type { FunctionComponent, Component } from "react";
  import type { StringifiedContent } from "next-mdx-remote";

  export default function renderToString(
    source: string,
    params?: {
      components?: {
        [componentName: string]: FunctionComponent | Component;
      };
      scope?: object;
      mdxOptions?: {
        remarkPlugins?: any[];
        rehypePlugins?: any[];
        hastPlugins?: any[];
        compilers?: any[];
        filepath?: string;
      };
    }
  ): Promise<StringifiedContent>;
}

declare module "next-mdx-remote/hydrate" {
  import type { StringifiedContent } from "next-mdx-remote";
  import type { FunctionComponent, Component, ReactNode } from "react";

  export default function hydrate(
    source: StringifiedContent,
    params?: {
      [componentName: string]: FunctionComponent | Component;
    }
  ): ReactNode;
}
