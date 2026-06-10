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

function revealSurprise() {
  const overlay = document.getElementById("transition-overlay");
  overlay.classList.remove("hidden"); // Tampilkan wadah transisi

  const jumlahKepala = 40; // Kamu bisa atur mau seberapa banyak

  for (let i = 0; i < jumlahKepala; i++) {
    // 1. Buat elemen gambar baru
    const deku = document.createElement("img");
    deku.src = "assests/dekuchibi.jpeg"; // Sesuaikan dengan nama file foto deku kamu
    deku.classList.add("absolute", "animate-deku", "w-16", "h-16"); // Ukuran pakai Tailwind

    // 2. Acak posisinya di layar (Sumbu X dan Y)
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    deku.style.left = `${posX}px`;
    deku.style.top = `${posY}px`;

    // 3. Kasih delay acak biar munculnya bergantian (efek seru)
    deku.style.animationDelay = `${Math.random() * 0.5}s`;

    // 4. Masukkan ke dalam wadah overlay
    overlay.appendChild(deku);
  }

  // 5. Setelah animasi selesai (misal 1.5 detik), baru pindah halaman atau buka konten utama
  setTimeout(() => {
    // Di sini ganti dengan logika pindah halaman kamu, contoh:
    // window.location.href = "halaman_utama.html";

    // Atau kalau cuma mau buka komponen tersembunyi:
    document.getElementById("halaman-terminal").classList.add("hidden");
    document.getElementById("halaman-utama").classList.remove("hidden");
    overlay.classList.add("hidden"); // Sembunyikan lagi overlay-nya
    overlay.innerHTML = ""; // Bersihkan sisa kepala Deku tadi
  }, 1500);
}
