// TRICK PRELOAD (Biar gambar siap di memori)
// Di bagian paling atas script.js, buat objek audio baru
const audioBGM = new Audio("assets/bgm.mp3");
audioBGM.loop = true; // Biar lagunya muter terus gak habis-habis
audioBGM.volume = 0.5;

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

  // 1. Bersihkan overlay dan aktifkan layarnya
  overlay.innerHTML = "";
  overlay.classList.remove("hidden");
  overlay.className = "fixed inset-0 z-50 pointer-events-none"; // Reset class awal

  // 2. Buat Elemen Tirai Diagonal Anime
  const tirai = document.createElement("div");
  tirai.classList.add("tirai-anime");
  overlay.appendChild(tirai);

  // 3. GENERATOR PETIR ONE FOR ALL (Muncul cepat secara acak)
  const jumlahPetir = 15;
  for (let j = 0; j < jumlahPetir; j++) {
    const petir = document.createElement("div");
    petir.classList.add("petir-ofa");

    // Acak posisi petir di layar
    petir.style.left = `${Math.random() * 90}%`;
    petir.style.top = `${Math.random() * 90}%`;

    // Beri rotasi acak agar petirnya menyambar ke segala arah
    petir.style.transform = `rotate(${Math.random() * 360}deg)`;

    // Delay acak kilatannya (sangat tipis antar petir)
    petir.style.animationDelay = `${Math.random() * 0.4}s`;

    overlay.appendChild(petir);
  }

  // 4. Efek Memudar Terminal bawaanmu
  terminalPage.classList.add("opacity-0");

  // 5. TIMING SWITCH HALAMAN (Tepat saat tirai menutup layar penuh)
  setTimeout(() => {
    terminalPage.classList.add("hidden");
    revealPage.classList.remove("hidden");

    // Aktifkan BGM kamu di sini nanti jika sudah siap filenya
    // audioBGM.play().catch(e => console.log(e));

    setTimeout(() => {
      revealPage.classList.add("opacity-100");
    }, 50);
  }, 450); // 450ms adalah titik puncak saat tirai menyapu tengah layar

  // 6. Bersihkan total panggung transisi setelah selesai berganti halaman
  setTimeout(() => {
    overlay.classList.add("hidden");
    overlay.innerHTML = "";
  }, 1200); // Sesuai durasi total animasi tirai (1.2s)
}

window.onload = typeWriter;
