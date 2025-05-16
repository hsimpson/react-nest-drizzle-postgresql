ALTER TABLE "refresh" RENAME COLUMN "refreshToken" TO "hashedRefreshToken";--> statement-breakpoint
ALTER TABLE "refresh" DROP CONSTRAINT "refresh_refreshToken_unique";--> statement-breakpoint
ALTER TABLE "refresh" ADD CONSTRAINT "refresh_hashedRefreshToken_unique" UNIQUE("hashedRefreshToken");