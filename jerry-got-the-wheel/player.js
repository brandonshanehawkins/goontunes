/**
 * Standalone Client-Side Music Player Engine
 */
document.addEventListener('DOMContentLoaded', async () => {
  let playlist = [];
  let currentIndex = 0;
  let isPlaying = false;
  let isShuffle = false;
  let repeatMode = 0; // 0: off, 1: all, 2: one

  const audio = new Audio();
  audio.crossOrigin = "anonymous";

  // Elements
  const coverImg = document.getElementById('coverImg');
  const coverPlaceholder = document.getElementById('coverPlaceholder');
  const trackTitle = document.getElementById('trackTitle');
  const trackArtist = document.getElementById('trackArtist');
  const seekSlider = document.getElementById('seekSlider');
  const currentTimeEl = document.getElementById('currentTime');
  const durationTimeEl = document.getElementById('durationTime');
  const btnPlayPause = document.getElementById('btnPlayPause');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const btnShuffle = document.getElementById('btnShuffle');
  const btnRepeat = document.getElementById('btnRepeat');
  const btnMute = document.getElementById('btnMute');
  const volumeSlider = document.getElementById('volumeSlider');
  const playlistQueue = document.getElementById('playlistQueue');
  const canvas = document.getElementById('visualizerCanvas');

  // Load Playlist JSON
  try {
    const res = await fetch('playlist.json');
    playlist = await res.json();
    renderQueue();
    if (playlist.length > 0) {
      loadTrack(0, false);
    }
  } catch (err) {
    console.error('Error loading playlist.json:', err);
  }

  function loadTrack(index, autoPlay = true) {
    if (!playlist[index]) return;
    currentIndex = index;
    const track = playlist[currentIndex];

    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;

    if (track.coverArt) {
      coverImg.src = track.coverArt;
      coverImg.classList.remove('hidden');
      coverPlaceholder.classList.add('hidden');
    } else {
      coverImg.classList.add('hidden');
      coverPlaceholder.classList.remove('hidden');
    }

    audio.src = track.path;
    audio.load();

    updateMediaSession(track);
    updateQueueHighlight();

    if (autoPlay) {
      playAudio();
    }
  }

  function playAudio() {
    audio.play().then(() => {
      isPlaying = true;
      playIcon.classList.add('hidden');
      pauseIcon.classList.remove('hidden');
      initVisualizer();
    }).catch(err => {
      console.warn('Playback error:', err);
    });
  }

  function pauseAudio() {
    audio.pause();
    isPlaying = false;
    playIcon.classList.remove('hidden');
    pauseIcon.classList.add('hidden');
  }

  btnPlayPause.addEventListener('click', () => {
    if (isPlaying) pauseAudio();
    else playAudio();
  });

  btnPrev.addEventListener('click', () => {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = playlist.length - 1;
    loadTrack(prevIndex, true);
  });

  btnNext.addEventListener('click', () => {
    nextTrack();
  });

  function nextTrack() {
    if (isShuffle && playlist.length > 1) {
      let randIndex;
      do {
        randIndex = Math.floor(Math.random() * playlist.length);
      } while (randIndex === currentIndex);
      loadTrack(randIndex, true);
      return;
    }

    let nextIndex = currentIndex + 1;
    if (nextIndex >= playlist.length) {
      if (repeatMode === 1) { // repeat all
        nextIndex = 0;
      } else {
        pauseAudio();
        return;
      }
    }
    loadTrack(nextIndex, true);
  }

  audio.addEventListener('ended', () => {
    if (repeatMode === 2) { // repeat one
      audio.currentTime = 0;
      playAudio();
    } else {
      nextTrack();
    }
  });

  audio.addEventListener('timeupdate', () => {
    if (!isNaN(audio.duration) && audio.duration > 0) {
      const pct = (audio.currentTime / audio.duration) * 100;
      seekSlider.value = pct;
      currentTimeEl.textContent = formatTime(audio.currentTime);
      durationTimeEl.textContent = formatTime(audio.duration);
    }
  });

  seekSlider.addEventListener('input', (e) => {
    if (!isNaN(audio.duration) && audio.duration > 0) {
      audio.currentTime = (e.target.value / 100) * audio.duration;
    }
  });

  volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
  });

  btnShuffle.addEventListener('click', () => {
    isShuffle = !isShuffle;
    btnShuffle.classList.toggle('active', isShuffle);
  });

  btnRepeat.addEventListener('click', () => {
    repeatMode = (repeatMode + 1) % 3;
    btnRepeat.classList.toggle('active', repeatMode > 0);
  });

  function renderQueue() {
    playlistQueue.innerHTML = '';
    playlist.forEach((track, i) => {
      const li = document.createElement('li');
      li.className = 'queue-item' + (i === currentIndex ? ' active' : '');
      li.innerHTML = `
        <div class="queue-item-left">
          <span class="queue-num">${i + 1}</span>
          <div>
            <div class="queue-title">${escapeHtml(track.title)}</div>
            <div class="queue-artist">${escapeHtml(track.artist)}</div>
          </div>
        </div>
      `;
      li.addEventListener('click', () => loadTrack(i, true));
      playlistQueue.appendChild(li);
    });
  }

  function updateQueueHighlight() {
    const items = playlistQueue.querySelectorAll('.queue-item');
    items.forEach((item, idx) => {
      item.classList.toggle('active', idx === currentIndex);
    });
  }

  function formatTime(sec) {
    if (isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function escapeHtml(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function updateMediaSession(track) {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.title,
        artist: track.artist,
        album: track.album,
        artwork: track.coverArt ? [{ src: track.coverArt }] : []
      });

      navigator.mediaSession.setActionHandler('play', playAudio);
      navigator.mediaSession.setActionHandler('pause', pauseAudio);
      navigator.mediaSession.setActionHandler('previoustrack', () => btnPrev.click());
      navigator.mediaSession.setActionHandler('nexttrack', () => btnNext.click());
    }
  }

  // Web Audio Visualizer Canvas
  let audioCtx, analyser, dataArray, visualizerInit = false;
  function initVisualizer() {
    if (visualizerInit || !canvas) return;
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioCtx.createMediaElementSource(audio);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      dataArray = new Uint8Array(analyser.frequencyBinCount);
      visualizerInit = true;
      drawVisualizer();
    } catch (e) {
      console.warn('AudioContext visualizer notice:', e);
    }
  }

  function drawVisualizer() {
    requestAnimationFrame(drawVisualizer);
    if (!analyser || !canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.clientWidth;
    const height = canvas.height = canvas.clientHeight;
    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, width, height);
    const barWidth = (width / dataArray.length) * 1.5;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
      const barHeight = (dataArray[i] / 255) * height * 0.8;
      ctx.fillStyle = `rgba(255, 255, 255, ${0.2 + (dataArray[i] / 255) * 0.6})`;
      ctx.fillRect(x, height - barHeight, barWidth - 2, barHeight);
      x += barWidth;
    }
  }
});