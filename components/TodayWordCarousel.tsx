'use client';

import React from "react";
import { WordItem } from "@/lib/words";

type Props = {
  scene: string;
  words: WordItem[];
  onRefresh: () => void;
};

const SWIPE_THRESHOLD = 60;

export default function TodayWordCarousel({
  scene,
  words,
  onRefresh,
}: Props) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const [startX, setStartX] = React.useState(0);
  const [deltaX, setDeltaX] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);

  const total = words.length;

  React.useEffect(() => {
    setActiveIndex(0);
  }, [scene, words.map((w) => w.text).join(",")]);

  const goNext = () => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const goPrev = () => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  // ===== 手势 =====
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    setDeltaX(currentX - startX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    if (deltaX < -SWIPE_THRESHOLD) {
      goNext();
    } else if (deltaX > SWIPE_THRESHOLD) {
      goPrev();
    }

    setDeltaX(0);
    setIsDragging(false);
  };

  const currentWord = words[activeIndex];

  return (
    <div className="rounded-[28px] bg-white p-5 shadow-sm md:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            今日推荐 · {scene}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            左右滑动切换，一次只带一个字
          </p>
        </div>

        <button
          onClick={onRefresh}
          className="rounded-full border px-4 py-2 text-sm"
        >
          换一组
        </button>
      </div>

      {/* 卡片区域 */}
      <div
        className="mt-6 overflow-hidden rounded-[28px] bg-gray-50"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(calc(${-activeIndex * 100}% + ${deltaX}px))`,
            transition: isDragging ? "none" : "transform 0.35s ease",
          }}
        >
          {words.map((word, index) => (
            <div
              key={word.text + index}
              className="w-full shrink-0 p-6"
            >
              <div className="flex h-[260px] flex-col items-center justify-center rounded-[24px] bg-white shadow-sm">
                <div className="text-8xl font-bold text-gray-900">
                  {word.text}
                </div>

                <div className="mt-4 text-sm text-gray-500">
                  今天先认识这个字
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 指示点 */}
      {total > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {words.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === activeIndex
                  ? "w-6 bg-black"
                  : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}

      {/* 按钮 */}
      {total > 1 && (
        <div className="mt-4 flex justify-center gap-3">
          <button
            onClick={goPrev}
            className="rounded-full bg-gray-100 px-4 py-2 text-sm"
          >
            上一张
          </button>
          <button
            onClick={goNext}
            className="rounded-full bg-gray-100 px-4 py-2 text-sm"
          >
            下一张
          </button>
        </div>
      )}
    </div>
  );
}