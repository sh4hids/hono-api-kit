ALTER TABLE `tasks` ADD `done` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `tasks` DROP COLUMN `is_completed`;