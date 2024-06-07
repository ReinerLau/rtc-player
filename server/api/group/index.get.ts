import { defineEventHandler } from "#imports";
import { db } from "~/utils/db";
import { groups } from "~/utils/db/schema";

export default defineEventHandler(() => {
  return db.select().from(groups).all();
});
