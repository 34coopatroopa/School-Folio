type Props = {
  tone: "ink" | "paper";
  alpha: number;
};

export default function GridOverlay({ tone, alpha }: Props) {
  const rgb = tone === "ink" ? "242,240,236" : "19,18,17";
  return (
    <div
      className="gridOverlay"
      aria-hidden="true"
      style={{
        backgroundImage: `repeating-linear-gradient(to right, rgba(${rgb},${alpha}) 0 1px, transparent 1px 12.5%)`,
      }}
    />
  );
}
