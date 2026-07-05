import { GuitarIcon, LightningIcon, PianoIcon, VideoIcon } from "./Icons";
import type { GalleryFilter } from "../lib/youtube";

type AboutProps = {
  onOpenGallery: (filter?: GalleryFilter) => void;
};

const skillItems: { label: string; Icon: typeof GuitarIcon; filter: GalleryFilter }[] = [
  { label: "Guitar", Icon: GuitarIcon, filter: "Guitar" },
  { label: "Piano", Icon: PianoIcon, filter: "Piano" },
  { label: "Tips & Tricks", Icon: LightningIcon, filter: "Tutti" },
  { label: "Video & Cover", Icon: VideoIcon, filter: "Tutti" },
];

export default function About({ onOpenGallery }: AboutProps) {
  return (
    <section className="about-section" id="about">
      <div className="about-card">
        <div className="about-photo" aria-label="Ritratto in bianco e nero" />

        <div className="about-copy">
          <h2 className="section-title">Chi sono</h2>
          <p>
            Ciao! Sono un musicista e content creator. Suono chitarra classica,
            elettrica e pianoforte e condivido cover, consigli e contenuti per
            altri appassionati di musica.
          </p>
        </div>

        <div className="skills-list" aria-label="Categorie contenuti">
          {skillItems.map(({ label, Icon, filter }) => (
            <a
              className="skill-item"
              href="#gallery"
              key={label}
              onClick={(event) => {
                event.preventDefault();
                onOpenGallery(filter);
              }}
            >
              <Icon className="skill-icon" />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
