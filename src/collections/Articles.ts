import type { Block, CollectionConfig } from 'payload'

const ArticleImageBlock: Block = {
  slug: 'articleImage',
  labels: {
    singular: 'Article Image',
    plural: 'Article Images',
  },
  fields: [
    {
      name: 'kicker',
      type: 'text',
    },
    {
      name: 'headline',
      type: 'text',
    },
    {
      name: 'text',
      type: 'textarea',
    },
    {
      name: 'imageSrc',
      type: 'text',
      required: true,
      admin: {
        description: 'Public image path, e.g. /images/private-executive-ai-session.png',
      },
    },
    {
      name: 'imageAlt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'wide',
      options: [
        { label: 'Wide', value: 'wide' },
        { label: 'Inline', value: 'inline' },
      ],
    },
  ],
}

const ArticleTextBlock: Block = {
  slug: 'articleText',
  labels: {
    singular: 'Article Text',
    plural: 'Article Text Blocks',
  },
  fields: [
    {
      name: 'kicker',
      type: 'text',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
}

const ArticleQuoteBlock: Block = {
  slug: 'articleQuote',
  labels: {
    singular: 'Article Quote',
    plural: 'Article Quotes',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'attribution',
      type: 'text',
    },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'pull',
      options: [
        { label: 'Pull quote', value: 'pull' },
        { label: 'Compact quote', value: 'compact' },
      ],
    },
  ],
}

const ArticleHandNoteBlock: Block = {
  slug: 'articleHandNote',
  labels: {
    singular: 'Handwritten Note',
    plural: 'Handwritten Notes',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
    },
    {
      name: 'text',
      type: 'textarea',
      required: true,
    },
  ],
}

const ArticleInsightIndexBlock: Block = {
  slug: 'articleInsightIndex',
  labels: {
    singular: 'Insight Index',
    plural: 'Insight Indexes',
  },
  fields: [
    {
      name: 'kicker',
      type: 'text',
    },
    {
      name: 'headline',
      type: 'text',
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'text',
          type: 'textarea',
        },
      ],
    },
  ],
}

const ArticleComparisonTableBlock: Block = {
  slug: 'articleComparisonTable',
  labels: {
    singular: 'Comparison Table',
    plural: 'Comparison Tables',
  },
  fields: [
    {
      name: 'kicker',
      type: 'text',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'leftHeader',
      type: 'text',
      defaultValue: 'Ohne eigene Praxis',
    },
    {
      name: 'rightHeader',
      type: 'text',
      defaultValue: 'Im Coaching',
    },
    {
      name: 'rows',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'left',
          type: 'textarea',
          required: true,
        },
        {
          name: 'right',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}

const ArticleCalloutBlock: Block = {
  slug: 'articleCallout',
  labels: {
    singular: 'Article Callout',
    plural: 'Article Callouts',
  },
  fields: [
    {
      name: 'kicker',
      type: 'text',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'text',
      type: 'textarea',
    },
  ],
}

const ArticleInlineCtaBlock: Block = {
  slug: 'articleInlineCta',
  labels: {
    singular: 'Inline CTA',
    plural: 'Inline CTAs',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'text',
      type: 'textarea',
    },
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'target',
      type: 'text',
      required: true,
    },
  ],
}

const articleContentBlocks = [
  ArticleTextBlock,
  ArticleImageBlock,
  ArticleQuoteBlock,
  ArticleHandNoteBlock,
  ArticleInsightIndexBlock,
  ArticleComparisonTableBlock,
  ArticleCalloutBlock,
  ArticleInlineCtaBlock,
]

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
    },
    {
      name: 'category',
      type: 'text',
      defaultValue: 'Essay',
    },
    {
      name: 'authorName',
      type: 'text',
      defaultValue: 'Kai Michael Schaefer',
    },
    {
      name: 'authorRole',
      type: 'text',
      defaultValue: 'Executive AI Coach',
    },
    {
      name: 'authorImageSrc',
      type: 'text',
      defaultValue: '/images/kai-michael-schaefer-portrait.jpg',
      admin: {
        description: 'Public image path for the small author portrait and author box.',
      },
    },
    {
      name: 'authorBio',
      type: 'textarea',
    },
    {
      name: 'publishedAt',
      type: 'date',
    },
    {
      name: 'readingTime',
      type: 'text',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'heroImageSrc',
      type: 'text',
      admin: {
        description: 'Optional public image path fallback for POC articles.',
      },
    },
    {
      name: 'heroImageCaption',
      type: 'text',
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'contentModules',
      type: 'blocks',
      blocks: articleContentBlocks,
      admin: {
        description:
          'Optional editorial modules for richer essays: image, quote, note, index, table, callout, CTA.',
      },
    },
    {
      name: 'articleCta',
      type: 'group',
      fields: [
        {
          name: 'headline',
          type: 'text',
        },
        {
          name: 'text',
          type: 'textarea',
        },
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'target',
          type: 'text',
        },
      ],
    },
    {
      name: 'relatedArticles',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
    },
  ],
}
