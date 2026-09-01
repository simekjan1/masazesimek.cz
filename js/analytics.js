(() => {
  let loaded = false;

  const clearToplist = () => {
    document.querySelectorAll("[data-toplist]").forEach((container) => {
      container.replaceChildren();
    });
  };

  const loadToplist = () => {
    document.querySelectorAll("[data-toplist]").forEach((container) => {
      const link = document.createElement("a");
      link.href = "https://www.toplist.cz";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", "TOPlist – statistiky návštěvnosti, otevře se v nové kartě");

      const image = document.createElement("img");
      const parameters = new URLSearchParams({
        id: "1841744",
        logo: "mc",
        http: document.referrer,
        t: document.title,
        l: document.URL,
        wi: String(window.screen.width),
        he: String(window.screen.height),
        cd: String(window.screen.colorDepth)
      });
      image.src = `https://toplist.cz/count.asp?${parameters.toString()}`;
      image.width = 88;
      image.height = 120;
      image.alt = "TOPlist – statistiky návštěvnosti";
      link.append(image);
      container.replaceChildren(link);
    });
  };

  const loadAnalytics = () => {
    if (loaded) return;
    loaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", "G-QBYW261T97", { anonymize_ip: true });

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-QBYW261T97";
    document.head.append(script);
    loadToplist();
  };

  window.addEventListener("site:analytics-consent", (event) => {
    if (event.detail?.granted) {
      loadAnalytics();
    } else if (!loaded) {
      clearToplist();
    }
  });
})();
