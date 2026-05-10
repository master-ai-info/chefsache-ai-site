import React from 'react'

type LexicalTextNode = {
  type: 'text'
  text?: string
  format?: number
}

type LexicalNode = {
  type?: string
  tag?: string
  id?: string
  eyebrow?: string
  quoteType?: string
  children?: LexicalNode[]
  listType?: 'bullet' | 'number'
  text?: string
  format?: number
}

type RichTextValue = {
  root?: {
    children?: LexicalNode[]
  }
}

export type ArticleSection = {
  id: string
  label: string
}

export function getArticleSections(content?: RichTextValue): ArticleSection[] {
  const headings = content?.root?.children?.filter((node) => node.type === 'heading' && node.tag === 'h2') || []

  return headings.map((node, index) => {
    const label = getPlainText(node)
    return {
      id: node.id || slugify(label) || `section-${index + 1}`,
      label,
    }
  })
}

export function RichText({ content }: { content?: RichTextValue }) {
  const children = content?.root?.children || []

  return <>{children.map((node, index) => renderNode(node, index))}</>
}

function renderNode(node: LexicalNode, index: number): React.ReactNode {
  const key = `${node.type || 'node'}-${index}`

  if (node.type === 'paragraph') {
    const children = renderChildren(node)
    return children.length ? <p key={key}>{children}</p> : null
  }

  if (node.type === 'heading') {
    const Tag = node.tag === 'h3' ? 'h3' : 'h2'
    const text = getPlainText(node)
    const id = node.id || (Tag === 'h2' ? slugify(text) : undefined)

    return (
      <Tag id={id} key={key}>
        {Tag === 'h2' && node.eyebrow ? <span className="num">{node.eyebrow}</span> : null}
        {renderChildren(node)}
      </Tag>
    )
  }

  if (node.type === 'quote') {
    const children = renderChildren(node)

    if (node.quoteType === 'pullquote') {
      return (
        <blockquote className="pullquote" key={key}>
          <q>{children}</q>
        </blockquote>
      )
    }

    return <blockquote key={key}>{children}</blockquote>
  }

  if (node.type === 'list') {
    const Tag = node.listType === 'number' ? 'ol' : 'ul'
    return <Tag key={key}>{renderChildren(node)}</Tag>
  }

  if (node.type === 'listitem') {
    return <li key={key}>{renderChildren(node)}</li>
  }

  if (node.type === 'horizontalrule') {
    return <hr key={key} />
  }

  if (node.type === 'text') {
    return renderText(node as LexicalTextNode, key)
  }

  return renderChildren(node)
}

function renderChildren(node: LexicalNode) {
  return (node.children || []).map((child, childIndex) => renderNode(child, childIndex))
}

function renderText(node: LexicalTextNode, key: string) {
  let content: React.ReactNode = node.text || ''
  const format = node.format || 0

  if (format & 16) {
    content = <code>{content}</code>
  }

  if (format & 2) {
    content = <em>{content}</em>
  }

  if (format & 1) {
    content = <strong>{content}</strong>
  }

  return <React.Fragment key={key}>{content}</React.Fragment>
}

function getPlainText(node: LexicalNode): string {
  if (node.type === 'text') {
    return node.text || ''
  }

  return (node.children || []).map(getPlainText).join('')
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
