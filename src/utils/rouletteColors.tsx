const baseColors = [
  "#f87171", // red
  "#fde047", // yellow
  "#4ade80", // green
  "#38bdf8", // sky
  "#c084fc", // purple
  "#f472b6", // pink
  "#fb923c", // orange
  "#a3e635", // lime
  "#22d3ee", // cyan
  "#a78bfa", // violet
  "#fb7185", // rose
  "#60a5fa", // blue
];

export const generateSegmentsWithColor = (values: string[]) => {
  return values
    .map((value, i) => {
      return {
        value,
        color: baseColors[i % baseColors.length],
      };
    })
    .map((segment, i) => {
      // 繰り返しの境界で色が被らないようにする
      if (i === values.length - 1 && segment.color === baseColors[0]) {
        return { value: segment.value, color: baseColors[1] };
      } else {
        return segment;
      }
    });
};
