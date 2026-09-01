(() => {
  const storageKey = "masazeAnalyticsConsent";
  const banner = document.getElementById("cookie-banner");
  const acceptButton = document.querySelector("[data-consent-accept]");
  const rejectButton = document.querySelector("[data-consent-reject]");

  const publishChoice = (granted) => {
    window.dispatchEvent(new CustomEvent("site:analytics-consent", {
      detail: { granted }
    }));
  };

  const readChoice = () => {
    try {
      return window.localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  };

  const saveChoice = (choice) => {
    try {
      window.localStorage.setItem(storageKey, choice);
    } catch {
      // Web zůstává funkční i v prohlížeči, který úložiště blokuje.
    }
  };

  const closeBanner = () => {
    if (banner) banner.hidden = true;
  };

  const choose = (granted) => {
    saveChoice(granted ? "granted" : "denied");
    closeBanner();
    publishChoice(granted);
  };

  acceptButton?.addEventListener("click", () => choose(true));
  rejectButton?.addEventListener("click", () => choose(false));

  const savedChoice = readChoice();
  if (savedChoice === "granted") {
    closeBanner();
    publishChoice(true);
  } else if (savedChoice === "denied") {
    closeBanner();
    publishChoice(false);
  } else if (banner) {
    banner.hidden = false;
  }
})();
