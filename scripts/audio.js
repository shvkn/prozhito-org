//TODO Есть проблема с loadedmeta
const isPlayed = (audio) => !audio.paused;

const play = (e) => {
  const playButton = e.target;
  const audio = playButton.closest('.audio-player').querySelector('audio');
  playButton.classList.toggle('audio-player__control_type_pause');
  (isPlayed(audio)) ? audio.pause() : audio.play();
}
const setProgress = (e) => {
  const progress = e.target;
  const audio = progress.closest('.audio-player').querySelector('audio');
  const progressSize = progress.getBoundingClientRect();
  const currentPercent = 100 * (e.clientX - progressSize.left) / progressSize.width;
  audio.currentTime = currentPercent * audio.duration / 100;
}

const updateTimer = (timer, time) => {
  console.log(time);
  timer.textContent = time;
}

const initPlayer = (player) => {
  const audio = player.querySelector('audio');
  const playButton = player.querySelector('.audio-player__control_type_play');
  const cwButton = player.querySelector('.audio-player__control_type_cw');
  const ccwButton = player.querySelector('.audio-player__control_type_ccw');
  const progress = player.querySelector('.audio-player__progress');
  const timeLeft = player.querySelector('.audio-player__time-left');
  console.log('duration', audio.duration);
  updateTimer(timeLeft, formatTime(audio.duration));

  cwButton.direction = 'cw';
  ccwButton.direction = 'ccw';

  cwButton.addEventListener('click', rewind);
  ccwButton.addEventListener('click', rewind);
  playButton.addEventListener('click', play);
  progress.addEventListener('click', setProgress);
  audio.addEventListener('timeupdate', updateProgress);
}

const formatTime = (seconds) => {
  console.log(seconds);
  return (seconds < 3600)
    ? new Date(seconds * 1000).toISOString().slice(14, 19)
    : new Date(seconds * 1000).toISOString().slice(11, 19);
}

const updateProgress = (e) => {
  const audio = e.target;
  const timer = audio.closest('.audio-player').querySelector('.audio-player__time-left');
  const currentProgress = audio.closest('.audio-player').querySelector('.audio-player__current-progress');

  const {duration, currentTime} = audio;
  const progressPercent = (currentTime * 100) / duration;

  updateTimer(timer, formatTime(currentTime));
  currentProgress.style.width = `${progressPercent}%`;
}


const rewind = (e) => {
  const delta = 15;
  const direction = e.target.direction;
  const audio = e.target.closest('.audio-player').querySelector('audio');

  switch (direction) {
    case 'cw':
      audio.currentTime += delta;
      break;
    case 'ccw':
      audio.currentTime -= delta;
  }
}
window.addEventListener('load', (event) => {
  document.querySelectorAll('.audio-player').forEach(player => {
    initPlayer(player);
  });
});
