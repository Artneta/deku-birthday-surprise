// ==========================================
// DATA PLAYLIST LAGU (Ubah sesuai filemu)
// ==========================================
const playlist = [
  {
    title: "Hero Too (Acoustic)",
    artist: "My Hero Academia",
    src: "assets/song1.mp3",
    cover: "assets/dekuchibi.jpeg",
  },
  {
    title: "Sparkle (Piano Ver.)",
    artist: "Radwimps",
    src: "assets/song2.mp3",
    cover: "assets/dekuchibi.jpeg", // Bisa diganti foto Mikaela nanti
  },
  {
    title: "Nandemonaiya",
    artist: "Music Box Version",
    src: "assets/song3.mp3",
    cover: "assets/dekuchibi.jpeg",
  },
];

let currentTrackIndex = 0;
const currentAudio = new Audio();
currentAudio.volume = 0.4;
let isPlaying = false;

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

// ==========================================
// ENGINE SPOTIFY PLAYER
// ==========================================
function loadTrack(index) {
  const track = playlist[index];
  currentAudio.src = track.src;
  document.getElementById("player-title").innerText = track.title;
  document.getElementById("player-artist").innerText = track.artist;
  document.getElementById("player-cover").src = track.cover;
}

function togglePlay() {
  const playIcon = document.getElementById("play-icon");
  if (isPlaying) {
    currentAudio.pause();
    playIcon.innerHTML = `<svg class="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
    isPlaying = false;
  } else {
    currentAudio.play().catch((e) => console.log("Play diblokir:", e));
    playIcon.innerHTML = `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
    isPlaying = true;
  }
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(currentTrackIndex);
  if (isPlaying) {
    currentAudio.play();
  } else {
    togglePlay();
  }
}

function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrackIndex);
  if (isPlaying) {
    currentAudio.play();
  } else {
    togglePlay();
  }
}

// Update Progress Bar Jalannya Lagu
currentAudio.addEventListener("timeupdate", () => {
  const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
  document.getElementById("player-progress").style.width = `${progress}%`;
});

// Otomatis Next Kalau Lagu Habis
currentAudio.addEventListener("ended", nextTrack);

// ==========================================
// FUNSI TRANSISI UTAMA
// ==========================================
function revealSurprise() {
  const terminalPage = document.getElementById("terminal-page");
  const revealPage = document.getElementById("reveal-page");
  const overlay = document.getElementById("transition-overlay");
  const playerWidget = document.getElementById("music-player");

  overlay.innerHTML = "";
  overlay.classList.remove("hidden");
  overlay.className = "fixed inset-0 z-50 pointer-events-none";

  const tirai = document.createElement("div");
  tirai.classList.add("tirai-anime");
  overlay.appendChild(tirai);

  // Efek Petir Bawaanmu
  for (let j = 0; j < 15; j++) {
    const petir = document.createElement("div");
    petir.classList.add("petir-ofa");
    petir.style.left = `${Math.random() * 90}%`;
    petir.style.top = `${Math.random() * 90}%`;
    petir.style.transform = `rotate(${Math.random() * 360}deg)`;
    petir.style.animationDelay = `${Math.random() * 0.4}s`;
    overlay.appendChild(petir);
  }

  terminalPage.classList.add("opacity-0");

  setTimeout(() => {
    terminalPage.classList.add("hidden");
    revealPage.classList.remove("hidden");

    // Siapkan lagu pertama & nyalakan musik otomatis saat masuk
    loadTrack(currentTrackIndex);
    togglePlay();

    // Munculkan Widget Spotify Melayang dengan efek halus
    playerWidget.classList.remove("hidden");
    setTimeout(() => {
      playerWidget.style.opacity = "1";
    }, 100);

    setTimeout(() => {
      revealPage.classList.add("opacity-100");
    }, 50);
  }, 450);

  setTimeout(() => {
    overlay.classList.add("hidden");
    overlay.innerHTML = "";
  }, 1200);
}

// ==========================================
// FITUR DRAG SEMPURNA (ANTI-LONCAT)
// ==========================================
const player = document.getElementById("music-player");
let isDragging = false;
let currentX = 0;
let currentY = 0;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

player.addEventListener("mousedown", dragStart);
document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", dragEnd);

player.addEventListener("touchstart", dragStart, { passive: true });
document.addEventListener("touchmove", drag, { passive: false });
document.addEventListener("touchend", dragEnd);

function dragStart(e) {
  // Biar tombol di dalam player tetep bisa diklik normal
  if (e.target.closest('button')) return; 

  if (e.type === "touchstart") {
    initialX = e.touches[0].clientX - xOffset;
    initialY = e.touches[0].clientY - yOffset;
  } else {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
  }
  isDragging = true;
}

function drag(e) {
  if (!isDragging) return;
  
  // Mencegah layar HP ikutan kescroll pas kotaknya lagi ditarik
  if (e.type === "touchmove") e.preventDefault(); 

  if (e.type === "touchmove") {
    currentX = e.touches[0].clientX - initialX;
    currentY = e.touches[0].clientY - initialY;
  } else {
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;
  }

  xOffset = currentX;
  yOffset = currentY;

  // Cukup gerakkan lewat translate agar smooth dan nempel presisi di kursor
  player.style.transform = `translate(${currentX}px, ${currentY}px)`;
}

function dragEnd() {
  initialX = currentX;
  initialY = currentY;
  isDragging = false;
}

// Inisialisasi posisi awal drag
currentX = 0;
currentY = 0;
window.onload = typeWriter;
