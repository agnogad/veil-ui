import { VideoThumbnail } from "./index";

export function VideoThumbnailBasic() {
  return (
    <VideoThumbnail
      src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=60"
      title="How tokens power theming"
      duration="4:12"
    />
  );
}

export function VideoThumbnailGrid() {
  return (
    <div className="grid max-w-xl gap-4 sm:grid-cols-2">
      <VideoThumbnail
        src="https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=600&q=60"
        title="Building accessible forms"
        duration="8:03"
      />
      <VideoThumbnail
        src="https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=crop&w=600&q=60"
        title="Designing with motion"
        duration="5:47"
      />
    </div>
  );
}
