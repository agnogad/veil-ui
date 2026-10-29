import { CircularProgress } from "./index";

export function CircularProgressBasic() {
  return <CircularProgress value={65} showValue />;
}

export function CircularProgressSizes() {
  return (
    <div className="flex items-center gap-4">
      <CircularProgress value={25} size={32} strokeWidth={3} />
      <CircularProgress value={50} size={48} showValue />
      <CircularProgress value={80} size={64} strokeWidth={5} showValue />
    </div>
  );
}
