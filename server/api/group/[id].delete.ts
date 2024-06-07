import { defineEventHandler } from "#imports";
import { eq } from "drizzle-orm";
import { db } from "~/utils/db";
import { groups } from "~/utils/db/schema";

export default defineEventHandler((event) => {
  const id = parseInt(event.context.params!.id);

  return db.delete(groups).where(eq(groups.id, id));
});
