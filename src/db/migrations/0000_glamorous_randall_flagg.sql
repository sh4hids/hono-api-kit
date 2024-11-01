CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`is_completed` integer DEFAULT false NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
