import { useViewportSize } from "@mantine/hooks";
import { useMemo } from "react";

export type Segment = {
  value: string;
  color: string;
};

type Props = {
  segments: Segment[];
  rotation: number;
  spinDurationSeconds: number;
};

export const Roulette = ({
  segments,
  rotation,
  spinDurationSeconds,
}: Props) => {
  const { width } = useViewportSize();

  const segmentCount = segments.length;
  const rotationPerSegment = 360 / segmentCount;
  const size = useMemo(() => (width > 420 ? 384 : 300), [width]);

  return (
    <div className="relative">
      <div
        className="overflow-hidden p-1"
        style={{ width: size + 8, height: size + 18 }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`-${size / 2} -${size / 2} ${size} ${size}`}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: `transform ${spinDurationSeconds}s ease-out`,
            filter: "drop-shadow(0 0 2px rgba(0, 0, 0, 0.8))",
          }}
        >
          {segments.map((segment, index) => {
            const rotation = index * rotationPerSegment - 90;
            return (
              <g key={index} transform={`rotate(${rotation})`}>
                <path
                  d={`
                M0 0
                L${size / 2} 0
                A${size / 2} ${size / 2} 0 ${rotationPerSegment > 180 ? 1 : 0} 1
                ${(Math.cos((rotationPerSegment * Math.PI) / 180) * size) / 2}
                ${(Math.sin((rotationPerSegment * Math.PI) / 180) * size) / 2}
                Z
              `}
                  fill={segment.color}
                />
                <text
                  x={`${size / 3 - 8}`}
                  y="8"
                  textAnchor="middle"
                  transform={`rotate(${rotationPerSegment / 2})`}
                  fill="#000"
                >
                  {segment.value.slice(0, 15)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <span
        className="absolute"
        style={{
          top: "-12px",
          right: size / 2 - 8,
          filter: "drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5))",
        }}
      >
        <div
          className="h-8 w-6 bg-red-500"
          style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
        />
      </span>
    </div>
  );
};
