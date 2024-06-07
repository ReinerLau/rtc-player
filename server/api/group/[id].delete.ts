import { defineEventHandler } from "#imports";
import { eq } from "drizzle-orm";
import { db } from "~/utils/db";
import { groups, videos } from "~/utils/db/schema";

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params!.id);

  await db.delete(videos).where(eq(videos.groupId, id));

  await db.delete(groups).where(eq(groups.id, id));
});
