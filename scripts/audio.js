const isPlayed = (audio) => !audio.paused;

const play = (e) => {
  const playButton = e.target;
  const audioFile = playButton.closest('.audio').querySelector('audio');
  playButton.classList.toggle('audio-player__control_type_pause');
  (isPlayed(audioFile)) ? audioFile.pause() : audioFile.play();
}

const setProgress = (e) => {
  const progress = e.target;
  const audioFile = progress.closest('.audio').querySelector('audio');
  const progressSize = progress.getBoundingClientRect();
  const currentPercent = 100 * (e.clientX - progressSize.left) / progressSize.width;
  audioFile.currentTime = currentPercent * audioFile.duration / 100;
}

const updateTimer = (timer, time) => timer.textContent = time

const initPlayer = (audio) => {
  audio.insertAdjacentHTML('afterbegin',
    `<div class="audio-player">
            <div class="audio-player__inner">
             <button class="audio-player__control audio-player__control_type_play"></button>
             <button class="audio-player__control audio-player__control_type_ccw"></button>
             <button class="audio-player__control audio-player__control_type_cw"></button>
             <div class="audio-player__progress">
              <div class="audio-player__current-progress"></div>
             </div>
             <div class="audio-player__time-left"></div>
             <button class="audio-player__control audio-player__control_type_volume"></button>
            </div>
          </div>`);

  const audioFile = audio.querySelector('audio');
  const playButton = audio.querySelector('.audio-player__control_type_play');
  const cwButton = audio.querySelector('.audio-player__control_type_cw');
  const ccwButton = audio.querySelector('.audio-player__control_type_ccw');
  const progress = audio.querySelector('.audio-player__progress');
  const timeLeft = audio.querySelector('.audio-player__time-left');
  updateTimer(timeLeft, formatTime(audioFile.duration));

  cwButton.direction = 'cw';
  ccwButton.direction = 'ccw';

  cwButton.addEventListener('click', rewind);
  ccwButton.addEventListener('click', rewind);
  playButton.addEventListener('click', play);
  progress.addEventListener('click', setProgress);
  audioFile.addEventListener('timeupdate', updateProgress);
}

const formatTime = (seconds) => {
  return (seconds < 3600)
    ? new Date(seconds * 1000).toISOString().slice(14, 19)
    : new Date(seconds * 1000).toISOString().slice(11, 19);
}

const updateProgress = (e) => {
  const audioFile = e.target;
  const audio = audioFile.closest('.audio');
  const timer = audio.querySelector('.audio-player__time-left');
  const currentProgress = audio.querySelector('.audio-player__current-progress');

  const {duration, currentTime} = audioFile;
  const progressPercent = (currentTime * 100) / duration;

  updateTimer(timer, formatTime(currentTime));
  currentProgress.style.width = `${progressPercent}%`;
}


const rewind = (e) => {
  const delta = 15;
  const direction = e.target.direction;
  const audioFile = e.target.closest('.audio').querySelector('audio');

  switch (direction) {
    case 'cw':
      audioFile.currentTime += delta;
      break;
    case 'ccw':
      audioFile.currentTime -= delta;
  }
}
window.addEventListener('load', (event) => {
  document.querySelectorAll('.audio').forEach(audio => {
    const audioElement = audio.querySelector('audio');
    (audioElement.readyState > 0) ? initPlayer(audio) : audioElement.onloadedmetadata = () => initPlayer(audio);
  });
});
