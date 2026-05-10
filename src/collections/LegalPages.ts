import type { CollectionConfig } from 'payload'

export const LegalPages: CollectionConfig = {
  slug: 'legal-pages',
  admin: {
    defaultColumns: ['title', 'slug', 'legalType', 'status', 'updatedAt'],
    group: 'Content',
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
      name: 'legalType',
      type: 'select',
      required: true,
      options: [
        { label: 'Impressum', value: 'impressum' },
        { label: 'Datenschutzerklaerung', value: 'datenschutz' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    {
      name: 'kicker',
      type: 'text',
    },
    {
      name: 'intro',
      type: 'textarea',
    },
    {
      name: 'contentHtml',
      type: 'textarea',
      maxLength: 200000,
      required: true,
      admin: {
        description:
          'HTML aus der Quellseite. Wichtige Anbieter-/Generator-Links in der Datenschutzerklaerung exakt beibehalten.',
        rows: 24,
      },
    },
    {
      name: 'sourceUrl',
      type: 'text',
      admin: {
        description: 'Originalquelle fuer spaetere Kontrolle.',
      },
    },
    {
      name: 'sourcePageId',
      type: 'number',
      admin: {
        description: 'WordPress page id auf kms-projects.com.',
      },
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
      ],
    },
  ],
}
