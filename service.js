import TrackPlayer, {
  TrackPlayerEvents,
  STATE_PLAYING,
  State,
} from 'react-native-track-player';

async function setupTrackPlayer() {
  await TrackPlayer.setupPlayer();

  TrackPlayer.addEventListener(TrackPlayerEvents.PLAYBACK_STATE, ({state}) => {
    console.log('Playback state changed:', state);
  });

  TrackPlayer.addEventListener(TrackPlayerEvents.REMOTE_STOP, () => {
    console.log('Remote stop event received');
    TrackPlayer.destroy(); // Xóa player khi cần thiết
  });

  TrackPlayer.addEventListener(TrackPlayerEvents.REMOTE_PLAY, () => {
    console.log('Remote play event received');
    TrackPlayer.play(); // Play khi nhận được lệnh từ remote
  });

  TrackPlayer.addEventListener(TrackPlayerEvents.REMOTE_PAUSE, () => {
    console.log('Remote pause event received');
    TrackPlayer.pause(); // Pause khi nhận được lệnh từ remote
  });
}

// Hàm play track từ một URL
async function playTrack(url) {
  await TrackPlayer.reset(); // Đặt lại player trước khi phát track mới

  await TrackPlayer.add({
    id: 'trackId', // ID của track
    url: url, // URL của track
    title: 'Track Title', // Tiêu đề của track
    artist: 'Artist Name', // Tên nghệ sĩ (tùy chọn)
    artwork: '',
  });

  await TrackPlayer.play(); // Phát track

  await TrackPlayer.updateOptions({
    stopWithApp: true, // Dừng player khi ứng dụng bị dừng
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_STOP,
    ],
  });
}

// Hàm pause track
async function pauseTrack() {
  await TrackPlayer.pause();
}
async function resumeTrack() {
  const state = await TrackPlayer.getState();
  if (state === State.Paused) {
    await TrackPlayer.play();
  }
}

// Hàm xóa track
async function stopTrack() {
  await TrackPlayer.reset();
}

export {setupTrackPlayer, playTrack, pauseTrack, stopTrack, resumeTrack};
