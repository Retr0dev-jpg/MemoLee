import { useEffect, useState } from "react";

export type Channel = "Piano" | "Guitar";

export type GalleryFilter = "Tutti" | Channel;

export type YtVideo = {
  id: string;
  title: string;
  channel: Channel;
  published: string;
  thumbnail: string;
  url: string;
};

type FeedConfig = {
  channel: Channel;
  /** Same-origin path proxied server-side (Vite in dev, Vercel rewrite in prod). */
  path: string;
  /** Original YouTube URL, used only for the public-proxy fallback. */
  url: string;
};

const FEEDS: FeedConfig[] = [
  {
    channel: "Piano",
    path: "/yt/piano",
    url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCmncKPi1va_EZjZn7jxTkww",
  },
  {
    channel: "Guitar",
    path: "/yt/guitar",
    url: "https://www.youtube.com/feeds/videos.xml?channel_id=UC9B1dEDMtChG83NeaT2wm9Q",
  },
];

// YouTube's RSS endpoint has no CORS headers, so a direct browser fetch is
// blocked. We primarily proxy it server-side via a same-origin path (no CORS,
// no third-party dependency). Public CORS proxies stay only as a last resort
// in case the site is served without the rewrite/proxy configured.
const PROXIES: ((url: string) => string)[] = [
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url) => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
  (url) => `https://thingproxy.freeboard.io/fetch/${url}`,
];

export const youTubeThumb = (videoId: string, quality: "maxresdefault" | "hqdefault" = "maxresdefault") =>
  `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;

export const videoUrl = (videoId: string) => `https://www.youtube.com/watch?v=${videoId}`;

const isFeedXml = (text: string) => text.includes("<feed") || text.includes("<entry");

async function fetchText(feed: FeedConfig): Promise<string> {
  let lastError: unknown;

  // 1) Same-origin proxy (preferred): reliable, no CORS, cached at the edge.
  try {
    const response = await fetch(feed.path);
    if (response.ok) {
      const text = await response.text();
      if (isFeedXml(text)) return text;
    }
  } catch (error) {
    lastError = error;
  }

  // 2) Public CORS proxies (fallback only).
  for (const proxy of PROXIES) {
    try {
      const response = await fetch(proxy(feed.url));
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const text = await response.text();
      if (isFeedXml(text)) return text;
      throw new Error("Unexpected response");
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error("Feed non raggiungibile");
}

function parseFeed(xml: string, channel: Channel): YtVideo[] {
  const doc = new DOMParser().parseFromString(xml, "text/xml");
  const entries = Array.from(doc.getElementsByTagName("entry"));

  return entries
    .map((entry): YtVideo | null => {
      const idNode =
        entry.getElementsByTagName("yt:videoId")[0]?.textContent ??
        entry.getElementsByTagName("id")[0]?.textContent?.replace("yt:video:", "") ??
        "";
      const id = idNode.trim();
      if (!id) return null;

      const title = entry.getElementsByTagName("title")[0]?.textContent ?? "Senza titolo";
      const published = entry.getElementsByTagName("published")[0]?.textContent ?? "";

      return {
        id,
        title,
        channel,
        published,
        thumbnail: youTubeThumb(id),
        url: videoUrl(id),
      };
    })
    .filter((video): video is YtVideo => video !== null);
}

async function fetchAllFeeds(): Promise<YtVideo[]> {
  const results = await Promise.all(
    FEEDS.map(async (feed) => {
      try {
        const xml = await fetchText(feed);
        return parseFeed(xml, feed.channel);
      } catch {
        return [] as YtVideo[];
      }
    }),
  );

  const merged = results.flat();
  if (merged.length === 0) {
    throw new Error("Nessun feed disponibile");
  }

  return merged.sort(
    (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime(),
  );
}

let cache: Promise<YtVideo[]> | null = null;

export function loadYouTubeVideos(): Promise<YtVideo[]> {
  if (!cache) {
    cache = fetchAllFeeds().catch((error) => {
      cache = null; // allow retry on next mount if it failed
      throw error;
    });
  }
  return cache;
}

export type FeedState = {
  videos: YtVideo[];
  loading: boolean;
  error: boolean;
};

export function useYouTubeFeeds(): FeedState {
  const [state, setState] = useState<FeedState>({ videos: [], loading: true, error: false });

  useEffect(() => {
    let active = true;
    loadYouTubeVideos()
      .then((videos) => {
        if (active) setState({ videos, loading: false, error: false });
      })
      .catch(() => {
        if (active) setState({ videos: [], loading: false, error: true });
      });
    return () => {
      active = false;
    };
  }, []);

  return state;
}
