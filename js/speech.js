const speechStatus = document.getElementById("speech-status");
const speechSections = document.querySelectorAll("[data-speech-section]");

if ("speechSynthesis" in window && "SpeechSynthesisUtterance" in window) {
  const synth = window.speechSynthesis;

  const announce = (message) => {
    if (speechStatus) speechStatus.textContent = message;
  };

  speechSections.forEach((section) => {
    const content = section.querySelector("[data-speech-content]");
    if (!content) return;

    const controls = document.createElement("div");
    controls.className = "speech-controls";

    const playButton = document.createElement("button");
    playButton.type = "button";
    playButton.className = "button button--secondary button--small";
    playButton.textContent = "Přečíst nahlas";

    const stopButton = document.createElement("button");
    stopButton.type = "button";
    stopButton.className = "button button--secondary button--small";
    stopButton.textContent = "Zastavit čtení";

    playButton.addEventListener("click", () => {
      const text = Array.from(content.querySelectorAll("h2, h3, h4, p, li"))
        .map((element) => element.innerText.trim())
        .filter(Boolean)
        .join(" ");
      if (!text) return;

      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "cs-CZ";
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.addEventListener("start", () => announce("Hlasité čtení bylo spuštěno."));
      utterance.addEventListener("end", () => announce("Hlasité čtení bylo dokončeno."));
      utterance.addEventListener("error", () => announce("Hlasité čtení se nepodařilo spustit."));
      synth.speak(utterance);
    });

    stopButton.addEventListener("click", () => {
      synth.cancel();
      announce("Hlasité čtení bylo zastaveno.");
    });

    controls.append(playButton, stopButton);
    content.prepend(controls);
  });

  window.addEventListener("pagehide", () => synth.cancel());
}
