import { defineEventHandler, readBody } from "#imports";
import { db } from "~/utils/db";
import { videos } from "~/utils/db/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  await db.insert(videos).values(body);
});
