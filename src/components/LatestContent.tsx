import type { MouseEvent as ReactMouseEvent, SyntheticEvent } from "react";
import { ArrowRight, PlayIcon } from "./Icons";
import { useYouTubeFeeds, videoUrl, youTubeThumb, type YtVideo } from "../lib/youtube";

// Used only if the live feeds can't be reached, so the section is never empty.
const fallbackVideos: YtVideo[] = [
  { id: "a283rFCMW8g", title: "La La Land – Mia and Sebastian's Theme | Piano Cover", channel: "Piano", published: "", thumbnail: youTubeThumb("a283rFCMW8g"), url: videoUrl("a283rFCMW8g") },
  { id: "dOH99QIFIqk", title: "Evgeny Grinko - Valse ( FREE SHEET )", channel: "Piano", published: "", thumbnail: youTubeThumb("dOH99QIFIqk"), url: videoUrl("dOH99QIFIqk") },
  { id: "Ff8rz9TRth0", title: "Amelié  - Comptine d'un Autre été: L'Après-Midi (FREE SHEET)", channel: "Piano", published: "", thumbnail: youTubeThumb("Ff8rz9TRth0"), url: videoUrl("Ff8rz9TRth0") },
  { id: "31RwpCJDOTI", title: "Chopin - Waltz in A Minor (w/FREE SHEET)", channel: "Piano", published: "", thumbnail: youTubeThumb("31RwpCJDOTI"), url: videoUrl("31RwpCJDOTI") },
  { id: "SeP5Wx-viW0", title: "Eric Satie - Gnossienne No. 1 ( w/FREE SHEET )", channel: "Piano", published: "", thumbnail: youTubeThumb("SeP5Wx-viW0"), url: videoUrl("SeP5Wx-viW0") },
];

export const handleThumbError = (event: SyntheticEvent<HTMLImageElement>) => {
  const img = event.currentTarget;
  if (img.dataset.fallback) return;
  img.dataset.fallback = "1";
  img.src = img.src.replace("/maxresdefault.jpg", "/hqdefault.jpg");
};

type LatestContentProps = {
  onPlay: (video: YtVideo) => void;
  onViewAll: () => void;
};

export default function LatestContent({ onPlay, onViewAll }: LatestContentProps) {
  const { videos, loading, error } = useYouTubeFeeds();

  const handleViewAll = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onViewAll();
  };

  const items = (videos.length > 0 ? videos : error ? fallbackVideos : []).slice(0, 5);

  return (
    <section className="latest-section section-frame" id="music">
      <div className="section-heading">
        <div className="section-heading__left">
          <h2>Latest content</h2>
          <span aria-hidden="true" />
        </div>
        <a className="view-all-link" href="#follow" onClick={handleViewAll}>
          Vedi tutto
          <ArrowRight className="view-all-icon" />
        </a>
      </div>

      <div className="content-grid">
        {loading && items.length === 0
          ? Array.from({ length: 5 }).map((_, index) => (
              <div className="content-card content-card--skeleton" key={`skeleton-${index}`} aria-hidden="true">
                <div className="content-thumb" />
                <div className="content-card__body">
                  <span className="skeleton-line skeleton-line--sm" />
                  <span className="skeleton-line" />
                </div>
              </div>
            ))
          : items.map((item) => (
              <a
                className="content-card"
                href={item.url}
                key={item.id}
                onClick={(event) => {
                  event.preventDefault();
                  onPlay(item);
                }}
              >
                <div className="content-thumb">
                  <img
                    className="content-thumb__img"
                    src={item.thumbnail}
                    alt={item.title}
                    loading="lazy"
                    onError={handleThumbError}
                  />
                  <span className="content-badge" aria-label="Video">
                    <PlayIcon />
                  </span>
                </div>
                <div className="content-card__body">
                  <p>{item.channel} Cover</p>
                  <h3>{item.title}</h3>
                  <span>YouTube</span>
                </div>
              </a>
            ))}
      </div>
    </section>
  );
}
