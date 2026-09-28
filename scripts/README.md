# Inline type information in code snippets

Every `ts`, `tsx`, `js`, and `jsx` code snippet is processed with
[Twoslash](https://twoslash.netlify.app) (`.vitepress/twoslash.ts`). Hovering
an identifier shows its type and JSDoc, and identifiers defined in MSW link to
their definition on GitHub, pinned to the release tag (also via Cmd/Ctrl+click
on the identifier).

```text
scripts/msw-source.mjs
  → GitHub /repos/mswjs/msw/releases/latest
  → shallow checkout of refs/tags/<tag_name> in .vitepress/cache/msw-source/<tag>
  → install the release's frozen lockfile (no lifecycle scripts, workspace mode off)
  → "msw", "msw/browser", "msw/node", … map to the release's src/ entrypoints
```

Every build resolves the latest published stable release again; it never uses
`main`, the newest Git tag, or a prerelease. `GITHUB_TOKEN` is optional and
raises GitHub API rate limits in CI. The development server reuses the newest
cached checkout to avoid network access on every start and resolves the latest
release only when nothing is cached yet; delete `.vitepress/cache/msw-source` to
pick up a newer release locally.

The checkout itself is lazy. Only the release tag is resolved up front; the
source is checked out (and TypeScript booted) the first time a snippet misses
the twoslash result cache. Results are cached per release under
`node_modules/.cache/mswjs.io/twoslash/<tag>`, keyed by the snippet, the release
tag and its publication date. That location matters: Vercel's VitePress preset
restores only `node_modules/**` between builds (not `.vitepress/cache`), so a
build whose snippets all hit the cache never clones MSW or runs the type
checker. A new MSW release changes the tag and regenerates everything once.
External links that passed validation are recorded in
`node_modules/.cache/mswjs.io/external-links.json` and are not re-checked for
seven days; failures are never cached.

Entrypoints come exclusively from the checked-out release's `package.json`
`exports` map. `lib/` build paths map to their corresponding `src/` files, so
hovers and source links point at the actual source. Standalone assets such as
`mockServiceWorker.js` and `package.json` aren't modules.

Most snippets omit their imports on purpose. `.vitepress/twoslash.ts` declares
the common identifiers (`http`, `HttpResponse`, `worker`, `server`, `client`, …)
as ambient globals typed from the release so partial snippets still resolve;
snippet-level imports shadow them. Identifiers that would only resolve to `any`
(an uninstalled package, an untyped parameter) get no hover. Compiler
diagnostics never fail the build and are hidden from readers. Run
`pnpm twoslash:report` to list them and find snippets that no longer type-check
against the latest release. Add `notwoslash` to a fence's meta to opt a snippet
out.

The API reference under `src/content/api` is written by hand.
