import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CloseIcon, PlayIcon, SearchIcon } from "./Icons";
import { useYouTubeFeeds, type Channel, type YtVideo } from "../lib/youtube";
import { handleThumbError } from "./LatestContent";

type GalleryProps = {
  open: boolean;
  onClose: () => void;
  initialVideo: YtVideo | null;
};

type Filter = "Tutti" | Channel;

const FILTERS: Filter[] = ["Tutti", "Piano", "Guitar"];

const embedUrl = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;

export default function Gallery({ open, onClose, initialVideo }: GalleryProps) {
  const { videos, loading, error } = useYouTubeFeeds();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("Tutti");
  const [activeVideo, setActiveVideo] = useState<YtVideo | null>(null);

  useEffect(() => {
    if (open) setActiveVideo(initialVideo ?? null);
  }, [open, initialVideo]);

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
      aria-label="Gallery contenuti"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={activeVideo ? "gallery-panel gallery-panel--player" : "gallery-panel"}>
        <header className="gallery-head">
          <div>
            <p className="gallery-kicker">Gallery</p>
            <h2 className="gallery-title">{activeVideo ? "Riproduzione" : "Tutti i contenuti"}</h2>
          </div>
          <button className="gallery-close" type="button" aria-label="Chiudi gallery" onClick={onClose}>
            <CloseIcon className="gallery-close-icon" />
          </button>
        </header>

        {activeVideo ? (
          <div className="gallery-body">
            <div className="gallery-player">
              <button className="gallery-back" type="button" onClick={() => setActiveVideo(null)}>
                <ArrowRight className="gallery-back-icon" />
                Torna ai contenuti
              </button>

              <div className="gallery-player__frame">
                <iframe
                  key={activeVideo.id}
                  src={embedUrl(activeVideo.id)}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="gallery-player__meta">
                <p className="gallery-player__badge">{activeVideo.channel} Cover</p>
                <h3>{activeVideo.title}</h3>
                <a
                  className="gallery-player__yt"
                  href={activeVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Guarda su YouTube
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
                  placeholder="Cerca un brano..."
                  aria-label="Cerca tra i contenuti"
                />
              </label>
              <div className="gallery-filters" role="tablist" aria-label="Filtra per canale">
                {FILTERS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    role="tab"
                    aria-selected={filter === option}
                    className={filter === option ? "gallery-filter gallery-filter--active" : "gallery-filter"}
                    onClick={() => setFilter(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="gallery-body">
              {loading ? (
                <p className="gallery-state">Caricamento contenuti…</p>
              ) : error ? (
                <p className="gallery-state">
                  Impossibile caricare i contenuti in questo momento. Riprova più tardi.
                </p>
              ) : filtered.length === 0 ? (
                <p className="gallery-state">Nessun risultato per la ricerca.</p>
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
                          alt={video.title}
                          loading="lazy"
                          onError={handleThumbError}
                        />
                        <span className="content-badge" aria-label="Video">
                          <PlayIcon />
                        </span>
                        <span className={`gallery-tag gallery-tag--${video.channel.toLowerCase()}`}>
                          {video.channel}
                        </span>
                      </div>
                      <div className="content-card__body">
                        <h3>{video.title}</h3>
                        <span>{video.channel} Cover</span>
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
