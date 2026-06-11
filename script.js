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

  // 1. Set overlay jadi Flex/Grid rapi yang memenuhi layar
  overlay.classList.remove("hidden");
  overlay.style.display = "grid";

  // Tentukan ukuran per kotak (misal 80px x 80px biar pas di layar)
  const ukuranKotak = 80;
  const kolom = Math.ceil(window.innerWidth / ukuranKotak);
  const baris = Math.ceil(window.innerHeight / ukuranKotak);

  // Buat grid layout lewat JS agar presisi sesuai layar
  overlay.style.gridTemplateColumns = `repeat(${kolom}, 1fr)`;
  overlay.style.gridTemplateRows = `repeat(${baris}, 1fr)`;

  // 2. Loop membuat kepala Deku mengisi setiap kotak (TIDAK ACAK, PASTI RAPI)
  for (let r = 0; r < baris; r++) {
    for (let c = 0; c < kolom; c++) {
      const kotakKecil = document.createElement("div");
      kotakKecil.classList.add("relative", "flex", "items-center", "justify-center", "w-full", "h-full");

      const deku = document.createElement("img");
      deku.src = "assets/dekuchibi.jpeg";
      deku.classList.add("animate-anime-deku", "object-cover");

      // Ukuran gambar disesuaikan agar menutup penuh kotak jalurnya
      deku.style.width = "105%";
      deku.style.height = "105%";

      // EFEK OMBAK ANIME: Delay dihitung berdasarkan posisi kolom dan baris
      // Jadi nanti dia munculnya berurutan menyapu layar dari pojok kiri atas ke kanan bawah
      deku.style.animationDelay = `${(c + r) * 0.03}s`;

      kotakKecil.appendChild(deku);
      overlay.appendChild(kotakKecil);
    }
  }

  // 3. Terminal mulai menghilang tipis-tipis
  terminalPage.classList.add("opacity-0");

  // 4. TIMING PINDAH HALAMAN (Sangat Cepat!)
  // Total durasi sapuan grid berkisar 0.6 - 0.9 detik
  setTimeout(() => {
    terminalPage.classList.add("hidden");
    revealPage.classList.remove("hidden");

    // Matikan display grid & bersihkan layar
    overlay.style.display = "none";
    overlay.classList.add("hidden");
    overlay.innerHTML = "";

    setTimeout(() => {
      revealPage.classList.add("opacity-100");
    }, 50);
  }, 800); // 0.8 detik langsung ganti halaman!
}

window.onload = typeWriter;
