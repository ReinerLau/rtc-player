import { defineConfig } from "vitest/config";
import path from "path";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./"),
    },
  },
  plugins: [vue()],
});
