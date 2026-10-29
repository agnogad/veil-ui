import { ScatterChart } from "./index";

const points = [
  { x: 12, y: 24, z: 120 },
  { x: 18, y: 31, z: 80 },
  { x: 24, y: 28, z: 150 },
  { x: 31, y: 42, z: 90 },
  { x: 38, y: 39, z: 200 },
  { x: 45, y: 52, z: 110 },
  { x: 52, y: 48, z: 170 },
];

export function ScatterChartBasic() {
  return (
    <ScatterChart
      data={points}
      xLabel="Hours"
      yLabel="Output"
      className="max-w-xl"
    />
  );
}

export function ScatterChartDense() {
  return (
    <ScatterChart
      data={points}
      xLabel="Sessions"
      yLabel="Conversions"
      color="#22c55e"
      height={220}
      className="max-w-md"
    />
  );
}
