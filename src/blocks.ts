import type { Block } from 'payload'

const ctaFields = [
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
] as const

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Hero',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
    },
    {
      name: 'cornerStampLabel',
      type: 'text',
    },
    {
      name: 'cornerStampText',
      type: 'text',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'subheadline',
      type: 'textarea',
      required: true,
    },
    {
      name: 'heroImageCaption',
      type: 'text',
    },
    {
      name: 'handwrittenNote',
      type: 'text',
    },
    {
      name: 'primaryCta',
      type: 'group',
      fields: [...ctaFields],
    },
    {
      name: 'secondaryCta',
      type: 'group',
      fields: [...ctaFields],
    },
    {
      name: 'trustItems',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

export const TextBlock: Block = {
  slug: 'text',
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
      name: 'body',
      type: 'textarea',
      required: true,
    },
    {
      name: 'attribution',
      type: 'text',
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'narrow',
      options: [
        { label: 'Narrow', value: 'narrow' },
        { label: 'Wide', value: 'wide' },
        { label: 'Two columns', value: 'two-column' },
      ],
    },
  ],
}

export const ProblemBlock: Block = {
  slug: 'problem',
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
      name: 'intro',
      type: 'textarea',
    },
    {
      name: 'problemItems',
      type: 'array',
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
      ],
    },
  ],
}

export const PillarsBlock: Block = {
  slug: 'pillars',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'intro',
      type: 'textarea',
    },
    {
      name: 'pillars',
      type: 'array',
      minRows: 1,
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
      ],
    },
  ],
}

export const ProcessBlock: Block = {
  slug: 'process',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'intro',
      type: 'textarea',
    },
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
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
      ],
    },
  ],
}

export const AudienceBlock: Block = {
  slug: 'audience',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'suitableFor',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'notSuitableFor',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

export const ExperienceImageBlock: Block = {
  slug: 'experienceImage',
  labels: {
    singular: 'Experience Image',
    plural: 'Experience Images',
  },
  fields: [
    {
      name: 'kicker',
      type: 'text',
      defaultValue: 'Private Session',
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
  ],
}

export const FAQBlock: Block = {
  slug: 'faq',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'faqs',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonials',
    plural: 'Testimonials',
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
      name: 'intro',
      type: 'textarea',
    },
    {
      name: 'testimonials',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
        },
        {
          name: 'person',
          type: 'text',
          required: true,
        },
        {
          name: 'context',
          type: 'text',
        },
      ],
    },
  ],
}

export const ArticleTeasersBlock: Block = {
  slug: 'articleTeasers',
  labels: {
    singular: 'Article Teasers',
    plural: 'Article Teasers',
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
      name: 'intro',
      type: 'textarea',
    },
    {
      name: 'articles',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'category',
          type: 'text',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'excerpt',
          type: 'textarea',
          required: true,
        },
        {
          name: 'readingTime',
          type: 'text',
        },
        {
          name: 'target',
          type: 'text',
        },
      ],
    },
  ],
}

export const CTABlock: Block = {
  slug: 'cta',
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
      name: 'cta',
      type: 'group',
      fields: [...ctaFields],
    },
  ],
}

export const CTAAccentsBlock: Block = {
  slug: 'ctaAccents',
  labels: {
    singular: 'CTA Accents',
    plural: 'CTA Accents',
  },
  fields: [
    {
      name: 'kicker',
      type: 'text',
      defaultValue: 'Naechster Schritt',
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
        {
          name: 'cta',
          type: 'group',
          fields: [...ctaFields],
        },
      ],
    },
  ],
}

export const ContactFormBlock: Block = {
  slug: 'contactForm',
  labels: {
    singular: 'Contact Form',
    plural: 'Contact Forms',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'intro',
      type: 'textarea',
    },
    {
      name: 'submitLabel',
      type: 'text',
      defaultValue: 'Erstgespraech anfragen',
    },
    {
      name: 'successMessage',
      type: 'textarea',
      defaultValue: 'Danke. Ihre Anfrage wurde gespeichert.',
    },
  ],
}

export const landingPageBlocks = [
  HeroBlock,
  TextBlock,
  ProblemBlock,
  PillarsBlock,
  ProcessBlock,
  AudienceBlock,
  ExperienceImageBlock,
  TestimonialsBlock,
  ArticleTeasersBlock,
  FAQBlock,
  CTABlock,
  CTAAccentsBlock,
  ContactFormBlock,
]
