import * as path from 'node:path'

interface Options {
  repositoryUrl: string
}

export function remarkGitHubEditUrlPlugin(options: Options) {
  return function (tree: any, file: any) {
    const relativePathUrl = path.relative(file.cwd, file.history[0])
    const editUrl = new URL(
      `./${relativePathUrl}`,
      options.repositoryUrl.replace('/tree', '/edit')
    )

    file.data.astro.frontmatter.editUrl = editUrl.href
  }
}
