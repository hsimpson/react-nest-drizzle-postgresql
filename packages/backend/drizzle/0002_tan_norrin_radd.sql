ALTER TABLE "account" ALTER COLUMN "public_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_public_id_unique" UNIQUE("public_id");