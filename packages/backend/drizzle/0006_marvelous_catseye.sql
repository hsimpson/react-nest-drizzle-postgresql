ALTER TABLE "refresh" RENAME COLUMN "hashedRefreshToken" TO "hashed_refresh_token";--> statement-breakpoint
ALTER TABLE "refresh" RENAME COLUMN "accountId" TO "account_id";--> statement-breakpoint
ALTER TABLE "refresh" DROP CONSTRAINT "refresh_hashedRefreshToken_unique";--> statement-breakpoint
ALTER TABLE "refresh" DROP CONSTRAINT "refresh_accountId_account_id_fk";
--> statement-breakpoint
ALTER TABLE "refresh" ADD CONSTRAINT "refresh_account_id_account_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refresh" ADD CONSTRAINT "refresh_hashedRefreshToken_unique" UNIQUE("hashed_refresh_token");