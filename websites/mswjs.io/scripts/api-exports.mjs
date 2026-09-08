import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import ts from 'typescript'
import { Converter } from 'typedoc'

export function excludeSymbolMembers(application) {
  const excludedReflections = new Set()
  application.converter.on(Converter.EVENT_BEGIN, () => {
    excludedReflections.clear()
  })
  application.converter.on(
    Converter.EVENT_CREATE_DECLARATION,
    (context, reflection) => {
      const symbol = context.getSymbolFromReflection(reflection)
      const hasSymbolKey = symbol?.declarations?.some((declaration) => {
        if (!declaration.name || !ts.isComputedPropertyName(declaration.name)) {
          return false
        }
        const keyType = context.checker.getTypeAtLocation(
          declaration.name.expression,
        )
        return Boolean(keyType.flags & ts.TypeFlags.ESSymbolLike)
      })
      if (hasSymbolKey) {
        excludedReflections.add(reflection)
      }
    },
  )
  application.converter.on(Converter.EVENT_RESOLVE_BEGIN, (context) => {
    for (const reflection of excludedReflections) {
      context.project.removeReflection(reflection)
    }
    excludedReflections.clear()
  })
}

function collectTargets(value) {
  if (typeof value === 'string') {
    return [value]
  }
  if (value === null) {
    return []
  }
  if (typeof value !== 'object') {
    throw new Error('Invalid package exports condition')
  }
  return Object.values(value).flatMap(collectTargets)
}

export function resolvePublicEntryPoints(manifest, sourceDirectory) {
  if (!manifest.exports) {
    throw new Error('The release has no package.json exports map')
  }
  const entries =
    typeof manifest.exports === 'object' &&
    !Array.isArray(manifest.exports) &&
    Object.keys(manifest.exports).some((key) => key.startsWith('.'))
      ? Object.entries(manifest.exports)
      : [['.', manifest.exports]]
  const sources = new Map()
  for (const [subpath, conditions] of entries) {
    for (const target of collectTargets(conditions)) {
      if (subpath.includes('*') || target.includes('*')) {
        throw new Error(
          `Cannot map wildcard export ${subpath} to release source`,
        )
      }
      if (!/\.(?:[cm]?js|[cm]?ts|tsx|jsx)$/.test(target)) {
        continue
      }
      if (!target.startsWith('./') || target.split('/').includes('..')) {
        throw new Error(`Invalid package export target: ${target}`)
      }
      // MSW's release build mirrors src/ into lib/. Match both declaration
      // and runtime conditions to their original source, not adjacent files.
      const stem = target
        .replace(/^\.\/lib\//, './src/')
        .replace(/(?:\.d)?\.(?:[cm]?js|[cm]?ts|tsx|jsx)$/, '')
      const candidates = [
        '.ts',
        '.mts',
        '.cts',
        '.tsx',
        '.js',
        '.mjs',
        '.cjs',
        '.jsx',
      ].map((extension) => path.resolve(sourceDirectory, `${stem}${extension}`))
      const sourcePath = candidates.find(existsSync)
      if (!sourcePath) {
        throw new Error(
          `Cannot resolve public export ${subpath} (${target}) to release source`,
        )
      }
      const source = ts.createSourceFile(
        sourcePath,
        readFileSync(sourcePath, 'utf8'),
        ts.ScriptTarget.Latest,
        true,
      )
      // package.json and the standalone service-worker script are public
      // assets, not modules with library APIs to document.
      if (!ts.isExternalModule(source)) {
        continue
      }
      const entry = sources.get(sourcePath) ?? { sourcePath, exports: [] }
      const importPath =
        subpath === '.' ? manifest.name : `${manifest.name}${subpath.slice(1)}`
      if (!entry.exports.includes(importPath)) {
        entry.exports.push(importPath)
      }
      sources.set(sourcePath, entry)
    }
  }
  if (!sources.size) {
    throw new Error('The release exports no documentable source modules')
  }
  return [...sources.values()]
}
