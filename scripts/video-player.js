const InitVidePlayer = (video) => {

  const wrapper = document.createElement('div');
  wrapper.className = 'video-player';
  const playButton = document.createElement('button');
  playButton.className = 'video-player__play-button';
  const togglePlayButton = () => playButton.hidden = !playButton.hidden;
  video.addEventListener('play', (e) => togglePlayButton());
  video.addEventListener('pause', (e) => togglePlayButton());

  playButton.addEventListener('click', (e) => {
    video.play();
  });

  video.parentNode.insertBefore(wrapper, video);
  wrapper.insertAdjacentElement('afterbegin', video);
  wrapper.insertAdjacentElement('afterbegin', playButton);
}

window.addEventListener('load', function () {
  document.querySelectorAll('video').forEach(video => {
    InitVidePlayer(video);
  });
});

