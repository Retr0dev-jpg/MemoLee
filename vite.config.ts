import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Same-origin proxy paths that mirror the Vercel rewrites in vercel.json.
// YouTube's RSS endpoint has no CORS headers, so the browser can't fetch it
// directly; proxying it server-side (Vite in dev, Vercel in prod) fixes that.
const YT_HOST = "https://www.youtube.com";
const YT_FEED_PATH = "/feeds/videos.xml";
const CHANNELS: Record<string, string> = {
  "/yt/piano": "UCmncKPi1va_EZjZn7jxTkww",
  "/yt/guitar": "UC9B1dEDMtChG83NeaT2wm9Q",
};

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: Object.fromEntries(
      Object.entries(CHANNELS).map(([path, channelId]) => [
        path,
        {
          target: YT_HOST,
          changeOrigin: true,
          rewrite: () => `${YT_FEED_PATH}?channel_id=${channelId}`,
        },
      ]),
    ),
  },
});
