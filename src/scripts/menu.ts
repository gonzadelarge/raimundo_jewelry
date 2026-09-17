// Mobile menu overlay (native <dialog>: focus trap and Esc for free)
// and the "Back" link on piece pages.

function closeMenu(menu: HTMLDialogElement) {
  if (!menu.open) return;
  menu.classList.add("is-closing");
  menu.addEventListener(
    "animationend",
    () => {
      menu.classList.remove("is-closing");
      menu.close();
    },
    { once: true },
  );
}

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const menu = document.querySelector<HTMLDialogElement>("[data-menu]");

  if (event.target.closest("[data-menu-open]") && menu) {
    menu.showModal();
    return;
  }

  if (event.target.closest("[data-menu-close]") && menu) {
    closeMenu(menu);
    return;
  }

  // A link inside the menu: the router takes over; the overlay fades with the old page.
  if (event.target.closest("[data-menu-link]") && menu) {
    menu.classList.add("is-closing");
  }
});

document.addEventListener("keydown", (event) => {
  const menu = document.querySelector<HTMLDialogElement>("[data-menu]");
  if (event.key === "Escape" && menu?.open) {
    event.preventDefault();
    closeMenu(menu);
  }
});

// Close the menu if the viewport grows past the mobile breakpoint.
window.matchMedia("(min-width: 761px)").addEventListener("change", (query) => {
  const menu = document.querySelector<HTMLDialogElement>("[data-menu]");
  if (query.matches && menu?.open) menu.close();
});

// "Back" on a piece page: if the reader came from the gallery, go back in history,
// so the router restores the scroll position and the photo returns to its place.
// Otherwise the link works as normal and opens the gallery at the piece anchor.
let previousPath = "";
let currentPath = location.pathname;

document.addEventListener("astro:page-load", () => {
  if (location.pathname === currentPath) return;
  previousPath = currentPath;
  currentPath = location.pathname;
});

// Capture phase: runs before the router's own click handler.
document.addEventListener(
  "click",
  (event) => {
    if (!(event.target instanceof Element)) return;
    const back = event.target.closest<HTMLAnchorElement>("[data-back]");
    if (!back || previousPath !== back.dataset.back) return;
    event.preventDefault();
    history.back();
  },
  true,
);
