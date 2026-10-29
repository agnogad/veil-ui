import { MediaPlayer } from "./index";

export function MediaPlayerBasic() {
  return (
    <MediaPlayer
      src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      poster="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=60"
      title="Spring in motion"
    />
  );
}

export function MediaPlayerAudio() {
  return (
    <MediaPlayer
      kind="audio"
      src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"
      title="Release notes"
      artist="Veil team"
    />
  );
}
