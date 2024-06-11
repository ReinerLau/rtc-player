import { defineEventHandler, getQuery } from "#imports";
import { eq } from "drizzle-orm";
import { db } from "~/utils/db";
import { videos } from "~/utils/db/schema";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  return db
    .select()
    .from(videos)
    .where(eq(videos.groupId, parseInt(query.groupId as string)))
    .orderBy(videos.order)
    .all();
});
