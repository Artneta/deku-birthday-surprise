const message = "> Subject Found: Mikaela";
const typingElement = document.getElementById("typing-text");
const nextBtn = document.getElementById("next-btn");
let i = 0;

// Efek Mengetik
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

// Fungsi Transisi Halaman
function revealSurprise() {
  const terminalPage = document.getElementById("terminal-page");
  const revealPage = document.getElementById("reveal-page");

  terminalPage.classList.add("opacity-0");

  setTimeout(() => {
    terminalPage.classList.add("hidden");
    revealPage.classList.remove("hidden");
    setTimeout(() => {
      revealPage.classList.add("opacity-100");
    }, 50);
  }, 1000);
}

window.onload = typeWriter;
