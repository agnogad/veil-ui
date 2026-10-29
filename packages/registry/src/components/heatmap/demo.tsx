import { Heatmap } from "./index";

const data = [
  [2, 4, 6, 8, 5, 3, 1],
  [3, 6, 9, 12, 8, 4, 2],
  [1, 3, 5, 7, 9, 6, 2],
  [4, 7, 10, 14, 11, 6, 3],
];

export function HeatmapBasic() {
  return (
    <Heatmap
      className="max-w-xl"
      data={data}
      rows={["Mon", "Tue", "Wed", "Thu"]}
      columns={["00", "04", "08", "12", "16", "20", "24"]}
      label="Requests by hour"
    />
  );
}

export function HeatmapCustomMax() {
  return (
    <Heatmap
      className="max-w-md"
      data={data}
      rows={["Mon", "Tue", "Wed", "Thu"]}
      columns={["00", "04", "08", "12", "16", "20", "24"]}
      max={20}
      label="Requests by hour, scaled to 20"
    />
  );
}
