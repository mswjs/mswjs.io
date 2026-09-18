import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createMswTwoslasher } from '../.vitepress/twoslash.ts'
import { resolveMswSourceForSite } from './msw-source.mjs'

const contentDirectory = fileURLToPath(new URL('../src/content', import.meta.url))
const FENCE_REGEXP = /^```(ts|tsx|js|jsx)(?![\w-])([^\n]*)\n([\s\S]*?)^```/gm

async function listMarkdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(...(await listMarkdownFiles(entryPath)))
    } else if (entry.name.endsWith('.md')) {
      files.push(entryPath)
    }
  }

  return files
}

const source = await resolveMswSourceForSite()
const twoslasher = createMswTwoslasher(source, { reportErrors: true })
const summary = new Map()
let snippetCount = 0
let failedSnippetCount = 0

for (const file of (await listMarkdownFiles(contentDirectory)).sort()) {
  const markdown = await readFile(file, 'utf8')
  const relativePath = path.relative(contentDirectory, file)

  for (const [, lang, meta, code] of markdown.matchAll(FENCE_REGEXP)) {
    if (/\bno-?twoslash\b/.test(meta)) {
      continue
    }

    snippetCount += 1
    const errors = twoslasher(code, lang).errors.filter((error) => {
      return error.level === 'error'
    })

    if (errors.length === 0) {
      continue
    }

    failedSnippetCount += 1
    console.log(`\n${relativePath} (\`\`\`${lang}${meta})`)

    for (const error of errors) {
      console.log(`  ${error.line + 1}:${error.character + 1} TS${error.code} ${error.text}`)
      const key = `TS${error.code} ${error.text}`
      summary.set(key, (summary.get(key) ?? 0) + 1)
    }
  }
}

console.log(`\n${failedSnippetCount} of ${snippetCount} snippets have type errors.\n`)
console.log('Most frequent:')

for (const [message, count] of [...summary].sort((left, right) => {
  return right[1] - left[1]
}).slice(0, 40)) {
  console.log(`  ${String(count).padStart(4)}  ${message}`)
}
