// ==========================================
// CONFIG DATA & AUDIO
// ==========================================
const playlist = [
  { title: "Hero Too (Acoustic)", artist: "My Hero Academia", src: "assets/song1.mp3", cover: "assets/dekuchibi.jpeg" },
  { title: "Sparkle (Piano Ver.)", artist: "Radwimps", src: "assets/song2.mp3", cover: "assets/dekuchibi.jpeg" },
];

let currentTrackIndex = 0;
const currentAudio = new Audio();
currentAudio.volume = 0.2; // BGM dikecilkan biar suara Deku jelas
let isPlaying = false;

const dekuVoice = new Audio("assets/deku-voice.mp3");
dekuVoice.volume = 0.9;

// Silakan ganti teks ucapan bahasa inggris pilihanmu di bawah ini
const birthdayText =
  "Happy Birthday, Mikaela! 💚\n\nJust like how I always strive to break past my limits with everything I've got, you’ve been an incredible hero in your own way, bringing so much light into the world!\n\nI hope this new year brings you endless happiness, and that all your biggest dreams come true. Keep smiling, and remember... Go beyond, Plus Ultra!";

let letterIndex = 0;
const message = "> Terminal Initialized. Scanning network...";
let i = 0;

function typeWriter() {
  const typingElement = document.getElementById("typing-text");

  // Pengaman jika elemen belum ke-load
  if (!typingElement) return;

  if (i < message.length) {
    typingElement.innerHTML += message.charAt(i);
    i++;
    setTimeout(typeWriter, 40);
  } else {
    // Munculkan container input nama setelah mengetik selesai
    const inputContainer = document.getElementById("input-container");
    if (inputContainer) {
      inputContainer.classList.remove("hidden");
      setTimeout(() => {
        inputContainer.classList.add("opacity-100");
      }, 50);
    }
  }
}

// 2. Cek Validasi Nama Input (Biar personal!)
function checkAccessName() {
  const inputVal = document.getElementById("user-name-input").value.trim().toLowerCase();
  const errorMsg = document.getElementById("error-msg");

  // Web akan terbuka kalau dia ngetik "mikaela"
  if (inputVal === "mikaela") {
    errorMsg.classList.add("hidden");
    startLoadingScreen();
  } else {
    errorMsg.classList.remove("hidden");
    errorMsg.classList.add("animate-shake"); // Efek getar eror
    setTimeout(() => errorMsg.classList.remove("animate-shake"), 500);
  }
}

// 3. Jalankan Loading Screen 0% - 100% Sinematik
function startLoadingScreen() {
  document.getElementById("terminal-page").classList.add("hidden");
  const loadingPage = document.getElementById("loading-page");
  loadingPage.classList.remove("hidden");

  let currentPct = 0;
  const pctText = document.getElementById("load-pct");
  const bar = document.getElementById("load-bar");

  function frame() {
    if (currentPct >= 100) {
      clearInterval(int);
      // Begitu 100%, pindah ke Halaman Kurir Deku Bawa Surat
      loadingPage.classList.add("hidden");
      const courierPage = document.getElementById("courier-page");
      courierPage.classList.remove("hidden");
      setTimeout(() => {
        courierPage.classList.add("opacity-100");
      }, 50);
    } else {
      currentPct += Math.floor(Math.random() * 4) + 1; // Naik acak biar dramatis
      if (currentPct > 100) currentPct = 100;
      pctText.innerText = currentPct;
      bar.style.width = currentPct + "%";
    }
  }
  // Kecepatan loading diatur acak agar terasa realistis
  const int = setInterval(frame, 60);
}

// 4. Buka Kejutan Final (Saat Surat di-klik)
function openFinalSurprise() {
  document.getElementById("courier-page").classList.add("hidden");

  const revealPage = document.getElementById("reveal-page");
  const playerWidget = document.getElementById("music-player");

  revealPage.classList.remove("hidden");

  // Nyalakan Musik & Spotify Widget
  loadTrack(currentTrackIndex);
  togglePlay();
  playerWidget.classList.remove("hidden");
  setTimeout(() => {
    playerWidget.style.opacity = "1";
  }, 100);

  // Nyalakan Suara Deku + Efek Ketik Papan Ucapan
  dekuVoice.play().catch((e) => console.log("Voice diblokir:", e));
  typeBirthdayLetter();

  setTimeout(() => {
    revealPage.classList.add("opacity-100");
  }, 50);
}

// Fungsi Efek Ketik Papan Surat
function typeBirthdayLetter() {
  const targetElement = document.getElementById("birthday-letter");
  if (letterIndex < birthdayText.length) {
    let char = birthdayText.charAt(letterIndex);
    if (char === "\n") {
      targetElement.innerHTML += "<br>";
    } else {
      targetElement.innerHTML += char;
    }
    letterIndex++;
    setTimeout(typeBirthdayLetter, 30);
  }
}

// ==========================================
// ENGINE MUSIC PLAYER CONTROL & DRAG SPOTIFY
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
    currentAudio.play().catch((e) => console.log(e));
    playIcon.innerHTML = `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
    isPlaying = true;
  }
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(currentTrackIndex);
  if (isPlaying) currentAudio.play();
}

function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrackIndex);
  if (isPlaying) currentAudio.play();
}

currentAudio.addEventListener("timeupdate", () => {
  const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
  document.getElementById("player-progress").style.width = `${progress}%`;
});
currentAudio.addEventListener("ended", nextTrack);

// Sektor Drag Player (Anti-Loncat)
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
  if (e.target.closest("button")) return;
  initialX = e.type === "touchstart" ? e.touches[0].clientX - xOffset : e.clientX - xOffset;
  initialY = e.type === "touchstart" ? e.touches[0].clientY - yOffset : e.clientY - yOffset;
  isDragging = true;
}

function drag(e) {
  if (!isDragging) return;
  if (e.type === "touchmove") e.preventDefault();
  currentX = e.type === "touchmove" ? e.touches[0].clientX - initialX : e.clientX - initialX;
  currentY = e.type === "touchmove" ? e.touches[0].clientY - initialY : e.clientY - initialY;
  xOffset = currentX;
  yOffset = currentY;
  player.style.transform = `translate(${currentX}px, ${currentY}px)`;
}
function dragEnd() {
  initialX = currentX;
  initialY = currentY;
  isDragging = false;
}

window.onload = typeWriter;
