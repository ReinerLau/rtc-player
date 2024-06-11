import { defineEventHandler, readBody } from "#imports";
import { and, eq, inArray, sql, SQL } from "drizzle-orm";
import { db } from "~/utils/db";
import { videos } from "~/utils/db/schema";

export default defineEventHandler(async (event) => {
  const { oldIndex, newIndex, groupId } = await readBody(event);

  const tempOrder = newIndex > oldIndex ? newIndex + 0.5 : newIndex - 0.5;

  await db
    .update(videos)
    .set({ order: tempOrder })
    .where(and(eq(videos.order, oldIndex), eq(videos.groupId, groupId)));

  const videoList = await db
    .select()
    .from(videos)
    .where(eq(videos.groupId, groupId))
    .orderBy(videos.order);

  const sqlChunks: SQL[] = [];
  const ids = videoList.map((video) => video.id!);

  sqlChunks.push(sql`(case`);

  let i = 0;
  for (const video of videoList) {
    sqlChunks.push(sql`when ${videos.id} = ${video.id} then ${i}`);
    i++;
  }

  sqlChunks.push(sql`end)`);

  const finalSql = sql.join(sqlChunks, sql.raw(" "));

  await db
    .update(videos)
    .set({ order: finalSql })
    .where(inArray(videos.id, ids));
});
