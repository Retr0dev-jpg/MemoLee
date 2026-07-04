/**
 * Scrolls to the "Follow me" social block and replays the flash animation on
 * the social cards to draw the user's attention. Shared by every CTA that
 * should point people to the social icons ("Vedi tutto", "Scopri di più", ...).
 */
export function focusSocials(): void {
  const grid = document.querySelector<HTMLElement>(".social-grid");
  const target = document.getElementById("follow") ?? grid;
  target?.scrollIntoView({ behavior: "smooth", block: "center" });
  if (!grid) return;

  grid.classList.remove("social-grid--flash");
  void grid.offsetWidth; // force reflow so the animation restarts every time
  grid.classList.add("social-grid--flash");
  window.setTimeout(() => grid.classList.remove("social-grid--flash"), 1600);
}
