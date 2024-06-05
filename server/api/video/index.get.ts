import { defineEventHandler } from "#imports";
import { db } from "~/utils/db";
import { videos } from "~/utils/db/schema";

export default defineEventHandler(() => {
  return db.select().from(videos).orderBy(videos.order).all();
});
