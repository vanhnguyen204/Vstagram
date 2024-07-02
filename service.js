import TrackPlayer, {
  TrackPlayerEvents,
  STATE_PLAYING,
  State,
  AppKilledPlaybackBehavior,
  Capability,
} from 'react-native-track-player';

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  } catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [Capability.Play, Capability.Pause],
      compactCapabilities: [Capability.Play, Capability.Pause],
      progressUpdateEventInterval: 2,
    });

    isSetup = true;
  } finally {
    return isSetup;
  }
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
async function startTrackPlayer(music) {
  console.log(music);
  await TrackPlayer.reset();
  await TrackPlayer.add({
    id: music._id,
    url: music.urlMedia,
    title: music.title,
    artist: music.artist,
    artwork: music.image,
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

export {playTrack, pauseTrack, stopTrack, resumeTrack, startTrackPlayer};
