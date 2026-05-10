import type { CollectionConfig } from 'payload'

import { landingPageBlocks } from '../blocks'

export const LandingPages: CollectionConfig = {
  slug: 'landing-pages',
  admin: {
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
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
      admin: {
        description: 'Use "home" for the current one-page homepage.',
      },
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
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'pageTheme',
      type: 'select',
      defaultValue: 'dark-editorial',
      options: [
        { label: 'Dark editorial', value: 'dark-editorial' },
        { label: 'Light editorial', value: 'light-editorial' },
      ],
    },
    {
      name: 'sections',
      type: 'blocks',
      blocks: landingPageBlocks,
      required: true,
      minRows: 1,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
}
