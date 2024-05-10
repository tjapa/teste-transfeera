ALTER TABLE "receivers" ADD COLUMN "created_at" timestamp(6) DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "receivers" ADD COLUMN "modified_at" timestamp(6) DEFAULT now() NOT NULL;