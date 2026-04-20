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

export default function SharePosterCard({
  childName,
  childAge,
  scene,
  childInterest,
  todayWords,
  onCopy,
}: SharePosterCardProps) {
  const safeName = childName.trim() || "孩子";
  const safeAge = childAge.trim() || "当前阶段";
  const safeInterest = childInterest.trim() || "兴趣主题";

  const posterRef = React.useRef<HTMLDivElement | null>(null);
  const [isExporting, setIsExporting] = React.useState(false);

  const handleExportImage = async () => {
    if (!posterRef.current) return;

    try {
        setIsExporting(true);

        const node = posterRef.current;
        const width = node.scrollWidth;
        const height = node.scrollHeight;

        const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 2,
        width,
        height,
        canvasWidth: width * 2,
        canvasHeight: height * 2,
        style: {
            margin: "0",
        },
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
    <div className="rounded-[32px] bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">分享卡海报版</h2>
          <p className="mt-1 text-sm text-gray-600">
            可直接截图，也可以一键导出 PNG。
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={onCopy}
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 shadow-sm hover:bg-gray-50"
          >
            复制配文
          </button>

          <button
            onClick={handleExportImage}
            disabled={isExporting}
            className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
          >
            {isExporting ? "导出中..." : "导出图片"}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div
            ref={posterRef}
            className="mx-auto w-[1080px] rounded-[32px] border border-rose-100 bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 p-8"
        >
            <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
                <div className="inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-rose-500 shadow-sm">
                今日识字分享卡
                </div>
                <h2 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
                {safeName} 今天这样识字
                </h2>
                <p className="mt-2 text-sm md:text-base text-gray-600">
                {safeAge} · 兴趣：{safeInterest} · 场景：{scene}
                </p>
            </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
            {todayWords.length > 0 ? (
                todayWords.map((word, index) => (
                <div
                    key={word.text + index}
                    className="rounded-[24px] bg-white/85 p-5 shadow-sm border border-white"
                >
                    <div className="flex items-center justify-between">
                    <div className="text-5xl font-bold text-gray-900">{word.text}</div>
                    <div className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-600">
                        今日带字
                    </div>
                    </div>

                    <div className="mt-5">
                    <div className="text-xs font-medium tracking-wide text-gray-400">
                        NATURAL SCRIPT
                    </div>
                    <div className="mt-2 text-base leading-7 text-gray-800">
                        {word.sentence}
                    </div>
                    </div>

                    <div className="mt-5 rounded-2xl bg-amber-50 px-4 py-3">
                    <div className="text-xs font-medium tracking-wide text-amber-600">
                        小提醒
                    </div>
                    <div className="mt-1 text-sm leading-6 text-gray-700">
                        {word.tips}
                    </div>
                    </div>
                </div>
                ))
            ) : (
                <div className="rounded-[24px] bg-white/85 p-5 shadow-sm border border-white text-sm text-gray-600 md:col-span-2">
                这个场景里的字已经都标记过啦，可以换个场景继续。
                </div>
            )}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="rounded-[24px] bg-white/80 p-4 shadow-sm">
                    <div className="text-xs font-medium text-gray-400">今天怎么做</div>
                    <div className="mt-2 text-sm leading-6 text-gray-700">
                    只顺手带 1–2 个字，不额外加任务。
                    </div>
                </div>

                <div className="rounded-[24px] bg-white/80 p-4 shadow-sm">
                    <div className="text-xs font-medium text-gray-400">最重要原则</div>
                    <div className="mt-2 text-sm leading-6 text-gray-700">
                    不测试，不追问，不要求重复读。
                    </div>
                </div>

                <div className="rounded-[24px] bg-white/80 p-4 shadow-sm">
                    <div className="text-xs font-medium text-gray-400">核心目标</div>
                    <div className="mt-2 text-sm leading-6 text-gray-700">
                    先保兴趣，再慢慢建立字和场景的连接。
                    </div>
                </div>
            </div>

            <div className="mt-6 rounded-[24px] bg-white/70 px-5 py-4 border border-white">
            <div className="text-xs font-medium tracking-wide text-gray-400">
                适合发小红书/朋友圈的说明
            </div>
            <div className="mt-2 text-sm leading-7 text-gray-700">
                我没有让孩子刷题，也没有每天规定必须认几个字。
                只是顺着他的兴趣和生活场景，把字自然地带进去。
                对这个阶段来说，先让孩子觉得“字是有意思的”，比记住多少更重要。
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}