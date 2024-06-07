import { defineEventHandler, readBody } from "#imports";
import { eq } from "drizzle-orm";
import { db } from "~/utils/db";
import { groups } from "~/utils/db/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  await db.update(groups).set(body).where(eq(groups.id, body.id));
});
