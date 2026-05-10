import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Articles } from './collections/Articles'
import { LandingPages } from './collections/LandingPages'
import { LegalPages } from './collections/LegalPages'
import { Leads } from './collections/Leads'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const databaseUrl = process.env.DATABASE_URL || 'file:./site.db'
const isPostgres = databaseUrl.startsWith('postgres://') || databaseUrl.startsWith('postgresql://')
const blobToken = process.env.BLOB_READ_WRITE_TOKEN

const db = isPostgres
  ? postgresAdapter({
      pool: {
        connectionString: databaseUrl,
      },
    })
  : sqliteAdapter({
      client: {
        url: databaseUrl,
      },
    })

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, LandingPages, Articles, LegalPages, Leads],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db,
  sharp,
  plugins: [
    vercelBlobStorage({
      clientUploads: true,
      collections: {
        media: true,
      },
      enabled: Boolean(blobToken),
      token: blobToken,
    }),
  ],
})
