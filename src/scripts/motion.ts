// Scroll behaviour shared by every view:
// - [data-reveal] blocks fade in when they enter the screen
// - [data-parallax] photos move clearly slower than the page
// - the header gets a background after the first scroll
// Astro's ClientRouter swaps the page without a reload, so everything is set up again after each swap.

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let observer: IntersectionObserver | undefined;
let parallaxItems: HTMLElement[] = [];
let ticking = false;

function markVisibleNow() {
  // Runs before the new page is captured by the view transition.
  // Blocks already on screen (for example after "back") must not start hidden.
  const limit = window.innerHeight;
  document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < limit && rect.bottom > 0) el.classList.add("is-in");
  });
}

function setupReveal() {
  observer?.disconnect();
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
  );
  document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => observer?.observe(el));
}

function updateScroll() {
  ticking = false;
  const header = document.querySelector<HTMLElement>("[data-header]");
  header?.toggleAttribute("data-scrolled", window.scrollY > 24);

  if (reducedMotion.matches) return;
  const center = window.innerHeight / 2;
  for (const el of parallaxItems) {
    const rect = el.getBoundingClientRect();
    if (rect.bottom < -200 || rect.top > window.innerHeight + 200) continue;
    const offset = (rect.top + rect.height / 2 - center) * -0.22;
    el.style.translate = `0 ${offset.toFixed(1)}px`;
  }
}

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(updateScroll);
}

function setup() {
  parallaxItems = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
  setupReveal();
  updateScroll();
}

document.addEventListener("astro:after-swap", () => {
  markVisibleNow();
  parallaxItems = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
  updateScroll();
});
document.addEventListener("astro:page-load", setup);
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll, { passive: true });
