import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./"),
    },
  },
  plugins: [vue()],
  test: {
    environment: "happy-dom",
  },
});
