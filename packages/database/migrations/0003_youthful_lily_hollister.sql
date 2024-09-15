CREATE TABLE IF NOT EXISTS "todos" (
	"id" integer PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"false" boolean
);
--> statement-breakpoint
DROP TABLE "todo_table";