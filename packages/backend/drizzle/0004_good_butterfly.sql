CREATE TABLE "refresh" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"refreshToken" varchar NOT NULL,
	"accountId" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "refresh_refreshToken_unique" UNIQUE("refreshToken")
);
--> statement-breakpoint
ALTER TABLE "refresh" ADD CONSTRAINT "refresh_accountId_account_id_fk" FOREIGN KEY ("accountId") REFERENCES "public"."account"("id") ON DELETE no action ON UPDATE no action;