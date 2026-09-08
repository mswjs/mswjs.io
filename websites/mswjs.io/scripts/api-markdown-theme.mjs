import { MarkdownTheme } from 'typedoc-plugin-markdown'
import { renderCallSignature } from './api-call-signature.mjs'

export class ApiMarkdownTheme extends MarkdownTheme {
  getRenderContext(page) {
    const context = super.getRenderContext(page)
    const renderSources = context.partials.sources
    context.partials.sources = (model, options) => {
      if (!model.sources?.length) {
        return ''
      }
      return renderSources(model, options).replace(/^Defined in:/, 'Source:')
    }
    const renderComment = context.partials.comment
    context.partials.comment = (comment, options) => {
      const formattedComment = comment.clone()
      formattedComment.blockTags = formattedComment.blockTags.filter((tag) => {
        return tag.tag !== '@see'
      })
      for (const tag of formattedComment.blockTags) {
        if (tag.tag === '@default' || tag.tag === '@defaultValue') {
          const value = tag.content
            .map((part) => part.text)
            .join('')
            .trim()
            .replace(/^(`{3,})[^\n]*\n([\s\S]*?)\n\1$/, '$2')
            .replace(/^(`+)([\s\S]*?)\1$/, '$2')
            .replace(/\r?\n/g, ' ')
          const delimiter = '`'.repeat(
            Math.max(
              1,
              ...Array.from(
                value.matchAll(/`+/g),
                (match) => match[0].length + 1,
              ),
            ),
          )
          tag.content = [
            { kind: 'code', text: `${delimiter} ${value} ${delimiter}` },
          ]
        }
      }
      let markdown = renderComment(formattedComment, options)
      for (const tag of formattedComment.blockTags) {
        if (tag.tag !== '@deprecated') {
          continue
        }
        const deprecatedComment = formattedComment.clone()
        deprecatedComment.summary = []
        deprecatedComment.modifierTags.clear()
        deprecatedComment.blockTags = [tag]
        const section = renderComment(deprecatedComment, options).trim()
        if (section) {
          const message = context.helpers.getCommentParts(tag.content)
          markdown = markdown.replace(
            section,
            `::: danger Deprecated\nThis API is deprecated and must not be used.\n\n${message}\n:::`,
          )
        }
      }
      return markdown
    }
    context.partials.signature = (model, options) => {
      return renderCallSignature(context, model, options)
    }
    return context
  }
}

export function load(application) {
  application.renderer.defineTheme('msw-api', ApiMarkdownTheme)
}
