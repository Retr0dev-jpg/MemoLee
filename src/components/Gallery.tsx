import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CloseIcon, PlayIcon, SearchIcon } from "./Icons";
import { useYouTubeFeeds, type GalleryFilter, type YtVideo } from "../lib/youtube";
import { handleThumbError } from "./LatestContent";
import { useI18n } from "../i18n";

type GalleryProps = {
  open: boolean;
  onClose: () => void;
  initialVideo: YtVideo | null;
  initialFilter: GalleryFilter;
};

const FILTERS: GalleryFilter[] = ["Tutti", "Piano", "Guitar"];

const embedUrl = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;

export default function Gallery({ open, onClose, initialVideo, initialFilter }: GalleryProps) {
  const { videos, loading, error } = useYouTubeFeeds();
  const { t } = useI18n();
  const filterLabel = (option: GalleryFilter) =>
    option === "Tutti" ? t.gallery.filterAll : t.instruments[option];
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<GalleryFilter>("Tutti");
  const [activeVideo, setActiveVideo] = useState<YtVideo | null>(null);

  useEffect(() => {
    if (open) {
      setActiveVideo(initialVideo ?? null);
      setFilter(initialFilter);
    }
  }, [open, initialVideo, initialFilter]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (activeVideo) setActiveVideo(null);
      else onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, activeVideo, onClose]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return videos.filter(
      (video) =>
        (filter === "Tutti" || video.channel === filter) &&
        (q === "" || video.title.toLowerCase().includes(q)),
    );
  }, [videos, query, filter]);

  if (!open) return null;

  return (
    <div
      className="gallery-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={t.gallery.dialog}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={activeVideo ? "gallery-panel gallery-panel--player" : "gallery-panel"}>
        <header className="gallery-head">
          <div>
            <p className="gallery-kicker">{t.gallery.kicker}</p>
            <h2 className="gallery-title">{activeVideo ? t.gallery.playing : t.gallery.all}</h2>
          </div>
          <button className="gallery-close" type="button" aria-label={t.gallery.close} onClick={onClose}>
            <CloseIcon className="gallery-close-icon" />
          </button>
        </header>

        {activeVideo ? (
          <div className="gallery-body">
            <div className="gallery-player">
              <button className="gallery-back" type="button" onClick={() => setActiveVideo(null)}>
                <ArrowRight className="gallery-back-icon" />
                {t.gallery.back}
              </button>

              <div className="gallery-player__frame">
                <iframe
                  key={activeVideo.id}
                  src={embedUrl(activeVideo.id)}
                  title={activeVideo.title || t.common.untitled}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="gallery-player__meta">
                <p className="gallery-player__badge">{t.gallery.cover(t.instruments[activeVideo.channel])}</p>
                <h3>{activeVideo.title || t.common.untitled}</h3>
                <a
                  className="gallery-player__yt"
                  href={activeVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.gallery.watchOnYouTube}
                </a>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="gallery-controls">
              <label className="gallery-search">
                <SearchIcon className="gallery-search-icon" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t.gallery.searchPlaceholder}
                  aria-label={t.gallery.searchLabel}
                />
              </label>
              <div className="gallery-filters" role="tablist" aria-label={t.gallery.filterLabel}>
                {FILTERS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    role="tab"
                    aria-selected={filter === option}
                    className={filter === option ? "gallery-filter gallery-filter--active" : "gallery-filter"}
                    onClick={() => setFilter(option)}
                  >
                    {filterLabel(option)}
                  </button>
                ))}
              </div>
            </div>

            <div className="gallery-body">
              {loading ? (
                <p className="gallery-state">{t.gallery.loading}</p>
              ) : error ? (
                <p className="gallery-state">{t.gallery.error}</p>
              ) : filtered.length === 0 ? (
                <p className="gallery-state">{t.gallery.empty}</p>
              ) : (
                <div className="gallery-grid">
                  {filtered.map((video) => (
                    <a
                      className="gallery-card"
                      href={video.url}
                      key={video.id}
                      onClick={(event) => {
                        event.preventDefault();
                        setActiveVideo(video);
                      }}
                    >
                      <div className="content-thumb">
                        <img
                          className="content-thumb__img"
                          src={video.thumbnail}
                          alt={video.title || t.common.untitled}
                          loading="lazy"
                          onError={handleThumbError}
                        />
                        <span className="content-badge" aria-label={t.gallery.videoBadge}>
                          <PlayIcon />
                        </span>
                        <span className={`gallery-tag gallery-tag--${video.channel.toLowerCase()}`}>
                          {t.instruments[video.channel]}
                        </span>
                      </div>
                      <div className="content-card__body">
                        <h3>{video.title || t.common.untitled}</h3>
                        <span>{t.gallery.cover(t.instruments[video.channel])}</span>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
