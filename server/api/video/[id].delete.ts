import { defineEventHandler } from "#imports";
import { eq } from "drizzle-orm";
import { db } from "~/utils/db";
import { videos } from "~/utils/db/schema";

export default defineEventHandler(async (event) => {
  console.log(event.context.params!);
  const id = parseInt(event.context.params!.id);

  return await db.delete(videos).where(eq(videos.id, id));
});
