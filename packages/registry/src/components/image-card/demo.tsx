import { ImageCard } from "./index";

export function ImageCardBasic() {
  return (
    <ImageCard
      className="max-w-sm"
      src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60"
      alt="Mountains at sunrise"
      title="Designing with landscape textures"
      description="How natural palettes shape calm interfaces."
      footer="6 min read"
    />
  );
}

export function ImageCardWithContent() {
  return (
    <ImageCard
      className="max-w-sm"
      src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=60"
      alt="A team collaborating around a table"
      title="Running effective design reviews"
      description="A short checklist for sharper feedback."
    >
      <p className="text-sm text-muted-foreground">
        Bring one decision per review and leave with a clear owner.
      </p>
    </ImageCard>
  );
}
