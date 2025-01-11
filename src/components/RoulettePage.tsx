import { useMemo, useRef, useState } from "react";
import { Textarea } from "@mantine/core";
import { generateSegmentsWithColor } from "../utils/rouletteColors";
import { Roulette, Segment } from "./Roulette";
import { Button } from "@mantine/core";

const spinDurationSeconds = 3;
const queryName = "segments";

export const RoulettePage = () => {
  const [rawSegments, setRawSegments] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get(queryName) || "選択肢1\n選択肢2\n選択肢3";
  });
  const segments = useMemo(() => {
    return generateSegmentsWithColor(rawSegments.split("\n").filter((s) => s));
  }, [rawSegments]);

  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selected, setSelected] = useState(false);
  const selectedShowElement = useRef<HTMLDivElement>(null);

  const spin = async () => {
    // 消す時は早めに
    setIsSpinning(true);
    selectedShowElement.current!.style.transition = "opacity 0.1s";
    await new Promise((resolve) => setTimeout(resolve, 100));

    // 見た目のための3回転 + ランダムな回転
    const newRotation = rotation + 360 * 3 + Math.floor(Math.random() * 360);
    setRotation(newRotation);

    // 出てくる時はゆっくり
    selectedShowElement.current!.style.transition = "opacity 0.5s";
    await new Promise((resolve) =>
      setTimeout(resolve, spinDurationSeconds * 1000)
    );
    setIsSpinning(false);
    setSelected(true);
  };

  const selectedSegment = useMemo<Segment | undefined>(() => {
    const normalizedRotation = rotation % 360;
    const segmentIndex =
      Math.floor(((360 - normalizedRotation) / 360) * segments.length) %
      segments.length;
    return segments[segmentIndex];
  }, [rotation, segments]);

  return (
    <div className="flex flex-col md:flex-row gap-x-6 gap-y-4">
      <div className="flex flex-col items-center">
        <div className="h-12 self-stretch">
          <div
            ref={selectedShowElement}
            className="flex justify-center text-lg font-bold p-1 rounded"
            style={{
              opacity: selected && !isSpinning && selectedSegment ? 1 : 0,
              backgroundColor: selectedSegment?.color,
            }}
          >
            {selectedSegment?.value}
          </div>
        </div>

        {segments.length === 0 ? (
          <p>選択肢を入力してください</p>
        ) : (
          <Roulette
            segments={segments}
            rotation={rotation}
            spinDurationSeconds={spinDurationSeconds}
          />
        )}
      </div>
      <div className="grow">
        <div className="mb-2 flex justify-center">
          <Button
            size="md"
            disabled={segments.length === 0 || isSpinning}
            onClick={spin}
          >
            スタート！
          </Button>
        </div>
        <Textarea
          value={rawSegments}
          label="選択肢"
          description="改行区切りで入力してください"
          placeholder={"選択肢1\n選択肢2\n選択肢3"}
          autosize
          minRows={5}
          onChange={(event) => {
            setRawSegments(event.currentTarget.value);
            setSelected(false);
          }}
          onBlur={() => {
            const params = new URLSearchParams();
            params.append(queryName, rawSegments);
            history.replaceState(null, "", `?${params.toString()}`);
          }}
        />
      </div>
    </div>
  );
};
