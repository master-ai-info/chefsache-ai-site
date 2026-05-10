import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    defaultColumns: ['name', 'email', 'company', 'status', 'createdAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'role',
      type: 'text',
    },
    {
      name: 'website',
      type: 'text',
    },
    {
      name: 'currentSituation',
      type: 'textarea',
      required: true,
    },
    {
      name: 'aiExperience',
      type: 'select',
      options: [
        { label: 'Kaum Erfahrung', value: 'none' },
        { label: 'Erste Tests', value: 'first-tests' },
        { label: 'Regelmaessige Nutzung', value: 'regular-use' },
        { label: 'Schon im Unternehmen im Einsatz', value: 'company-use' },
      ],
    },
    {
      name: 'preferredContact',
      type: 'select',
      options: [
        { label: 'E-Mail', value: 'email' },
        { label: 'Telefon', value: 'phone' },
        { label: 'LinkedIn', value: 'linkedin' },
      ],
    },
    {
      name: 'sourcePage',
      type: 'text',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Archived', value: 'archived' },
      ],
    },
  ],
}
