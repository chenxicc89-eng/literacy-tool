'use client';

import React from "react";
import { toPng } from "html-to-image";
import { WordItem } from "@/lib/words";

type SharePosterCardProps = {
  childName: string;
  childAge: string;
  scene: string;
  childInterest: string;
  todayWords: WordItem[];
  onCopy: () => void;
};

type PosterContentProps = {
  childName: string;
  childAge: string;
  scene: string;
  childInterest: string;
  todayWords: WordItem[];
  mode?: "preview" | "export";
};

function getCoverTitle(interest: string, words: WordItem[]) {
  if (interest.trim()) {
    return `${interest}迷孩子\n我只带这2个字`;
  }

  if (words.length > 0) {
    return `今天我只带\n这2个字`;
  }

  return `今天这样带字`;
}

function PosterContent({
  childName,
  childAge,
  scene,
  childInterest,
  todayWords,
  mode = "preview",
}: PosterContentProps) {
  const safeName = childName.trim() || "孩子";
  const safeAge = childAge.trim() || "当前阶段";
  const title = getCoverTitle(childInterest, todayWords);
  const [line1, line2] = title.split("\n");
  const isExport = mode === "export";

  const wrapperClass = isExport
    ? "w-[1080px] rounded-[40px] border border-rose-100 bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 p-10"
    : "w-full rounded-[28px] border border-rose-100 bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 p-5 md:p-8";

  const bigTitleClass = isExport
    ? "mt-4 text-6xl font-extrabold leading-tight tracking-tight text-gray-900"
    : "mt-4 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-5xl";

  const wordClass = isExport
    ? "text-7xl font-bold text-gray-900"
    : "text-5xl font-bold text-gray-900";

  return (
    <div className={wrapperClass}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-rose-500 shadow-sm md:text-sm">
            今日识字分享卡
          </div>

          <div className={bigTitleClass}>
            <div>{line1}</div>
            {line2 && <div>{line2}</div>}
          </div>

          <div className="mt-3 text-sm leading-6 text-gray-600 md:text-base">
            {safeName} · {safeAge} · {scene}场景
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {todayWords.length > 0 ? (
          todayWords.slice(0, 2).map((word, index) => (
            <div
              key={word.text + index}
              className="rounded-[24px] border border-white bg-white/90 p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <div className={wordClass}>{word.text}</div>
                <div className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-600 md:text-sm">
                  今日带字
                </div>
              </div>

              <div className="mt-5 text-lg leading-8 text-gray-900 md:text-xl">
                {word.sentence}
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-[24px] border border-white bg-white/90 p-5 text-sm leading-6 text-gray-600 shadow-sm md:col-span-2">
            这个场景里的字已经都标记过啦，可以换个场景继续。
          </div>
        )}
      </div>

      <div className="mt-6 rounded-[24px] border border-white bg-white/75 px-5 py-4">
        <div className="text-sm leading-7 text-gray-700 md:text-base md:leading-8">
          我没有让孩子刷题，也没有每天规定必须认几个字。  
          只是顺着他的兴趣，把字自然地带进生活里。  
          对这个阶段来说，先让孩子觉得“字有意思”，比记住多少更重要。
        </div>
      </div>
    </div>
  );
}

export default function SharePosterCard({
  childName,
  childAge,
  scene,
  childInterest,
  todayWords,
  onCopy,
}: SharePosterCardProps) {
  const safeName = childName.trim() || "孩子";
  const exportRef = React.useRef<HTMLDivElement | null>(null);
  const [isExporting, setIsExporting] = React.useState(false);

  const handleExportImage = async () => {
    if (!exportRef.current) return;

    try {
      setIsExporting(true);

      const node = exportRef.current;
      const width = node.scrollWidth;
      const height = node.scrollHeight;

      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 2,
        width,
        height,
        canvasWidth: width * 2,
        canvasHeight: height * 2,
      });

      const link = document.createElement("a");
      link.download = `${safeName}-${scene}-识字分享卡.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("导出图片失败：", error);
      alert("导出失败，请重试");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <div className="rounded-3xl bg-white p-5 shadow-sm md:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">今日识字分享卡</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              这一块更适合截图、导出和发小红书，不用放太多解释。
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={onCopy}
              className="rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              复制配文
            </button>

            <button
              onClick={handleExportImage}
              disabled={isExporting}
              className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
            >
              {isExporting ? "导出中..." : "导出图片"}
            </button>
          </div>
        </div>

        <PosterContent
          childName={childName}
          childAge={childAge}
          scene={scene}
          childInterest={childInterest}
          todayWords={todayWords}
          mode="preview"
        />
      </div>

      <div
        style={{
          position: "fixed",
          left: "-99999px",
          top: 0,
          zIndex: -1,
          pointerEvents: "none",
        }}
      >
        <div ref={exportRef}>
          <PosterContent
            childName={childName}
            childAge={childAge}
            scene={scene}
            childInterest={childInterest}
            todayWords={todayWords}
            mode="export"
          />
        </div>
      </div>
    </>
  );
}