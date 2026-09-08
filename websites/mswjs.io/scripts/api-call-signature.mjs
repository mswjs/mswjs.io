import { ReflectionKind } from 'typedoc'

function inlineCode(value) {
  const text = value.replace(/\r?\n/g, ' ')
  const delimiter = '`'.repeat(
    Math.max(
      1,
      ...Array.from(text.matchAll(/`+/g), (match) => match[0].length + 1),
    ),
  )
  const padding = text.includes('`') ? ' ' : ''
  return `${delimiter}${padding}${text}${padding}${delimiter}`
}

function withDescription(context, line, parts, indentation) {
  const description = parts && context.helpers.getCommentParts(parts).trim()
  if (!description) {
    return line
  }
  return `${line}, ${description.replace(/\n/g, `\n${indentation}`)}`
}

export function renderCallSignature(context, model, options) {
  const sections = []
  if (!options.hideTitle) {
    sections.push(
      context.partials.signatureTitle(model, { accessor: options.accessor }),
    )
  }
  if (!options.nested && !context.options.getValue('disableSources')) {
    sections.push(context.partials.sources(model))
  }
  const comment = options.multipleSignatures
    ? model.comment
    : model.comment || model.parent?.comment
  if (comment) {
    sections.push(
      context.partials.comment(comment, {
        headingLevel: options.headingLevel,
        showTags: false,
        showSummary: true,
      }),
    )
  }
  if (!options.multipleSignatures && model.parent?.documents) {
    sections.push(context.partials.documents(model.parent, options))
  }

  const items = []
  if (
    model.typeParameters?.length &&
    model.kind !== ReflectionKind.ConstructorSignature
  ) {
    items.push('- Type parameters:')
    for (const parameter of model.typeParameters) {
      const constraint = parameter.type
        ? ` extends ${parameter.type.toString()}`
        : ''
      const defaultValue = parameter.default
        ? ` = ${parameter.default.toString()}`
        : ''
      items.push(
        withDescription(
          context,
          `  - ${inlineCode(`${parameter.name}${constraint}${defaultValue}`)}`,
          parameter.comment?.summary,
          '    ',
        ),
      )
    }
  }
  if (model.parameters?.length) {
    items.push('- Parameters:')
    for (const parameter of model.parameters) {
      const optional =
        parameter.flags.isOptional || parameter.defaultValue !== undefined
          ? ', <em>optional</em>'
          : ''
      const rest = parameter.flags.isRest ? '...' : ''
      let line = `  - ${inlineCode(`${rest}${parameter.name}`)} (${inlineCode(parameter.type?.toString() ?? 'unknown')}${optional})`
      if (parameter.defaultValue !== undefined) {
        line += `. Default: ${inlineCode(context.helpers.getParameterDefaultValue(parameter))}`
      }
      items.push(
        withDescription(context, line, parameter.comment?.summary, '    '),
      )
    }
  }
  if (model.type) {
    items.push(
      withDescription(
        context,
        `- Returns: ${inlineCode(model.type.toString())}`,
        comment?.getTag('@returns')?.content,
        '  ',
      ),
    )
  }
  if (items.length) {
    sections.push(
      `${'#'.repeat(options.headingLevel)} Call signature\n\n${items.join('\n')}`,
    )
  }
  if (comment) {
    sections.push(
      context.partials.comment(comment, {
        headingLevel: options.headingLevel,
        showTags: true,
        showSummary: false,
      }),
    )
  }
  sections.push(context.partials.inheritance(model, options))
  return sections.filter(Boolean).join('\n\n')
}
