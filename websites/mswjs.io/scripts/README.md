# API reference generation

```text
pnpm --filter mswjs.io build
  → GitHub /repos/mswjs/msw/releases/latest
  → shallow checkout of refs/tags/<tag_name>
  → install the release's frozen lockfile (no lifecycle scripts)
  → TypeDoc → src/content/api/reference
  → VitePress build
```

Every build resolves the latest published stable GitHub release again. It never
uses `main`, the newest Git tag, or a cached release as a fallback. Publishing an
MSW release does not itself trigger a website build; the next website deployment
picks it up. `GITHUB_TOKEN` is optional and raises GitHub API rate limits in CI.

Run `pnpm --filter mswjs.io api:generate` to refresh references locally, then start
the usual dev server. Generated pages and release metadata are ignored by Git.
Development without generated pages retains the handwritten API sidebar.
Existing handwritten API URLs remain available so docs links keep working; the
sidebar uses generated references once available. The CLI remains handwritten.

Entrypoints come exclusively from the checked-out release's `package.json`
`exports` map. All nested conditions are considered; null targets are excluded
and declaration/ESM/CJS variants of the same module are deduplicated. MSW's
`lib/` build paths map to their corresponding `src/` files. An unmappable target
fails generation instead of falling back to scanning source directories.
Standalone assets such as `mockServiceWorker.js` and `package.json` aren't API
modules. Wildcard exports currently fail explicitly instead of broadening the
documented surface.

TypeDoc uses `entryPointStrategy: resolve`: only symbols exported by those public
modules get top-level reference entries. A utility explicitly re-exported from
`msw` is therefore public, even if its implementation lives under `utils/`.
Import-only helpers and unexported sibling files aren't entrypoints.
Symbol-keyed members of exported APIs are omitted, including unique-symbol
branding properties such as `[bodyType]`. The filter uses TypeScript's key type;
ordinary string-keyed computed properties remain documented.

`@module` supplies section names, with directory-based defaults for releases
without those tags. `@category` groups exports inside modules. Use these module
names for the standard section order: `API`, `Browser`, `Node.js`, `Experimental`.
Other public subpaths, including React Native, are included automatically.

Source links use the checked-out commit, recorded with the release tag in
`api/reference/release.json`, together with the resolved public entrypoints.
Generated pages disable the website edit link and
website Git timestamp. TypeDoc extracts types without rerunning the library's
compiler diagnostics across the combined browser/Node documentation program.
Checkout, dependency installation, conversion, or rendering errors stop the build.

## Sidebar order and deprecated APIs

Edit `scripts/api-order.json` to place important APIs first. Keys are section or
category paths; values are ordered API/category names. Unlisted entries retain
TypeDoc's order, so newly exported APIs still appear automatically.

```json
{
  "API": ["http", "graphql", "ws", "HttpResponse"],
  "Browser/Lifecycle": ["start", "stop"]
}
```

Regenerate after editing. `@deprecated` is read from the release source and shown
as an accessible danger badge beside the API's sidebar link. Each call signature
has a compact list of parameters and its return type, using inline code and
preserving descriptions, optional/rest markers, and defaults. Full declarations
remain TypeScript code blocks. Inheritance links still resolve through TypeDoc.
