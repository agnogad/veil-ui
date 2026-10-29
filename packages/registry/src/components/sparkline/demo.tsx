import { Sparkline } from "./index";

const values = [12, 18, 14, 22, 20, 27, 25, 31, 29, 36];

export function SparklineBasic() {
  return <Sparkline data={values} label="Weekly revenue trend" />;
}

export function SparklineArea() {
  return (
    <Sparkline
      data={values}
      color="#22c55e"
      showArea
      label="Weekly sign-ups trend"
      className="h-10 w-40"
    />
  );
}
