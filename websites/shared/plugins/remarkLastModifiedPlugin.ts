import { execSync } from 'node:child_process'

export function remarkLastModifiedPlugin() {
  return function (tree: any, file: any) {
    const filePath = file.history[0]
    const gitDate = execSync(`git log -1 --pretty="format:%cI" ${filePath}`)
    file.data.astro.frontmatter.lastModifiedAt = new Date(gitDate.toString())
  }
}
