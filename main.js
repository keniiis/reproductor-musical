let musicPlayer = document.querySelector(".music-player-container");
let togglePlayer = document.querySelector(".toggle-player");

let trackInfo = document.querySelector(".track-info");
let trackName = document.querySelector(".track-name");
let trackArtist = document.querySelector(".track-artist");
let trackNav = document.querySelector(".track-nav");

let playPauseBtn = document.querySelector(".playpause-track");
let nextBtn = document.querySelector(".next-track");
let prevBtn = document.querySelector(".prev-track");

let trackIndex = 0;
let isPlaying = false;
let isHidden = true;
let hasStarted = false;

let currentTrack = document.createElement("audio");
let soundBars = document.querySelector(".sound-bars");

togglePlayer.addEventListener("click", function () {
  isHidden = !isHidden;

  if (isHidden) {
    musicPlayer.classList.remove("hide");
    togglePlayer.innerHTML = '<ion-icon name="remove-outline"></ion-icon>';
    trackInfo.style.transitionDelay = "0.4s";
    trackNav.style.transitionDelay = "0.4s";
  } else {
    musicPlayer.classList.add("hide");
    togglePlayer.innerHTML = '<ion-icon name="add-outline"></ion-icon>';
    trackInfo.style.transitionDelay = "0s";
    trackNav.style.transitionDelay = "0s";
  }
});

let soundBarsLottie;

function loadSoundBarsAnimation() {
  soundBarsLottie = bodymovin.loadAnimation({
    container: soundBars,
    renderer: "svg",
    loop: true,
    autoplay: false,
    path: "https://assets5.lottiefiles.com/packages/lf20_jJJl6i.json",
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
    },
  });
}

loadSoundBarsAnimation();

let trackList = [
  {
    name: "Track-01",
    artist: "Mixkirt",
    path: "./media/track-01.mp3",
  },
  {
    name: "Track-02",
    artist: "Mixkirt",
    path: "./media/track-02.mp3",
  },
  {
    name: "Track-03",
    artist: "Mixkirt",
    path: "./media/track-03.mp3",
  },
  {
    name: "Track-04",
    artist: "Mixkirt",
    path: "./media/track-04.mp3",
  },
  {
    name: "Track-05",
    artist: "Mixkirt",
    path: "./media/track-05.mp3",
  },
];

function loadTrack(trackIndex) {
  currentTrack.src = trackList[trackIndex].path;
  currentTrack.load();
  trackName.textContent = trackList[trackIndex].name;
  trackArtist.textContent = trackList[trackIndex].artist;
  currentTrack.addEventListener("ended", nextTrack);
}

loadTrack(trackIndex);

function playTrack() {
  currentTrack.play();
  isPlaying = true;
  playPauseBtn.innerHTML = '<ion-icon name="pause-sharp"></ion-icon>';

  if (!hasStarted) {
    soundBarsLottie.setDirection(1);
    soundBarsLottie.play();
    hasStarted = true;
  } else {
    soundBarsLottie.setDirection(1);
    soundBarsLottie.playSegments([0, soundBarsLottie.totalFrames], true);
  }
}

function pauseTrack() {
    currentTrack.pause();
    isPlaying = false;
    playPauseBtn.innerHTML = '<ion-icon name="play-sharp"></ion-icon>';
  
    soundBarsLottie.goToAndStop(0, true);
  }
  

function nextTrack() {
  if (trackIndex < trackList.length - 1) trackIndex += 1;
  else trackIndex = 0;
  loadTrack(trackIndex);
  playTrack();
}

function prevTrack() {
  if (trackIndex > 0) trackIndex -= 1;
  else trackIndex = trackList.length - 1;
  loadTrack(trackIndex);
  playTrack();
}

playPauseBtn.addEventListener("click", function () {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
});

nextBtn.addEventListener("click", function () {
  nextTrack();
});

prevBtn.addEventListener("click", function () {
  prevTrack();
});
