import { useState } from "react";
import About from "./components/About";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LatestContent from "./components/LatestContent";
import type { GalleryFilter, YtVideo } from "./lib/youtube";

export default function App() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [initialVideo, setInitialVideo] = useState<YtVideo | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<GalleryFilter>("Tutti");

  const openGallery = (filter: GalleryFilter = "Tutti") => {
    setInitialVideo(null);
    setGalleryFilter(filter);
    setGalleryOpen(true);
  };

  const playVideo = (video: YtVideo) => {
    setInitialVideo(video);
    setGalleryOpen(true);
  };

  return (
    <div className="site-shell">
      <Header onOpenGallery={() => openGallery()} />
      <main>
        <Hero />
        <About onOpenGallery={openGallery} />
        <LatestContent onPlay={playVideo} onViewAll={() => openGallery()} />
      </main>
      <Footer />
      <Gallery
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        initialVideo={initialVideo}
        initialFilter={galleryFilter}
      />
    </div>
  );
}
