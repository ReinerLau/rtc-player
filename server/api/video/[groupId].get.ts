import { defineEventHandler } from "#imports";
import { eq } from "drizzle-orm";
import { db } from "~/utils/db";
import { videos } from "~/utils/db/schema";

export default defineEventHandler((event) => {
  const groupId = parseInt(event.context.params!.groupId);

  return db.select().from(videos).where(eq(videos.groupId, groupId));
});
