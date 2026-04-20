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

const EXPORT_WIDTH = 1080;
const EXPORT_HEIGHT = 1440;

function getSceneEmoji(scene: string) {
  const map: Record<string, string> = {
    恐龙: "🦖",
    火车: "🚂",
    飞机: "✈️",
    吃饭: "🍚",
    日常: "🏠",
  };
  return map[scene] || "✨";
}

function getThemeText(childInterest: string, scene: string) {
  const text = childInterest.trim() || scene.trim() || "今日主题";
  return `${text}主题`;
}

function getCoverHook(childInterest: string, scene: string) {
  const text = childInterest.trim() || scene.trim() || "兴趣";
  return `${text}迷孩子`;
}

function PreviewPoster({
  childName,
  childAge,
  scene,
  childInterest,
  todayWords,
}: {
  childName: string;
  childAge: string;
  scene: string;
  childInterest: string;
  todayWords: WordItem[];
}) {
  const safeName = childName.trim() || "孩子";
  const safeAge = childAge.trim() || "当前阶段";
  const themeText = getThemeText(childInterest, scene);
  const hookText = getCoverHook(childInterest, scene);
  const words = todayWords.slice(0, 2);

  return (
    <div className="w-full rounded-[28px] bg-[#fff7f3] p-5 md:p-6">
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-400 md:text-sm">识字打卡图</div>
        <div className="text-xs text-gray-400 md:text-sm">
          {getSceneEmoji(scene)} {themeText}
        </div>
      </div>

      <div className="mt-5 text-lg font-semibold text-rose-500 md:text-2xl">
        {hookText}
      </div>

      <div className="mt-2 text-3xl font-extrabold leading-[1.08] text-[#0f172a] md:text-5xl">
        <div>今天陪娃带了</div>
        <div>这2个字</div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <div className="rounded-full bg-white px-3 py-1 text-xs text-gray-600 shadow-sm md:text-sm">
          {safeName}
        </div>
        <div className="rounded-full bg-white px-3 py-1 text-xs text-gray-600 shadow-sm md:text-sm">
          {safeAge}
        </div>
        <div className="rounded-full bg-white px-3 py-1 text-xs text-gray-600 shadow-sm md:text-sm">
          不刷题
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:gap-4">
        {words.length > 0 ? (
          words.map((word) => (
            <div
              key={word.text}
              className="rounded-[24px] bg-white p-4 shadow-sm md:p-5"
            >
              <div className="text-center text-6xl font-bold leading-none text-[#0f172a] md:text-8xl">
                {word.text}
              </div>
              <div className="mt-3 text-center text-sm leading-6 text-gray-700 md:text-lg md:leading-8">
                {word.sentence}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 rounded-[24px] bg-white p-4 text-sm leading-6 text-gray-600 shadow-sm">
            这个场景里的字已经都标记过啦，可以换个场景继续。
          </div>
        )}
      </div>

      <div className="mt-5 rounded-[22px] bg-white p-4 shadow-sm md:p-5">
        <div className="text-sm leading-7 text-gray-700 md:text-lg md:leading-8">
          今天只是顺手说了这两句。
        </div>
      </div>
    </div>
  );
}

function ExportPoster({
  childName,
  childAge,
  scene,
  childInterest,
  todayWords,
}: {
  childName: string;
  childAge: string;
  scene: string;
  childInterest: string;
  todayWords: WordItem[];
}) {
  const safeName = childName.trim() || "孩子";
  const safeAge = childAge.trim() || "当前阶段";
  const themeText = getThemeText(childInterest, scene);
  const hookText = getCoverHook(childInterest, scene);
  const words = todayWords.slice(0, 2);

  const fontFamily =
    '-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", "Segoe UI", sans-serif';

  return (
    <div
      style={{
        width: EXPORT_WIDTH,
        height: EXPORT_HEIGHT,
        background: "#fff7f3",
        borderRadius: 44,
        position: "relative",
        overflow: "hidden",
        fontFamily,
        color: "#0f172a",
      }}
    >
      {/* 顶部轻信息 */}
      <div
        style={{
          position: "absolute",
          left: 52,
          top: 48,
          fontSize: 24,
          lineHeight: "32px",
          color: "#9ca3af",
          fontWeight: 500,
        }}
      >
        识字打卡图
      </div>

      <div
        style={{
          position: "absolute",
          right: 52,
          top: 48,
          fontSize: 24,
          lineHeight: "32px",
          color: "#9ca3af",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          gap: 8,
          whiteSpace: "nowrap",
        }}
      >
        <span>{getSceneEmoji(scene)}</span>
        <span>{themeText}</span>
      </div>

      {/* 钩子 */}
      <div
        style={{
          position: "absolute",
          left: 52,
          top: 110,
          fontSize: 56,
          lineHeight: "68px",
          color: "#df6b72",
          fontWeight: 700,
          letterSpacing: "-1px",
        }}
      >
        {hookText}
      </div>

      {/* 主标题 */}
      <div
        style={{
          position: "absolute",
          left: 52,
          top: 190,
          width: 780,
        }}
      >
        <div
          style={{
            fontSize: 92,
            lineHeight: "100px",
            fontWeight: 800,
            color: "#0f172a",
            letterSpacing: "-2px",
          }}
        >
          今天陪娃带了
        </div>
        <div
          style={{
            marginTop: 4,
            fontSize: 92,
            lineHeight: "100px",
            fontWeight: 800,
            color: "#0f172a",
            letterSpacing: "-2px",
          }}
        >
          这2个字
        </div>
      </div>

      {/* 标签 */}
      <div
        style={{
          position: "absolute",
          left: 52,
          top: 420,
          display: "flex",
          gap: 14,
        }}
      >
        {[safeName, safeAge, "不刷题"].map((item) => (
          <div
            key={item}
            style={{
              background: "#ffffff",
              borderRadius: 999,
              padding: "12px 24px",
              fontSize: 26,
              lineHeight: "32px",
              color: "#4b5563",
              boxShadow: "0 2px 8px rgba(15, 23, 42, 0.06)",
              whiteSpace: "nowrap",
            }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* 两个字主视觉 */}
      {words.length > 0 ? (
        <>
          {words.map((word, index) => {
            const left = index === 0 ? 52 : 548;
            return (
              <div
                key={word.text}
                style={{
                  position: "absolute",
                  top: 530,
                  left,
                  width: 480,
                  height: 470,
                  background: "#ffffff",
                  borderRadius: 32,
                  boxShadow: "0 4px 16px rgba(15, 23, 42, 0.06)",
                  padding: 36,
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    fontSize: 190,
                    lineHeight: "190px",
                    fontWeight: 700,
                    color: "#0f172a",
                    textAlign: "center",
                    marginTop: 30,
                    letterSpacing: "-4px",
                  }}
                >
                  {word.text}
                </div>

                <div
                  style={{
                    marginTop: 54,
                    fontSize: 34,
                    lineHeight: "46px",
                    color: "#374151",
                    textAlign: "center",
                    wordBreak: "break-word",
                  }}
                >
                  {word.sentence}
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div
          style={{
            position: "absolute",
            left: 52,
            top: 530,
            width: 976,
            height: 470,
            background: "#ffffff",
            borderRadius: 32,
            boxShadow: "0 4px 16px rgba(15, 23, 42, 0.06)",
            padding: 40,
            boxSizing: "border-box",
            fontSize: 32,
            lineHeight: "48px",
            color: "#6b7280",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          这个场景里的字已经都标记过啦，可以换个场景继续。
        </div>
      )}

      {/* 底部轻文案 */}
      <div
        style={{
          position: "absolute",
          left: 52,
          right: 52,
          top: 1060,
          height: 150,
          background: "#ffffff",
          borderRadius: 28,
          boxShadow: "0 4px 16px rgba(15, 23, 42, 0.06)",
          padding: "0 40px",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 34,
            lineHeight: "48px",
            color: "#374151",
          }}
        >
          今天只是顺手说了这两句。
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
  const exportRef = React.useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = React.useState(false);

  const handleExport = async () => {
    if (!exportRef.current) return;

    try {
      setIsExporting(true);

      const dataUrl = await toPng(exportRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        width: EXPORT_WIDTH,
        height: EXPORT_HEIGHT,
        canvasWidth: EXPORT_WIDTH * 2,
        canvasHeight: EXPORT_HEIGHT * 2,
        backgroundColor: "#fff7f3",
      });

      const link = document.createElement("a");
      link.download = "识字打卡.png";
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
      <div className="rounded-[28px] bg-white p-5 shadow-sm md:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">识字打卡图</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              适合保存后直接发小红书
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={onCopy}
              className="rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              复制文案
            </button>

            <button
              onClick={handleExport}
              disabled={isExporting}
              className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
            >
              {isExporting ? "导出中..." : "导出图片"}
            </button>
          </div>
        </div>

        <PreviewPoster
          childName={childName}
          childAge={childAge}
          scene={scene}
          childInterest={childInterest}
          todayWords={todayWords}
        />

        <div className="mt-4 text-center text-xs text-gray-400">
          保存后可直接发小红书
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          left: "-99999px",
          top: 0,
          pointerEvents: "none",
        }}
      >
        <div ref={exportRef}>
          <ExportPoster
            childName={childName}
            childAge={childAge}
            scene={scene}
            childInterest={childInterest}
            todayWords={todayWords}
          />
        </div>
      </div>
    </>
  );
}