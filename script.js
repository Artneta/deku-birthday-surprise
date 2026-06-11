// TRICK PRELOAD (Biar gambar siap di memori)
const dekuPreload = new Image();
dekuPreload.src = "assets/dekuchibi.jpeg";

const message = "> Subject Found: Mikaela";
const typingElement = document.getElementById("typing-text");
const nextBtn = document.getElementById("next-btn");
let i = 0;

function typeWriter() {
  if (i < message.length) {
    typingElement.innerHTML += message.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
  } else {
    nextBtn.classList.remove("hidden");
    nextBtn.classList.add("animate-pulse");
  }
}

function revealSurprise() {
  const terminalPage = document.getElementById("terminal-page");
  const revealPage = document.getElementById("reveal-page");
  const overlay = document.getElementById("transition-overlay");

  overlay.classList.remove("hidden");

  const generatorHujan = setInterval(() => {
    for (let k = 0; k < 10; k++) {
      const deku = document.createElement("img");
      deku.src = "assets/dekuchibi.jpeg";
      deku.classList.add("absolute", "animate-deku", "w-14", "h-14", "rounded-full");

      const posX = Math.random() * window.innerWidth;
      const posY = Math.random() * window.innerHeight;
      deku.style.left = `${posX}px`;
      deku.style.top = `${posY}px`;

      overlay.appendChild(deku);
    }
  }, 30);

  terminalPage.classList.add("opacity-0");

  setTimeout(() => {

    clearInterval(generatorHujan);

    terminalPage.classList.add("hidden");
    revealPage.classList.remove("hidden");

    overlay.classList.add("hidden");
    overlay.innerHTML = "";

    setTimeout(() => {
      revealPage.classList.add("opacity-100");
    }, 50);
  }, 1500);
}

window.onload = typeWriter;
