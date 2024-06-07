import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const videos = sqliteTable("videos", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  order: integer("order", { mode: "number" }).notNull(),
});

export const groups = sqliteTable("groups", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
});
