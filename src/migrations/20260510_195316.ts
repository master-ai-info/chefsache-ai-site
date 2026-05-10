import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_landing_pages_blocks_text_layout" AS ENUM('narrow', 'wide', 'two-column');
  CREATE TYPE "public"."enum_landing_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_landing_pages_page_theme" AS ENUM('dark-editorial', 'light-editorial');
  CREATE TYPE "public"."enum__landing_pages_v_blocks_text_layout" AS ENUM('narrow', 'wide', 'two-column');
  CREATE TYPE "public"."enum__landing_pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__landing_pages_v_version_page_theme" AS ENUM('dark-editorial', 'light-editorial');
  CREATE TYPE "public"."enum_articles_blocks_article_image_layout" AS ENUM('wide', 'inline');
  CREATE TYPE "public"."enum_articles_blocks_article_quote_variant" AS ENUM('pull', 'compact');
  CREATE TYPE "public"."enum_articles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__articles_v_blocks_article_image_layout" AS ENUM('wide', 'inline');
  CREATE TYPE "public"."enum__articles_v_blocks_article_quote_variant" AS ENUM('pull', 'compact');
  CREATE TYPE "public"."enum__articles_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_legal_pages_legal_type" AS ENUM('impressum', 'datenschutz');
  CREATE TYPE "public"."enum_legal_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__legal_pages_v_version_legal_type" AS ENUM('impressum', 'datenschutz');
  CREATE TYPE "public"."enum__legal_pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_leads_ai_experience" AS ENUM('none', 'first-tests', 'regular-use', 'company-use');
  CREATE TYPE "public"."enum_leads_preferred_contact" AS ENUM('email', 'phone', 'linkedin');
  CREATE TYPE "public"."enum_leads_status" AS ENUM('new', 'contacted', 'qualified', 'archived');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "landing_pages_blocks_hero_trust_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subheadline" varchar,
  	"primary_cta_label" varchar,
  	"primary_cta_target" varchar,
  	"secondary_cta_label" varchar,
  	"secondary_cta_target" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"headline" varchar,
  	"body" varchar,
  	"layout" "enum_landing_pages_blocks_text_layout" DEFAULT 'narrow',
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_problem_problem_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_problem" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_pillars_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_audience_suitable_for" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_audience_not_suitable_for" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_audience" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_experience_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar DEFAULT 'Private Session',
  	"headline" varchar,
  	"text" varchar,
  	"image_src" varchar,
  	"image_alt" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_testimonials_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"person" varchar,
  	"context" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"headline" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_article_teasers_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar,
  	"title" varchar,
  	"excerpt" varchar,
  	"reading_time" varchar,
  	"target" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_article_teasers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"headline" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_faq_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"text" varchar,
  	"cta_label" varchar,
  	"cta_target" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_cta_accents_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"headline" varchar,
  	"text" varchar,
  	"cta_label" varchar,
  	"cta_target" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_cta_accents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar DEFAULT 'Naechster Schritt',
  	"headline" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_pages_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"intro" varchar,
  	"submit_label" varchar DEFAULT 'Erstgespraech anfragen',
  	"success_message" varchar DEFAULT 'Danke. Ihre Anfrage wurde gespeichert.',
  	"block_name" varchar
  );
  
  CREATE TABLE "landing_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"status" "enum_landing_pages_status" DEFAULT 'draft',
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"page_theme" "enum_landing_pages_page_theme" DEFAULT 'dark-editorial',
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_landing_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_landing_pages_v_blocks_hero_trust_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subheadline" varchar,
  	"primary_cta_label" varchar,
  	"primary_cta_target" varchar,
  	"secondary_cta_label" varchar,
  	"secondary_cta_target" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"headline" varchar,
  	"body" varchar,
  	"layout" "enum__landing_pages_v_blocks_text_layout" DEFAULT 'narrow',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_problem_problem_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_problem" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_pillars_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_audience_suitable_for" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_audience_not_suitable_for" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_audience" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_experience_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar DEFAULT 'Private Session',
  	"headline" varchar,
  	"text" varchar,
  	"image_src" varchar,
  	"image_alt" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_testimonials_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"person" varchar,
  	"context" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"headline" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_article_teasers_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" varchar,
  	"title" varchar,
  	"excerpt" varchar,
  	"reading_time" varchar,
  	"target" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_article_teasers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"headline" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_faq_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"text" varchar,
  	"cta_label" varchar,
  	"cta_target" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_cta_accents_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"headline" varchar,
  	"text" varchar,
  	"cta_label" varchar,
  	"cta_target" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_cta_accents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar DEFAULT 'Naechster Schritt',
  	"headline" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_landing_pages_v_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"intro" varchar,
  	"submit_label" varchar DEFAULT 'Erstgespraech anfragen',
  	"success_message" varchar DEFAULT 'Danke. Ihre Anfrage wurde gespeichert.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_landing_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_status" "enum__landing_pages_v_version_status" DEFAULT 'draft',
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_page_theme" "enum__landing_pages_v_version_page_theme" DEFAULT 'dark-editorial',
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__landing_pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "articles_blocks_article_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_article_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"headline" varchar,
  	"text" varchar,
  	"image_src" varchar,
  	"image_alt" varchar,
  	"caption" varchar,
  	"layout" "enum_articles_blocks_article_image_layout" DEFAULT 'wide',
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_article_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"variant" "enum_articles_blocks_article_quote_variant" DEFAULT 'pull',
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_article_hand_note" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_article_insight_index_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "articles_blocks_article_insight_index" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"headline" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_article_comparison_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"left" varchar,
  	"right" varchar
  );
  
  CREATE TABLE "articles_blocks_article_comparison_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"headline" varchar,
  	"left_header" varchar DEFAULT 'Ohne eigene Praxis',
  	"right_header" varchar DEFAULT 'Im Coaching',
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_article_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"headline" varchar,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_article_inline_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"text" varchar,
  	"label" varchar,
  	"target" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"status" "enum_articles_status" DEFAULT 'draft',
  	"excerpt" varchar,
  	"category" varchar DEFAULT 'Essay',
  	"author_name" varchar DEFAULT 'Kai Michael Schaefer',
  	"author_role" varchar DEFAULT 'Executive AI Coach',
  	"author_image_src" varchar DEFAULT '/images/kai-michael-schaefer-portrait.jpg',
  	"author_bio" varchar,
  	"published_at" timestamp(3) with time zone,
  	"reading_time" varchar,
  	"hero_image_id" integer,
  	"hero_image_src" varchar,
  	"hero_image_caption" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"content" jsonb,
  	"article_cta_headline" varchar,
  	"article_cta_text" varchar,
  	"article_cta_label" varchar,
  	"article_cta_target" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_articles_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "articles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"articles_id" integer
  );
  
  CREATE TABLE "_articles_v_blocks_article_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_article_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"headline" varchar,
  	"text" varchar,
  	"image_src" varchar,
  	"image_alt" varchar,
  	"caption" varchar,
  	"layout" "enum__articles_v_blocks_article_image_layout" DEFAULT 'wide',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_article_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"variant" "enum__articles_v_blocks_article_quote_variant" DEFAULT 'pull',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_article_hand_note" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_article_insight_index_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_article_insight_index" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"headline" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_article_comparison_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"left" varchar,
  	"right" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_article_comparison_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"headline" varchar,
  	"left_header" varchar DEFAULT 'Ohne eigene Praxis',
  	"right_header" varchar DEFAULT 'Im Coaching',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_article_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"headline" varchar,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v_blocks_article_inline_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"text" varchar,
  	"label" varchar,
  	"target" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_articles_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_status" "enum__articles_v_version_status" DEFAULT 'draft',
  	"version_excerpt" varchar,
  	"version_category" varchar DEFAULT 'Essay',
  	"version_author_name" varchar DEFAULT 'Kai Michael Schaefer',
  	"version_author_role" varchar DEFAULT 'Executive AI Coach',
  	"version_author_image_src" varchar DEFAULT '/images/kai-michael-schaefer-portrait.jpg',
  	"version_author_bio" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_reading_time" varchar,
  	"version_hero_image_id" integer,
  	"version_hero_image_src" varchar,
  	"version_hero_image_caption" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_content" jsonb,
  	"version_article_cta_headline" varchar,
  	"version_article_cta_text" varchar,
  	"version_article_cta_label" varchar,
  	"version_article_cta_target" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__articles_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_articles_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"articles_id" integer
  );
  
  CREATE TABLE "legal_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"legal_type" "enum_legal_pages_legal_type",
  	"status" "enum_legal_pages_status" DEFAULT 'published',
  	"kicker" varchar,
  	"intro" varchar,
  	"content_html" varchar,
  	"source_url" varchar,
  	"source_page_id" numeric,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_legal_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_legal_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_legal_type" "enum__legal_pages_v_version_legal_type",
  	"version_status" "enum__legal_pages_v_version_status" DEFAULT 'published',
  	"version_kicker" varchar,
  	"version_intro" varchar,
  	"version_content_html" varchar,
  	"version_source_url" varchar,
  	"version_source_page_id" numeric,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__legal_pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"company" varchar,
  	"role" varchar,
  	"website" varchar,
  	"current_situation" varchar NOT NULL,
  	"ai_experience" "enum_leads_ai_experience",
  	"preferred_contact" "enum_leads_preferred_contact",
  	"source_page" varchar,
  	"status" "enum_leads_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"landing_pages_id" integer,
  	"articles_id" integer,
  	"legal_pages_id" integer,
  	"leads_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_hero_trust_items" ADD CONSTRAINT "landing_pages_blocks_hero_trust_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_hero" ADD CONSTRAINT "landing_pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_text" ADD CONSTRAINT "landing_pages_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_problem_problem_items" ADD CONSTRAINT "landing_pages_blocks_problem_problem_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_problem"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_problem" ADD CONSTRAINT "landing_pages_blocks_problem_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_pillars_pillars" ADD CONSTRAINT "landing_pages_blocks_pillars_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_pillars" ADD CONSTRAINT "landing_pages_blocks_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_process_steps" ADD CONSTRAINT "landing_pages_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_process" ADD CONSTRAINT "landing_pages_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_audience_suitable_for" ADD CONSTRAINT "landing_pages_blocks_audience_suitable_for_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_audience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_audience_not_suitable_for" ADD CONSTRAINT "landing_pages_blocks_audience_not_suitable_for_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_audience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_audience" ADD CONSTRAINT "landing_pages_blocks_audience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_experience_image" ADD CONSTRAINT "landing_pages_blocks_experience_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_testimonials_testimonials" ADD CONSTRAINT "landing_pages_blocks_testimonials_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_testimonials" ADD CONSTRAINT "landing_pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_article_teasers_articles" ADD CONSTRAINT "landing_pages_blocks_article_teasers_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_article_teasers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_article_teasers" ADD CONSTRAINT "landing_pages_blocks_article_teasers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_faq_faqs" ADD CONSTRAINT "landing_pages_blocks_faq_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_faq" ADD CONSTRAINT "landing_pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_cta" ADD CONSTRAINT "landing_pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_cta_accents_items" ADD CONSTRAINT "landing_pages_blocks_cta_accents_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages_blocks_cta_accents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_cta_accents" ADD CONSTRAINT "landing_pages_blocks_cta_accents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_blocks_contact_form" ADD CONSTRAINT "landing_pages_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages" ADD CONSTRAINT "landing_pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_hero_trust_items" ADD CONSTRAINT "_landing_pages_v_blocks_hero_trust_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_hero" ADD CONSTRAINT "_landing_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_text" ADD CONSTRAINT "_landing_pages_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_problem_problem_items" ADD CONSTRAINT "_landing_pages_v_blocks_problem_problem_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v_blocks_problem"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_problem" ADD CONSTRAINT "_landing_pages_v_blocks_problem_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_pillars_pillars" ADD CONSTRAINT "_landing_pages_v_blocks_pillars_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v_blocks_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_pillars" ADD CONSTRAINT "_landing_pages_v_blocks_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_process_steps" ADD CONSTRAINT "_landing_pages_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v_blocks_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_process" ADD CONSTRAINT "_landing_pages_v_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_audience_suitable_for" ADD CONSTRAINT "_landing_pages_v_blocks_audience_suitable_for_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v_blocks_audience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_audience_not_suitable_for" ADD CONSTRAINT "_landing_pages_v_blocks_audience_not_suitable_for_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v_blocks_audience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_audience" ADD CONSTRAINT "_landing_pages_v_blocks_audience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_experience_image" ADD CONSTRAINT "_landing_pages_v_blocks_experience_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_testimonials_testimonials" ADD CONSTRAINT "_landing_pages_v_blocks_testimonials_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_testimonials" ADD CONSTRAINT "_landing_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_article_teasers_articles" ADD CONSTRAINT "_landing_pages_v_blocks_article_teasers_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v_blocks_article_teasers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_article_teasers" ADD CONSTRAINT "_landing_pages_v_blocks_article_teasers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_faq_faqs" ADD CONSTRAINT "_landing_pages_v_blocks_faq_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_faq" ADD CONSTRAINT "_landing_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_cta" ADD CONSTRAINT "_landing_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_cta_accents_items" ADD CONSTRAINT "_landing_pages_v_blocks_cta_accents_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v_blocks_cta_accents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_cta_accents" ADD CONSTRAINT "_landing_pages_v_blocks_cta_accents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_blocks_contact_form" ADD CONSTRAINT "_landing_pages_v_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v" ADD CONSTRAINT "_landing_pages_v_parent_id_landing_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_landing_pages_v" ADD CONSTRAINT "_landing_pages_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_article_text" ADD CONSTRAINT "articles_blocks_article_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_article_image" ADD CONSTRAINT "articles_blocks_article_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_article_quote" ADD CONSTRAINT "articles_blocks_article_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_article_hand_note" ADD CONSTRAINT "articles_blocks_article_hand_note_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_article_insight_index_items" ADD CONSTRAINT "articles_blocks_article_insight_index_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_article_insight_index"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_article_insight_index" ADD CONSTRAINT "articles_blocks_article_insight_index_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_article_comparison_table_rows" ADD CONSTRAINT "articles_blocks_article_comparison_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_article_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_article_comparison_table" ADD CONSTRAINT "articles_blocks_article_comparison_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_article_callout" ADD CONSTRAINT "articles_blocks_article_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_article_inline_cta" ADD CONSTRAINT "articles_blocks_article_inline_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_article_text" ADD CONSTRAINT "_articles_v_blocks_article_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_article_image" ADD CONSTRAINT "_articles_v_blocks_article_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_article_quote" ADD CONSTRAINT "_articles_v_blocks_article_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_article_hand_note" ADD CONSTRAINT "_articles_v_blocks_article_hand_note_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_article_insight_index_items" ADD CONSTRAINT "_articles_v_blocks_article_insight_index_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_article_insight_index"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_article_insight_index" ADD CONSTRAINT "_articles_v_blocks_article_insight_index_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_article_comparison_table_rows" ADD CONSTRAINT "_articles_v_blocks_article_comparison_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v_blocks_article_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_article_comparison_table" ADD CONSTRAINT "_articles_v_blocks_article_comparison_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_article_callout" ADD CONSTRAINT "_articles_v_blocks_article_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_blocks_article_inline_cta" ADD CONSTRAINT "_articles_v_blocks_article_inline_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_parent_id_articles_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_legal_pages_v" ADD CONSTRAINT "_legal_pages_v_parent_id_legal_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."legal_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_landing_pages_fk" FOREIGN KEY ("landing_pages_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_legal_pages_fk" FOREIGN KEY ("legal_pages_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leads_fk" FOREIGN KEY ("leads_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "landing_pages_blocks_hero_trust_items_order_idx" ON "landing_pages_blocks_hero_trust_items" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_hero_trust_items_parent_id_idx" ON "landing_pages_blocks_hero_trust_items" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_hero_order_idx" ON "landing_pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_hero_parent_id_idx" ON "landing_pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_hero_path_idx" ON "landing_pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "landing_pages_blocks_text_order_idx" ON "landing_pages_blocks_text" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_text_parent_id_idx" ON "landing_pages_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_text_path_idx" ON "landing_pages_blocks_text" USING btree ("_path");
  CREATE INDEX "landing_pages_blocks_problem_problem_items_order_idx" ON "landing_pages_blocks_problem_problem_items" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_problem_problem_items_parent_id_idx" ON "landing_pages_blocks_problem_problem_items" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_problem_order_idx" ON "landing_pages_blocks_problem" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_problem_parent_id_idx" ON "landing_pages_blocks_problem" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_problem_path_idx" ON "landing_pages_blocks_problem" USING btree ("_path");
  CREATE INDEX "landing_pages_blocks_pillars_pillars_order_idx" ON "landing_pages_blocks_pillars_pillars" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_pillars_pillars_parent_id_idx" ON "landing_pages_blocks_pillars_pillars" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_pillars_order_idx" ON "landing_pages_blocks_pillars" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_pillars_parent_id_idx" ON "landing_pages_blocks_pillars" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_pillars_path_idx" ON "landing_pages_blocks_pillars" USING btree ("_path");
  CREATE INDEX "landing_pages_blocks_process_steps_order_idx" ON "landing_pages_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_process_steps_parent_id_idx" ON "landing_pages_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_process_order_idx" ON "landing_pages_blocks_process" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_process_parent_id_idx" ON "landing_pages_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_process_path_idx" ON "landing_pages_blocks_process" USING btree ("_path");
  CREATE INDEX "landing_pages_blocks_audience_suitable_for_order_idx" ON "landing_pages_blocks_audience_suitable_for" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_audience_suitable_for_parent_id_idx" ON "landing_pages_blocks_audience_suitable_for" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_audience_not_suitable_for_order_idx" ON "landing_pages_blocks_audience_not_suitable_for" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_audience_not_suitable_for_parent_id_idx" ON "landing_pages_blocks_audience_not_suitable_for" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_audience_order_idx" ON "landing_pages_blocks_audience" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_audience_parent_id_idx" ON "landing_pages_blocks_audience" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_audience_path_idx" ON "landing_pages_blocks_audience" USING btree ("_path");
  CREATE INDEX "landing_pages_blocks_experience_image_order_idx" ON "landing_pages_blocks_experience_image" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_experience_image_parent_id_idx" ON "landing_pages_blocks_experience_image" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_experience_image_path_idx" ON "landing_pages_blocks_experience_image" USING btree ("_path");
  CREATE INDEX "landing_pages_blocks_testimonials_testimonials_order_idx" ON "landing_pages_blocks_testimonials_testimonials" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_testimonials_testimonials_parent_id_idx" ON "landing_pages_blocks_testimonials_testimonials" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_testimonials_order_idx" ON "landing_pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_testimonials_parent_id_idx" ON "landing_pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_testimonials_path_idx" ON "landing_pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "landing_pages_blocks_article_teasers_articles_order_idx" ON "landing_pages_blocks_article_teasers_articles" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_article_teasers_articles_parent_id_idx" ON "landing_pages_blocks_article_teasers_articles" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_article_teasers_order_idx" ON "landing_pages_blocks_article_teasers" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_article_teasers_parent_id_idx" ON "landing_pages_blocks_article_teasers" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_article_teasers_path_idx" ON "landing_pages_blocks_article_teasers" USING btree ("_path");
  CREATE INDEX "landing_pages_blocks_faq_faqs_order_idx" ON "landing_pages_blocks_faq_faqs" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_faq_faqs_parent_id_idx" ON "landing_pages_blocks_faq_faqs" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_faq_order_idx" ON "landing_pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_faq_parent_id_idx" ON "landing_pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_faq_path_idx" ON "landing_pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "landing_pages_blocks_cta_order_idx" ON "landing_pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_cta_parent_id_idx" ON "landing_pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_cta_path_idx" ON "landing_pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "landing_pages_blocks_cta_accents_items_order_idx" ON "landing_pages_blocks_cta_accents_items" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_cta_accents_items_parent_id_idx" ON "landing_pages_blocks_cta_accents_items" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_cta_accents_order_idx" ON "landing_pages_blocks_cta_accents" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_cta_accents_parent_id_idx" ON "landing_pages_blocks_cta_accents" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_cta_accents_path_idx" ON "landing_pages_blocks_cta_accents" USING btree ("_path");
  CREATE INDEX "landing_pages_blocks_contact_form_order_idx" ON "landing_pages_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "landing_pages_blocks_contact_form_parent_id_idx" ON "landing_pages_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "landing_pages_blocks_contact_form_path_idx" ON "landing_pages_blocks_contact_form" USING btree ("_path");
  CREATE UNIQUE INDEX "landing_pages_slug_idx" ON "landing_pages" USING btree ("slug");
  CREATE INDEX "landing_pages_seo_seo_og_image_idx" ON "landing_pages" USING btree ("seo_og_image_id");
  CREATE INDEX "landing_pages_updated_at_idx" ON "landing_pages" USING btree ("updated_at");
  CREATE INDEX "landing_pages_created_at_idx" ON "landing_pages" USING btree ("created_at");
  CREATE INDEX "landing_pages__status_idx" ON "landing_pages" USING btree ("_status");
  CREATE INDEX "_landing_pages_v_blocks_hero_trust_items_order_idx" ON "_landing_pages_v_blocks_hero_trust_items" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_hero_trust_items_parent_id_idx" ON "_landing_pages_v_blocks_hero_trust_items" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_hero_order_idx" ON "_landing_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_hero_parent_id_idx" ON "_landing_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_hero_path_idx" ON "_landing_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_landing_pages_v_blocks_text_order_idx" ON "_landing_pages_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_text_parent_id_idx" ON "_landing_pages_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_text_path_idx" ON "_landing_pages_v_blocks_text" USING btree ("_path");
  CREATE INDEX "_landing_pages_v_blocks_problem_problem_items_order_idx" ON "_landing_pages_v_blocks_problem_problem_items" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_problem_problem_items_parent_id_idx" ON "_landing_pages_v_blocks_problem_problem_items" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_problem_order_idx" ON "_landing_pages_v_blocks_problem" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_problem_parent_id_idx" ON "_landing_pages_v_blocks_problem" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_problem_path_idx" ON "_landing_pages_v_blocks_problem" USING btree ("_path");
  CREATE INDEX "_landing_pages_v_blocks_pillars_pillars_order_idx" ON "_landing_pages_v_blocks_pillars_pillars" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_pillars_pillars_parent_id_idx" ON "_landing_pages_v_blocks_pillars_pillars" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_pillars_order_idx" ON "_landing_pages_v_blocks_pillars" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_pillars_parent_id_idx" ON "_landing_pages_v_blocks_pillars" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_pillars_path_idx" ON "_landing_pages_v_blocks_pillars" USING btree ("_path");
  CREATE INDEX "_landing_pages_v_blocks_process_steps_order_idx" ON "_landing_pages_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_process_steps_parent_id_idx" ON "_landing_pages_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_process_order_idx" ON "_landing_pages_v_blocks_process" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_process_parent_id_idx" ON "_landing_pages_v_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_process_path_idx" ON "_landing_pages_v_blocks_process" USING btree ("_path");
  CREATE INDEX "_landing_pages_v_blocks_audience_suitable_for_order_idx" ON "_landing_pages_v_blocks_audience_suitable_for" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_audience_suitable_for_parent_id_idx" ON "_landing_pages_v_blocks_audience_suitable_for" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_audience_not_suitable_for_order_idx" ON "_landing_pages_v_blocks_audience_not_suitable_for" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_audience_not_suitable_for_parent_id_idx" ON "_landing_pages_v_blocks_audience_not_suitable_for" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_audience_order_idx" ON "_landing_pages_v_blocks_audience" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_audience_parent_id_idx" ON "_landing_pages_v_blocks_audience" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_audience_path_idx" ON "_landing_pages_v_blocks_audience" USING btree ("_path");
  CREATE INDEX "_landing_pages_v_blocks_experience_image_order_idx" ON "_landing_pages_v_blocks_experience_image" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_experience_image_parent_id_idx" ON "_landing_pages_v_blocks_experience_image" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_experience_image_path_idx" ON "_landing_pages_v_blocks_experience_image" USING btree ("_path");
  CREATE INDEX "_landing_pages_v_blocks_testimonials_testimonials_order_idx" ON "_landing_pages_v_blocks_testimonials_testimonials" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_testimonials_testimonials_parent_id_idx" ON "_landing_pages_v_blocks_testimonials_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_testimonials_order_idx" ON "_landing_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_testimonials_parent_id_idx" ON "_landing_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_testimonials_path_idx" ON "_landing_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_landing_pages_v_blocks_article_teasers_articles_order_idx" ON "_landing_pages_v_blocks_article_teasers_articles" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_article_teasers_articles_parent_id_idx" ON "_landing_pages_v_blocks_article_teasers_articles" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_article_teasers_order_idx" ON "_landing_pages_v_blocks_article_teasers" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_article_teasers_parent_id_idx" ON "_landing_pages_v_blocks_article_teasers" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_article_teasers_path_idx" ON "_landing_pages_v_blocks_article_teasers" USING btree ("_path");
  CREATE INDEX "_landing_pages_v_blocks_faq_faqs_order_idx" ON "_landing_pages_v_blocks_faq_faqs" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_faq_faqs_parent_id_idx" ON "_landing_pages_v_blocks_faq_faqs" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_faq_order_idx" ON "_landing_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_faq_parent_id_idx" ON "_landing_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_faq_path_idx" ON "_landing_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_landing_pages_v_blocks_cta_order_idx" ON "_landing_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_cta_parent_id_idx" ON "_landing_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_cta_path_idx" ON "_landing_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_landing_pages_v_blocks_cta_accents_items_order_idx" ON "_landing_pages_v_blocks_cta_accents_items" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_cta_accents_items_parent_id_idx" ON "_landing_pages_v_blocks_cta_accents_items" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_cta_accents_order_idx" ON "_landing_pages_v_blocks_cta_accents" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_cta_accents_parent_id_idx" ON "_landing_pages_v_blocks_cta_accents" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_cta_accents_path_idx" ON "_landing_pages_v_blocks_cta_accents" USING btree ("_path");
  CREATE INDEX "_landing_pages_v_blocks_contact_form_order_idx" ON "_landing_pages_v_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "_landing_pages_v_blocks_contact_form_parent_id_idx" ON "_landing_pages_v_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "_landing_pages_v_blocks_contact_form_path_idx" ON "_landing_pages_v_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "_landing_pages_v_parent_idx" ON "_landing_pages_v" USING btree ("parent_id");
  CREATE INDEX "_landing_pages_v_version_version_slug_idx" ON "_landing_pages_v" USING btree ("version_slug");
  CREATE INDEX "_landing_pages_v_version_seo_version_seo_og_image_idx" ON "_landing_pages_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_landing_pages_v_version_version_updated_at_idx" ON "_landing_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_landing_pages_v_version_version_created_at_idx" ON "_landing_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_landing_pages_v_version_version__status_idx" ON "_landing_pages_v" USING btree ("version__status");
  CREATE INDEX "_landing_pages_v_created_at_idx" ON "_landing_pages_v" USING btree ("created_at");
  CREATE INDEX "_landing_pages_v_updated_at_idx" ON "_landing_pages_v" USING btree ("updated_at");
  CREATE INDEX "_landing_pages_v_latest_idx" ON "_landing_pages_v" USING btree ("latest");
  CREATE INDEX "articles_blocks_article_text_order_idx" ON "articles_blocks_article_text" USING btree ("_order");
  CREATE INDEX "articles_blocks_article_text_parent_id_idx" ON "articles_blocks_article_text" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_article_text_path_idx" ON "articles_blocks_article_text" USING btree ("_path");
  CREATE INDEX "articles_blocks_article_image_order_idx" ON "articles_blocks_article_image" USING btree ("_order");
  CREATE INDEX "articles_blocks_article_image_parent_id_idx" ON "articles_blocks_article_image" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_article_image_path_idx" ON "articles_blocks_article_image" USING btree ("_path");
  CREATE INDEX "articles_blocks_article_quote_order_idx" ON "articles_blocks_article_quote" USING btree ("_order");
  CREATE INDEX "articles_blocks_article_quote_parent_id_idx" ON "articles_blocks_article_quote" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_article_quote_path_idx" ON "articles_blocks_article_quote" USING btree ("_path");
  CREATE INDEX "articles_blocks_article_hand_note_order_idx" ON "articles_blocks_article_hand_note" USING btree ("_order");
  CREATE INDEX "articles_blocks_article_hand_note_parent_id_idx" ON "articles_blocks_article_hand_note" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_article_hand_note_path_idx" ON "articles_blocks_article_hand_note" USING btree ("_path");
  CREATE INDEX "articles_blocks_article_insight_index_items_order_idx" ON "articles_blocks_article_insight_index_items" USING btree ("_order");
  CREATE INDEX "articles_blocks_article_insight_index_items_parent_id_idx" ON "articles_blocks_article_insight_index_items" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_article_insight_index_order_idx" ON "articles_blocks_article_insight_index" USING btree ("_order");
  CREATE INDEX "articles_blocks_article_insight_index_parent_id_idx" ON "articles_blocks_article_insight_index" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_article_insight_index_path_idx" ON "articles_blocks_article_insight_index" USING btree ("_path");
  CREATE INDEX "articles_blocks_article_comparison_table_rows_order_idx" ON "articles_blocks_article_comparison_table_rows" USING btree ("_order");
  CREATE INDEX "articles_blocks_article_comparison_table_rows_parent_id_idx" ON "articles_blocks_article_comparison_table_rows" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_article_comparison_table_order_idx" ON "articles_blocks_article_comparison_table" USING btree ("_order");
  CREATE INDEX "articles_blocks_article_comparison_table_parent_id_idx" ON "articles_blocks_article_comparison_table" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_article_comparison_table_path_idx" ON "articles_blocks_article_comparison_table" USING btree ("_path");
  CREATE INDEX "articles_blocks_article_callout_order_idx" ON "articles_blocks_article_callout" USING btree ("_order");
  CREATE INDEX "articles_blocks_article_callout_parent_id_idx" ON "articles_blocks_article_callout" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_article_callout_path_idx" ON "articles_blocks_article_callout" USING btree ("_path");
  CREATE INDEX "articles_blocks_article_inline_cta_order_idx" ON "articles_blocks_article_inline_cta" USING btree ("_order");
  CREATE INDEX "articles_blocks_article_inline_cta_parent_id_idx" ON "articles_blocks_article_inline_cta" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_article_inline_cta_path_idx" ON "articles_blocks_article_inline_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX "articles_hero_image_idx" ON "articles" USING btree ("hero_image_id");
  CREATE INDEX "articles_seo_seo_og_image_idx" ON "articles" USING btree ("seo_og_image_id");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX "articles__status_idx" ON "articles" USING btree ("_status");
  CREATE INDEX "articles_rels_order_idx" ON "articles_rels" USING btree ("order");
  CREATE INDEX "articles_rels_parent_idx" ON "articles_rels" USING btree ("parent_id");
  CREATE INDEX "articles_rels_path_idx" ON "articles_rels" USING btree ("path");
  CREATE INDEX "articles_rels_articles_id_idx" ON "articles_rels" USING btree ("articles_id");
  CREATE INDEX "_articles_v_blocks_article_text_order_idx" ON "_articles_v_blocks_article_text" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_article_text_parent_id_idx" ON "_articles_v_blocks_article_text" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_article_text_path_idx" ON "_articles_v_blocks_article_text" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_article_image_order_idx" ON "_articles_v_blocks_article_image" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_article_image_parent_id_idx" ON "_articles_v_blocks_article_image" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_article_image_path_idx" ON "_articles_v_blocks_article_image" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_article_quote_order_idx" ON "_articles_v_blocks_article_quote" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_article_quote_parent_id_idx" ON "_articles_v_blocks_article_quote" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_article_quote_path_idx" ON "_articles_v_blocks_article_quote" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_article_hand_note_order_idx" ON "_articles_v_blocks_article_hand_note" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_article_hand_note_parent_id_idx" ON "_articles_v_blocks_article_hand_note" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_article_hand_note_path_idx" ON "_articles_v_blocks_article_hand_note" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_article_insight_index_items_order_idx" ON "_articles_v_blocks_article_insight_index_items" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_article_insight_index_items_parent_id_idx" ON "_articles_v_blocks_article_insight_index_items" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_article_insight_index_order_idx" ON "_articles_v_blocks_article_insight_index" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_article_insight_index_parent_id_idx" ON "_articles_v_blocks_article_insight_index" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_article_insight_index_path_idx" ON "_articles_v_blocks_article_insight_index" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_article_comparison_table_rows_order_idx" ON "_articles_v_blocks_article_comparison_table_rows" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_article_comparison_table_rows_parent_id_idx" ON "_articles_v_blocks_article_comparison_table_rows" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_article_comparison_table_order_idx" ON "_articles_v_blocks_article_comparison_table" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_article_comparison_table_parent_id_idx" ON "_articles_v_blocks_article_comparison_table" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_article_comparison_table_path_idx" ON "_articles_v_blocks_article_comparison_table" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_article_callout_order_idx" ON "_articles_v_blocks_article_callout" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_article_callout_parent_id_idx" ON "_articles_v_blocks_article_callout" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_article_callout_path_idx" ON "_articles_v_blocks_article_callout" USING btree ("_path");
  CREATE INDEX "_articles_v_blocks_article_inline_cta_order_idx" ON "_articles_v_blocks_article_inline_cta" USING btree ("_order");
  CREATE INDEX "_articles_v_blocks_article_inline_cta_parent_id_idx" ON "_articles_v_blocks_article_inline_cta" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_blocks_article_inline_cta_path_idx" ON "_articles_v_blocks_article_inline_cta" USING btree ("_path");
  CREATE INDEX "_articles_v_parent_idx" ON "_articles_v" USING btree ("parent_id");
  CREATE INDEX "_articles_v_version_version_slug_idx" ON "_articles_v" USING btree ("version_slug");
  CREATE INDEX "_articles_v_version_version_hero_image_idx" ON "_articles_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_articles_v_version_seo_version_seo_og_image_idx" ON "_articles_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_articles_v_version_version_updated_at_idx" ON "_articles_v" USING btree ("version_updated_at");
  CREATE INDEX "_articles_v_version_version_created_at_idx" ON "_articles_v" USING btree ("version_created_at");
  CREATE INDEX "_articles_v_version_version__status_idx" ON "_articles_v" USING btree ("version__status");
  CREATE INDEX "_articles_v_created_at_idx" ON "_articles_v" USING btree ("created_at");
  CREATE INDEX "_articles_v_updated_at_idx" ON "_articles_v" USING btree ("updated_at");
  CREATE INDEX "_articles_v_latest_idx" ON "_articles_v" USING btree ("latest");
  CREATE INDEX "_articles_v_rels_order_idx" ON "_articles_v_rels" USING btree ("order");
  CREATE INDEX "_articles_v_rels_parent_idx" ON "_articles_v_rels" USING btree ("parent_id");
  CREATE INDEX "_articles_v_rels_path_idx" ON "_articles_v_rels" USING btree ("path");
  CREATE INDEX "_articles_v_rels_articles_id_idx" ON "_articles_v_rels" USING btree ("articles_id");
  CREATE UNIQUE INDEX "legal_pages_slug_idx" ON "legal_pages" USING btree ("slug");
  CREATE INDEX "legal_pages_updated_at_idx" ON "legal_pages" USING btree ("updated_at");
  CREATE INDEX "legal_pages_created_at_idx" ON "legal_pages" USING btree ("created_at");
  CREATE INDEX "legal_pages__status_idx" ON "legal_pages" USING btree ("_status");
  CREATE INDEX "_legal_pages_v_parent_idx" ON "_legal_pages_v" USING btree ("parent_id");
  CREATE INDEX "_legal_pages_v_version_version_slug_idx" ON "_legal_pages_v" USING btree ("version_slug");
  CREATE INDEX "_legal_pages_v_version_version_updated_at_idx" ON "_legal_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_legal_pages_v_version_version_created_at_idx" ON "_legal_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_legal_pages_v_version_version__status_idx" ON "_legal_pages_v" USING btree ("version__status");
  CREATE INDEX "_legal_pages_v_created_at_idx" ON "_legal_pages_v" USING btree ("created_at");
  CREATE INDEX "_legal_pages_v_updated_at_idx" ON "_legal_pages_v" USING btree ("updated_at");
  CREATE INDEX "_legal_pages_v_latest_idx" ON "_legal_pages_v" USING btree ("latest");
  CREATE INDEX "leads_updated_at_idx" ON "leads" USING btree ("updated_at");
  CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_landing_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("landing_pages_id");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_legal_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("legal_pages_id");
  CREATE INDEX "payload_locked_documents_rels_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("leads_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "landing_pages_blocks_hero_trust_items" CASCADE;
  DROP TABLE "landing_pages_blocks_hero" CASCADE;
  DROP TABLE "landing_pages_blocks_text" CASCADE;
  DROP TABLE "landing_pages_blocks_problem_problem_items" CASCADE;
  DROP TABLE "landing_pages_blocks_problem" CASCADE;
  DROP TABLE "landing_pages_blocks_pillars_pillars" CASCADE;
  DROP TABLE "landing_pages_blocks_pillars" CASCADE;
  DROP TABLE "landing_pages_blocks_process_steps" CASCADE;
  DROP TABLE "landing_pages_blocks_process" CASCADE;
  DROP TABLE "landing_pages_blocks_audience_suitable_for" CASCADE;
  DROP TABLE "landing_pages_blocks_audience_not_suitable_for" CASCADE;
  DROP TABLE "landing_pages_blocks_audience" CASCADE;
  DROP TABLE "landing_pages_blocks_experience_image" CASCADE;
  DROP TABLE "landing_pages_blocks_testimonials_testimonials" CASCADE;
  DROP TABLE "landing_pages_blocks_testimonials" CASCADE;
  DROP TABLE "landing_pages_blocks_article_teasers_articles" CASCADE;
  DROP TABLE "landing_pages_blocks_article_teasers" CASCADE;
  DROP TABLE "landing_pages_blocks_faq_faqs" CASCADE;
  DROP TABLE "landing_pages_blocks_faq" CASCADE;
  DROP TABLE "landing_pages_blocks_cta" CASCADE;
  DROP TABLE "landing_pages_blocks_cta_accents_items" CASCADE;
  DROP TABLE "landing_pages_blocks_cta_accents" CASCADE;
  DROP TABLE "landing_pages_blocks_contact_form" CASCADE;
  DROP TABLE "landing_pages" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_hero_trust_items" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_text" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_problem_problem_items" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_problem" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_pillars_pillars" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_pillars" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_process_steps" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_process" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_audience_suitable_for" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_audience_not_suitable_for" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_audience" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_experience_image" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_testimonials_testimonials" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_article_teasers_articles" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_article_teasers" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_faq_faqs" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_cta_accents_items" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_cta_accents" CASCADE;
  DROP TABLE "_landing_pages_v_blocks_contact_form" CASCADE;
  DROP TABLE "_landing_pages_v" CASCADE;
  DROP TABLE "articles_blocks_article_text" CASCADE;
  DROP TABLE "articles_blocks_article_image" CASCADE;
  DROP TABLE "articles_blocks_article_quote" CASCADE;
  DROP TABLE "articles_blocks_article_hand_note" CASCADE;
  DROP TABLE "articles_blocks_article_insight_index_items" CASCADE;
  DROP TABLE "articles_blocks_article_insight_index" CASCADE;
  DROP TABLE "articles_blocks_article_comparison_table_rows" CASCADE;
  DROP TABLE "articles_blocks_article_comparison_table" CASCADE;
  DROP TABLE "articles_blocks_article_callout" CASCADE;
  DROP TABLE "articles_blocks_article_inline_cta" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "articles_rels" CASCADE;
  DROP TABLE "_articles_v_blocks_article_text" CASCADE;
  DROP TABLE "_articles_v_blocks_article_image" CASCADE;
  DROP TABLE "_articles_v_blocks_article_quote" CASCADE;
  DROP TABLE "_articles_v_blocks_article_hand_note" CASCADE;
  DROP TABLE "_articles_v_blocks_article_insight_index_items" CASCADE;
  DROP TABLE "_articles_v_blocks_article_insight_index" CASCADE;
  DROP TABLE "_articles_v_blocks_article_comparison_table_rows" CASCADE;
  DROP TABLE "_articles_v_blocks_article_comparison_table" CASCADE;
  DROP TABLE "_articles_v_blocks_article_callout" CASCADE;
  DROP TABLE "_articles_v_blocks_article_inline_cta" CASCADE;
  DROP TABLE "_articles_v" CASCADE;
  DROP TABLE "_articles_v_rels" CASCADE;
  DROP TABLE "legal_pages" CASCADE;
  DROP TABLE "_legal_pages_v" CASCADE;
  DROP TABLE "leads" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_landing_pages_blocks_text_layout";
  DROP TYPE "public"."enum_landing_pages_status";
  DROP TYPE "public"."enum_landing_pages_page_theme";
  DROP TYPE "public"."enum__landing_pages_v_blocks_text_layout";
  DROP TYPE "public"."enum__landing_pages_v_version_status";
  DROP TYPE "public"."enum__landing_pages_v_version_page_theme";
  DROP TYPE "public"."enum_articles_blocks_article_image_layout";
  DROP TYPE "public"."enum_articles_blocks_article_quote_variant";
  DROP TYPE "public"."enum_articles_status";
  DROP TYPE "public"."enum__articles_v_blocks_article_image_layout";
  DROP TYPE "public"."enum__articles_v_blocks_article_quote_variant";
  DROP TYPE "public"."enum__articles_v_version_status";
  DROP TYPE "public"."enum_legal_pages_legal_type";
  DROP TYPE "public"."enum_legal_pages_status";
  DROP TYPE "public"."enum__legal_pages_v_version_legal_type";
  DROP TYPE "public"."enum__legal_pages_v_version_status";
  DROP TYPE "public"."enum_leads_ai_experience";
  DROP TYPE "public"."enum_leads_preferred_contact";
  DROP TYPE "public"."enum_leads_status";`)
}
