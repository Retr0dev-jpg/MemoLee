import { GuitarIcon, LightningIcon, PianoIcon, VideoIcon } from "./Icons";
import type { GalleryFilter } from "../lib/youtube";
import { useI18n } from "../i18n";

type AboutProps = {
  onOpenGallery: (filter?: GalleryFilter) => void;
};

type SkillKey = "guitar" | "piano" | "tips" | "videos";

const skillItems: { key: SkillKey; Icon: typeof GuitarIcon; filter: GalleryFilter }[] = [
  { key: "guitar", Icon: GuitarIcon, filter: "Guitar" },
  { key: "piano", Icon: PianoIcon, filter: "Piano" },
  { key: "tips", Icon: LightningIcon, filter: "Tutti" },
  { key: "videos", Icon: VideoIcon, filter: "Tutti" },
];

export default function About({ onOpenGallery }: AboutProps) {
  const { t } = useI18n();

  return (
    <section className="about-section" id="about">
      <div className="about-card">
        <div className="about-photo" aria-label={t.about.portrait} />

        <div className="about-copy">
          <h2 className="section-title">{t.about.title}</h2>
          <p>{t.about.bio}</p>
        </div>

        <div className="skills-list" aria-label={t.about.categories}>
          {skillItems.map(({ key, Icon, filter }) => (
            <a
              className="skill-item"
              href="#gallery"
              key={key}
              onClick={(event) => {
                event.preventDefault();
                onOpenGallery(filter);
              }}
            >
              <Icon className="skill-icon" />
              <span>{t.about.skills[key]}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
