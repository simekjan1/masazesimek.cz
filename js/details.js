const detailGroups = document.querySelectorAll("[data-details-group]");

detailGroups.forEach((group) => {
  const details = Array.from(group.querySelectorAll("details"));
  const expandButton = group.parentElement?.querySelector("[data-expand-all]");
  const collapseButton = group.parentElement?.querySelector("[data-collapse-all]");

  expandButton?.addEventListener("click", () => {
    details.forEach((item) => {
      item.open = true;
    });
  });

  collapseButton?.addEventListener("click", () => {
    details.forEach((item) => {
      item.open = false;
    });
  });
});

const openHashTarget = () => {
  if (!window.location.hash) return;

  let id;
  try {
    id = decodeURIComponent(window.location.hash.slice(1));
  } catch {
    return;
  }

  const target = document.getElementById(id);
  if (!target) return;

  const details = target.matches("details") ? target : target.closest("details");
  if (details) details.open = true;

  window.requestAnimationFrame(() => {
    const focusTarget = details?.querySelector("summary") || target;
    focusTarget.scrollIntoView({ block: "start" });
    if (focusTarget instanceof HTMLElement) focusTarget.focus({ preventScroll: true });
  });
};

window.addEventListener("hashchange", openHashTarget);
openHashTarget();
