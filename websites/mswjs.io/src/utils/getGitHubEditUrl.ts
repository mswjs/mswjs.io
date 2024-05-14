import { repository } from '../../package.json'

const DOCS_PATH = 'src/content/docs'

export function getGitHubEditUrl(pageId: `${string}.mdx`): URL {
  return new URL(`edit/main/${DOCS_PATH}/${pageId}`, repository.url)
}
