import { ArrowRight, GuitarIcon, LightningIcon, PianoIcon, VideoIcon } from "./Icons";
import { focusSocials } from "../lib/focusSocials";

const skillItems = [
  { label: "Guitar", Icon: GuitarIcon },
  { label: "Piano", Icon: PianoIcon },
  { label: "Tips & Tricks", Icon: LightningIcon },
  { label: "Video & Cover", Icon: VideoIcon },
];

export default function About() {
  const goToSocials = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    focusSocials();
  };

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
          <a className="outline-button outline-button--compact" href="#follow" onClick={goToSocials}>
            Leggi di più
            <ArrowRight className="button-arrow" />
          </a>
        </div>

        <div className="skills-list" aria-label="Categorie contenuti">
          {skillItems.map(({ label, Icon }) => (
            <a className="skill-item" href="#follow" key={label} onClick={goToSocials}>
              <Icon className="skill-icon" />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
