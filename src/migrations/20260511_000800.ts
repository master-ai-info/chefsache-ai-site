import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "landing_pages"
      ADD COLUMN IF NOT EXISTS "seo_og_title" varchar,
      ADD COLUMN IF NOT EXISTS "seo_og_description" varchar;

    ALTER TABLE "_landing_pages_v"
      ADD COLUMN IF NOT EXISTS "version_seo_og_title" varchar,
      ADD COLUMN IF NOT EXISTS "version_seo_og_description" varchar;

    ALTER TABLE "landing_pages_blocks_hero"
      ADD COLUMN IF NOT EXISTS "corner_stamp_label" varchar,
      ADD COLUMN IF NOT EXISTS "corner_stamp_text" varchar,
      ADD COLUMN IF NOT EXISTS "hero_image_caption" varchar,
      ADD COLUMN IF NOT EXISTS "handwritten_note" varchar;

    ALTER TABLE "_landing_pages_v_blocks_hero"
      ADD COLUMN IF NOT EXISTS "corner_stamp_label" varchar,
      ADD COLUMN IF NOT EXISTS "corner_stamp_text" varchar,
      ADD COLUMN IF NOT EXISTS "hero_image_caption" varchar,
      ADD COLUMN IF NOT EXISTS "handwritten_note" varchar;

    ALTER TABLE "landing_pages_blocks_text"
      ADD COLUMN IF NOT EXISTS "attribution" varchar;

    ALTER TABLE "_landing_pages_v_blocks_text"
      ADD COLUMN IF NOT EXISTS "attribution" varchar;

    ALTER TABLE "landing_pages_blocks_problem"
      ADD COLUMN IF NOT EXISTS "kicker" varchar;

    ALTER TABLE "_landing_pages_v_blocks_problem"
      ADD COLUMN IF NOT EXISTS "kicker" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "_landing_pages_v_blocks_problem"
      DROP COLUMN IF EXISTS "kicker";

    ALTER TABLE "landing_pages_blocks_problem"
      DROP COLUMN IF EXISTS "kicker";

    ALTER TABLE "_landing_pages_v_blocks_text"
      DROP COLUMN IF EXISTS "attribution";

    ALTER TABLE "landing_pages_blocks_text"
      DROP COLUMN IF EXISTS "attribution";

    ALTER TABLE "_landing_pages_v_blocks_hero"
      DROP COLUMN IF EXISTS "handwritten_note",
      DROP COLUMN IF EXISTS "hero_image_caption",
      DROP COLUMN IF EXISTS "corner_stamp_text",
      DROP COLUMN IF EXISTS "corner_stamp_label";

    ALTER TABLE "landing_pages_blocks_hero"
      DROP COLUMN IF EXISTS "handwritten_note",
      DROP COLUMN IF EXISTS "hero_image_caption",
      DROP COLUMN IF EXISTS "corner_stamp_text",
      DROP COLUMN IF EXISTS "corner_stamp_label";

    ALTER TABLE "_landing_pages_v"
      DROP COLUMN IF EXISTS "version_seo_og_description",
      DROP COLUMN IF EXISTS "version_seo_og_title";

    ALTER TABLE "landing_pages"
      DROP COLUMN IF EXISTS "seo_og_description",
      DROP COLUMN IF EXISTS "seo_og_title";
  `)
}
