import { Image } from "./index";

const photo =
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60";

export function ImageBasic() {
  return <Image src={photo} alt="A lake below snowy mountains" className="w-80" />;
}

export function ImageVideoRatio() {
  return (
    <Image
      src={photo}
      alt="A lake below snowy mountains"
      ratio="video"
      className="w-full max-w-md"
    />
  );
}
