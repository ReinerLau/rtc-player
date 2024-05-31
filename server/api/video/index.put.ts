import { defineEventHandler, readBody } from "#imports";
import { eq } from "drizzle-orm";
import { db } from "~/utils/db";
import { videos } from "~/utils/db/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  await db.update(videos).set(body).where(eq(videos.id, body.id));
});
