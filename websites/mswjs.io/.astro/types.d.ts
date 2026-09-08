declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"enter-websockets.mdx": {
	id: "enter-websockets.mdx";
  slug: "enter-websockets";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"introducing-msw-2.0.mdx": {
	id: "introducing-msw-2.0.mdx";
  slug: "introducing-msw-2.0";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"introducing-server-boundary.mdx": {
	id: "introducing-server-boundary.mdx";
  slug: "introducing-server-boundary";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"introducing-source.mdx": {
	id: "introducing-source.mdx";
  slug: "introducing-source";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"server-sent-events-are-here.mdx": {
	id: "server-sent-events-are-here.mdx";
  slug: "server-sent-events-are-here";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"why-use-mock-service-worker.mdx": {
	id: "why-use-mock-service-worker.mdx";
  slug: "why-mock-service-worker";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
};
"docs": {
"api/bypass.mdx": {
	id: "api/bypass.mdx";
  slug: "api/bypass";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/delay.mdx": {
	id: "api/delay.mdx";
  slug: "api/delay";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/finalize.mdx": {
	id: "api/finalize.mdx";
  slug: "api/finalize";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/get-response.mdx": {
	id: "api/get-response.mdx";
  slug: "api/get-response";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/graphql.mdx": {
	id: "api/graphql.mdx";
  slug: "api/graphql";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/http-response.mdx": {
	id: "api/http-response.mdx";
  slug: "api/http-response";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/http.mdx": {
	id: "api/http.mdx";
  slug: "api/http";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/is-common-asset-request.mdx": {
	id: "api/is-common-asset-request.mdx";
  slug: "api/is-common-asset-request";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/life-cycle-events.mdx": {
	id: "api/life-cycle-events.mdx";
  slug: "api/life-cycle-events";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/passthrough.mdx": {
	id: "api/passthrough.mdx";
  slug: "api/passthrough";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/request-handler.mdx": {
	id: "api/request-handler.mdx";
  slug: "api/request-handler";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/setup-server/boundary.mdx": {
	id: "api/setup-server/boundary.mdx";
  slug: "api/setup-server/boundary";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/setup-server/close.mdx": {
	id: "api/setup-server/close.mdx";
  slug: "api/setup-server/close";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/setup-server/index.mdx": {
	id: "api/setup-server/index.mdx";
  slug: "api/setup-server";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/setup-server/list-handlers.mdx": {
	id: "api/setup-server/list-handlers.mdx";
  slug: "api/setup-server/list-handlers";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/setup-server/listen.mdx": {
	id: "api/setup-server/listen.mdx";
  slug: "api/setup-server/listen";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/setup-server/reset-handlers.mdx": {
	id: "api/setup-server/reset-handlers.mdx";
  slug: "api/setup-server/reset-handlers";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/setup-server/restore-handlers.mdx": {
	id: "api/setup-server/restore-handlers.mdx";
  slug: "api/setup-server/restore-handlers";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/setup-server/use.mdx": {
	id: "api/setup-server/use.mdx";
  slug: "api/setup-server/use";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/setup-worker/index.mdx": {
	id: "api/setup-worker/index.mdx";
  slug: "api/setup-worker";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/setup-worker/list-handlers.mdx": {
	id: "api/setup-worker/list-handlers.mdx";
  slug: "api/setup-worker/list-handlers";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/setup-worker/reset-handlers.mdx": {
	id: "api/setup-worker/reset-handlers.mdx";
  slug: "api/setup-worker/reset-handlers";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/setup-worker/restore-handlers.mdx": {
	id: "api/setup-worker/restore-handlers.mdx";
  slug: "api/setup-worker/restore-handlers";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/setup-worker/start.mdx": {
	id: "api/setup-worker/start.mdx";
  slug: "api/setup-worker/start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/setup-worker/stop.mdx": {
	id: "api/setup-worker/stop.mdx";
  slug: "api/setup-worker/stop";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/setup-worker/use.mdx": {
	id: "api/setup-worker/use.mdx";
  slug: "api/setup-worker/use";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/sse.mdx": {
	id: "api/sse.mdx";
  slug: "api/sse";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"api/ws.mdx": {
	id: "api/ws.mdx";
  slug: "api/ws";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"best-practices/avoid-request-assertions.mdx": {
	id: "best-practices/avoid-request-assertions.mdx";
  slug: "best-practices/avoid-request-assertions";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"best-practices/custom-request-predicate.mdx": {
	id: "best-practices/custom-request-predicate.mdx";
  slug: "best-practices/custom-request-predicate";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"best-practices/dynamic-mock-scenarios.mdx": {
	id: "best-practices/dynamic-mock-scenarios.mdx";
  slug: "best-practices/dynamic-mock-scenarios";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"best-practices/index.mdx": {
	id: "best-practices/index.mdx";
  slug: "best-practices";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"best-practices/managing-the-worker.mdx": {
	id: "best-practices/managing-the-worker.mdx";
  slug: "best-practices/managing-the-worker";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"best-practices/network-behavior-overrides.mdx": {
	id: "best-practices/network-behavior-overrides.mdx";
  slug: "best-practices/network-behavior-overrides";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"best-practices/structuring-handlers.mdx": {
	id: "best-practices/structuring-handlers.mdx";
  slug: "best-practices/structuring-handlers";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"best-practices/typescript.mdx": {
	id: "best-practices/typescript.mdx";
  slug: "best-practices/typescript";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"cli/init.mdx": {
	id: "cli/init.mdx";
  slug: "cli/init";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"comparison.mdx": {
	id: "comparison.mdx";
  slug: "comparison";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"defaults.mdx": {
	id: "defaults.mdx";
  slug: "defaults";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"faq.mdx": {
	id: "faq.mdx";
  slug: "faq";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"graphql/index.mdx": {
	id: "graphql/index.mdx";
  slug: "graphql";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"graphql/intercepting-operations/index.mdx": {
	id: "graphql/intercepting-operations/index.mdx";
  slug: "graphql/intercepting-operations";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"graphql/intercepting-operations/mutations.mdx": {
	id: "graphql/intercepting-operations/mutations.mdx";
  slug: "graphql/intercepting-operations/mutations";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"graphql/intercepting-operations/operations.mdx": {
	id: "graphql/intercepting-operations/operations.mdx";
  slug: "graphql/intercepting-operations/operations";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"graphql/intercepting-operations/queries.mdx": {
	id: "graphql/intercepting-operations/queries.mdx";
  slug: "graphql/intercepting-operations/queries";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"graphql/intercepting-operations/variables.mdx": {
	id: "graphql/intercepting-operations/variables.mdx";
  slug: "graphql/intercepting-operations/variables";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"graphql/mocking-responses/errors.mdx": {
	id: "graphql/mocking-responses/errors.mdx";
  slug: "graphql/mocking-responses/errors";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"graphql/mocking-responses/index.mdx": {
	id: "graphql/mocking-responses/index.mdx";
  slug: "graphql/mocking-responses";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"graphql/mocking-responses/query-batching.mdx": {
	id: "graphql/mocking-responses/query-batching.mdx";
  slug: "graphql/mocking-responses/query-batching";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"graphql/schema-first-mocking.mdx": {
	id: "graphql/schema-first-mocking.mdx";
  slug: "graphql/schema-first-mocking";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"http/handling-requests.mdx": {
	id: "http/handling-requests.mdx";
  slug: "http/handling-requests";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"http/index.mdx": {
	id: "http/index.mdx";
  slug: "http";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"http/intercepting-requests/body.mdx": {
	id: "http/intercepting-requests/body.mdx";
  slug: "http/intercepting-requests/body";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"http/intercepting-requests/cookies.mdx": {
	id: "http/intercepting-requests/cookies.mdx";
  slug: "http/intercepting-requests/cookies";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"http/intercepting-requests/index.mdx": {
	id: "http/intercepting-requests/index.mdx";
  slug: "http/intercepting-requests";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"http/intercepting-requests/path-parameters.mdx": {
	id: "http/intercepting-requests/path-parameters.mdx";
  slug: "http/intercepting-requests/path-parameters";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"http/intercepting-requests/query-parameters.mdx": {
	id: "http/intercepting-requests/query-parameters.mdx";
  slug: "http/intercepting-requests/query-parameters";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"http/mocking-responses/binary.mdx": {
	id: "http/mocking-responses/binary.mdx";
  slug: "http/mocking-responses/binary";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"http/mocking-responses/cookies.mdx": {
	id: "http/mocking-responses/cookies.mdx";
  slug: "http/mocking-responses/cookies";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"http/mocking-responses/error-responses.mdx": {
	id: "http/mocking-responses/error-responses.mdx";
  slug: "http/mocking-responses/error-responses";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"http/mocking-responses/file-uploads.mdx": {
	id: "http/mocking-responses/file-uploads.mdx";
  slug: "http/mocking-responses/file-uploads";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"http/mocking-responses/index.mdx": {
	id: "http/mocking-responses/index.mdx";
  slug: "http/mocking-responses";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"http/mocking-responses/network-errors.mdx": {
	id: "http/mocking-responses/network-errors.mdx";
  slug: "http/mocking-responses/network-errors";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"http/mocking-responses/polling.mdx": {
	id: "http/mocking-responses/polling.mdx";
  slug: "http/mocking-responses/polling";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"http/mocking-responses/proxying-requests.mdx": {
	id: "http/mocking-responses/proxying-requests.mdx";
  slug: "http/mocking-responses/proxying-requests";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"http/mocking-responses/redirects.mdx": {
	id: "http/mocking-responses/redirects.mdx";
  slug: "http/mocking-responses/redirects";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"http/mocking-responses/response-patching.mdx": {
	id: "http/mocking-responses/response-patching.mdx";
  slug: "http/mocking-responses/response-patching";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"http/mocking-responses/response-timing.mdx": {
	id: "http/mocking-responses/response-timing.mdx";
  slug: "http/mocking-responses/response-timing";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"http/mocking-responses/streaming.mdx": {
	id: "http/mocking-responses/streaming.mdx";
  slug: "http/mocking-responses/streaming";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"index.mdx": {
	id: "index.mdx";
  slug: "index";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"integrations/browser.mdx": {
	id: "integrations/browser.mdx";
  slug: "integrations/browser";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"integrations/node.mdx": {
	id: "integrations/node.mdx";
  slug: "integrations/node";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"integrations/react-native.mdx": {
	id: "integrations/react-native.mdx";
  slug: "integrations/react-native";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"limitations.mdx": {
	id: "limitations.mdx";
  slug: "limitations";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"migrations.mdx": {
	id: "migrations.mdx";
  slug: "migrations";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"migrations/1.x-to-2.x.mdx": {
	id: "migrations/1.x-to-2.x.mdx";
  slug: "migrations/1.x-to-2.x";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"philosophy.mdx": {
	id: "philosophy.mdx";
  slug: "philosophy";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"quick-start.mdx": {
	id: "quick-start.mdx";
  slug: "quick-start";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"recipes/custom-worker-script-location.mdx": {
	id: "recipes/custom-worker-script-location.mdx";
  slug: "recipes/custom-worker-script-location";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"recipes/global-response-delay.mdx": {
	id: "recipes/global-response-delay.mdx";
  slug: "recipes/global-response-delay";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"recipes/higher-order-resolver.mdx": {
	id: "recipes/higher-order-resolver.mdx";
  slug: "recipes/higher-order-resolver";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"recipes/keeping-mocks-in-sync.mdx": {
	id: "recipes/keeping-mocks-in-sync.mdx";
  slug: "recipes/keeping-mocks-in-sync";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"recipes/merging-service-workers.mdx": {
	id: "recipes/merging-service-workers.mdx";
  slug: "recipes/merging-service-workers";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"recipes/using-base-url.mdx": {
	id: "recipes/using-base-url.mdx";
  slug: "recipes/using-base-url";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"recipes/using-cdn.mdx": {
	id: "recipes/using-cdn.mdx";
  slug: "recipes/using-cdn";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"recipes/using-custom-homepage.mdx": {
	id: "recipes/using-custom-homepage.mdx";
  slug: "recipes/using-custom-homepage";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"recipes/using-local-https.mdx": {
	id: "recipes/using-local-https.mdx";
  slug: "recipes/using-local-https";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"recipes/vitest-browser-mode.mdx": {
	id: "recipes/vitest-browser-mode.mdx";
  slug: "recipes/vitest-browser-mode";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"recipes/xmlhttprequest-progress-events.mdx": {
	id: "recipes/xmlhttprequest-progress-events.mdx";
  slug: "recipes/xmlhttprequest-progress-events";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"runbook.mdx": {
	id: "runbook.mdx";
  slug: "runbook";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"shared/jest-missing-globals.mdx": {
	id: "shared/jest-missing-globals.mdx";
  slug: "shared/jest-missing-globals";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"sse/index.mdx": {
	id: "sse/index.mdx";
  slug: "sse";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"sse/intercepting-sources/index.mdx": {
	id: "sse/intercepting-sources/index.mdx";
  slug: "sse/intercepting-sources";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"sse/server-events/closing-the-connection.mdx": {
	id: "sse/server-events/closing-the-connection.mdx";
  slug: "sse/server-events/closing-the-connection";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"sse/server-events/custom-events.mdx": {
	id: "sse/server-events/custom-events.mdx";
  slug: "sse/server-events/custom-events";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"sse/server-events/erroring-the-connection.mdx": {
	id: "sse/server-events/erroring-the-connection.mdx";
  slug: "sse/server-events/erroring-the-connection";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"sse/server-events/establishing-server-connection.mdx": {
	id: "sse/server-events/establishing-server-connection.mdx";
  slug: "sse/server-events/establishing-server-connection";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"sse/server-events/index.mdx": {
	id: "sse/server-events/index.mdx";
  slug: "sse/server-events";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"sse/server-events/message-events.mdx": {
	id: "sse/server-events/message-events.mdx";
  slug: "sse/server-events/message-events";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"sse/server-events/retry.mdx": {
	id: "sse/server-events/retry.mdx";
  slug: "sse/server-events/retry";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"websocket/bindings.mdx": {
	id: "websocket/bindings.mdx";
  slug: "websocket/bindings";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"websocket/client-events/broadcasting-data.mdx": {
	id: "websocket/client-events/broadcasting-data.mdx";
  slug: "websocket/client-events/broadcasting-data";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"websocket/client-events/client-to-server-forwarding.mdx": {
	id: "websocket/client-events/client-to-server-forwarding.mdx";
  slug: "websocket/client-events/client-to-server-forwarding";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"websocket/client-events/closing-client-connection.mdx": {
	id: "websocket/client-events/closing-client-connection.mdx";
  slug: "websocket/client-events/closing-client-connection";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"websocket/client-events/erroring-the-connection.mdx": {
	id: "websocket/client-events/erroring-the-connection.mdx";
  slug: "websocket/client-events/erroring-the-connection";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"websocket/client-events/index.mdx": {
	id: "websocket/client-events/index.mdx";
  slug: "websocket/client-events";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"websocket/client-events/sending-data.mdx": {
	id: "websocket/client-events/sending-data.mdx";
  slug: "websocket/client-events/sending-data";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"websocket/event-logs.mdx": {
	id: "websocket/event-logs.mdx";
  slug: "websocket/event-logs";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"websocket/index.mdx": {
	id: "websocket/index.mdx";
  slug: "websocket";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"websocket/server-events/closing-server-connection.mdx": {
	id: "websocket/server-events/closing-server-connection.mdx";
  slug: "websocket/server-events/closing-server-connection";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"websocket/server-events/establishing-server-connection.mdx": {
	id: "websocket/server-events/establishing-server-connection.mdx";
  slug: "websocket/server-events/establishing-server-connection";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"websocket/server-events/index.mdx": {
	id: "websocket/server-events/index.mdx";
  slug: "websocket/server-events";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"websocket/server-events/sending-data.mdx": {
	id: "websocket/server-events/sending-data.mdx";
  slug: "websocket/server-events/sending-data";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"websocket/server-events/server-to-client-forwarding.mdx": {
	id: "websocket/server-events/server-to-client-forwarding.mdx";
  slug: "websocket/server-events/server-to-client-forwarding";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"websocket/type-safety.mdx": {
	id: "websocket/type-safety.mdx";
  slug: "websocket/type-safety";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}
