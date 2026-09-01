document.documentElement.classList.add("js");

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const menuButton = document.querySelector("[data-menu-toggle]");
const menuList = document.querySelector("[data-nav-list]");

if (menuButton && menuList) {
  const setMenuState = (open) => {
    menuButton.setAttribute("aria-expanded", String(open));
    menuList.dataset.open = String(open);
  };

  setMenuState(false);

  menuButton.addEventListener("click", () => {
    setMenuState(menuButton.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      setMenuState(false);
      menuButton.focus();
    }
  });

  menuList.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMenuState(false);
    }
  });
}
