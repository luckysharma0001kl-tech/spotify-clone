const audio = document.getElementById("audio");

const playPauseBtn = document.getElementById("playPause");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

const volumeSlider = document.getElementById("volume");
const muteBtn = document.getElementById("mute");

const cards = document.querySelectorAll(".card");
const songName = document.querySelector(".song-name");

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");

const songs = [
  { title: "Daily Mix 1", src: "songs/song1.mp3" },
  { title: "Top Hits", src: "songs/song2.mp3" },
  { title: "Chill Vibes", src: "songs/song3.mp3" }
];

let songIndex = 0;
let isPlaying = false;
let lastVolume = 1;

function loadSong(index) {
  audio.src = songs[index].src;
  songName.innerText = songs[index].title;
}

function playSong() {
  audio.play();
  playPauseBtn.className = "fa-solid fa-pause";
  isPlaying = true;
}

function pauseSong() {
  audio.pause();
  playPauseBtn.className = "fa-solid fa-play";
  isPlaying = false;
}

/* Card click */
cards.forEach(card => {
  card.addEventListener("click", () => {
    songIndex = card.dataset.index;
    loadSong(songIndex);
    playSong();
  });
});

/* Controls */
playPauseBtn.onclick = () => isPlaying ? pauseSong() : playSong();

nextBtn.onclick = () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  playSong();
};

prevBtn.onclick = () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playSong();
};

/* Progress */
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeEl.innerText = formatTime(audio.currentTime);
  durationEl.innerText = formatTime(audio.duration);
});

progress.oninput = () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
};

/* Volume */
volumeSlider.oninput = () => {
  audio.volume = volumeSlider.value;
};

muteBtn.onclick = () => {
  if (audio.volume > 0) {
    lastVolume = audio.volume;
    audio.volume = 0;
    volumeSlider.value = 0;
  } else {
    audio.volume = lastVolume;
    volumeSlider.value = lastVolume;
  }
};

/* Sidebar toggle */
menuBtn.onclick = () => {
  sidebar.classList.toggle("active");
};

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
