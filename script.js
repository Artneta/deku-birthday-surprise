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
    // Tombol muncul otomatis setelah mengetik selesai
    nextBtn.classList.remove("hidden");
    nextBtn.classList.add("animate-pulse");
  }
}

// Fungsi Transisi Halaman + Hujan Kepala Deku
function revealSurprise() {
  const terminalPage = document.getElementById("terminal-page");
  const revealPage = document.getElementById("reveal-page");
  const overlay = document.getElementById("transition-overlay");

  // 1. Jalankan efek memudar pada halaman terminal bawaanmu
  terminalPage.classList.add("opacity-0");

  // 2. MUNCULKAN HUJAN KEPALA DEKU
  overlay.classList.remove("hidden");
  const jumlahKepala = 40;

  for (let j = 0; j < jumlahKepala; j++) {
    const deku = document.createElement("img");
    deku.src = "assets/dekuchibi.jpeg"; // Perbaikan typo dari 'assests' ke 'assets'
    deku.classList.add("absolute", "animate-deku", "w-16", "h-16", "rounded-full");

    // Acak posisi layar
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    deku.style.left = `${posX}px`;
    deku.style.top = `${posY}px`;

    // Delay acak biar estetik
    deku.style.animationDelay = `${Math.random() * 0.5}s`;

    overlay.appendChild(deku);
  }

  // 3. PROSES PERGANTIAN HALAMAN (Sambil kepala Deku berterbangan)
  setTimeout(() => {
    terminalPage.classList.add("hidden");
    revealPage.classList.remove("hidden");

    // Sembunyikan tirai hujan deku & bersihkan memorinya
    overlay.classList.add("hidden");
    overlay.innerHTML = "";

    setTimeout(() => {
      revealPage.classList.add("opacity-100");
    }, 50);
  }, 1200); // Durasi transisi pas di tengah-tengah hujan Deku
}

window.onload = typeWriter;
