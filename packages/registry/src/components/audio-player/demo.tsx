import { AudioPlayer } from "./index";

const sample =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3";

export function AudioPlayerBasic() {
  return <AudioPlayer src={sample} title="Product walkthrough" artist="Veil team" />;
}

export function AudioPlayerMinimal() {
  return <AudioPlayer src={sample} className="max-w-xs" />;
}
