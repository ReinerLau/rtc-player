import { defineEventHandler } from "#imports";
import { eq } from "drizzle-orm";
import { db } from "~/utils/db";
import { videos } from "~/utils/db/schema";

export default defineEventHandler((event) => {
  const id = parseInt(event.context.params!.id);

  return db.delete(videos).where(eq(videos.id, id));
});
