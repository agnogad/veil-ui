import { VideoPlayer } from "./index";

const sample =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export function VideoPlayerBasic() {
  return (
    <VideoPlayer
      src={sample}
      poster="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=60"
      caption="A short clip of flowers in the wind."
    />
  );
}

export function VideoPlayerAutoPlay() {
  return (
    <VideoPlayer
      src={sample}
      muted
      autoPlay
      loop
      className="max-w-sm"
      caption="Muted looping background clip."
    />
  );
}
