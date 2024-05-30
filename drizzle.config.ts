import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./utils/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: "./sqlite.db",
  },
});
