'use client';

import React from "react";
import SceneTabs from "@/components/SceneTabs";
import WordCard from "@/components/WordCard";
import ChildProfile from "@/components/ChildProfile";
import DailyScriptCard from "@/components/DailyScriptCard";
import SharePosterCard from "@/components/SharePosterCard";
import { scenes } from "@/lib/words";

const KNOWN_WORDS_STORAGE_KEY = "literacy-tool-known-words";
const SCENE_ROTATION_STORAGE_KEY = "literacy-tool-scene-rotation-index";
const CHILD_PROFILE_STORAGE_KEY = "literacy-tool-child-profile";

type SceneRotationMap = Record<string, number>;

type ChildProfileData = {
  childName: string;
  childAge: string;
  childInterest: string;
};

export default function Page() {
  const [scene, setScene] = React.useState<string>("吃饭");
  const [knownWords, setKnownWords] = React.useState<string[]>([]);
  const [showOnlyUnknown, setShowOnlyUnknown] = React.useState(false);
  const [sceneRotationIndex, setSceneRotationIndex] = React.useState<SceneRotationMap>({});
  const [hasMounted, setHasMounted] = React.useState(false);

  const [childName, setChildName] = React.useState("哥哥");
  const [childAge, setChildAge] = React.useState("3岁9个月");
  const [childInterest, setChildInterest] = React.useState("恐龙");

  React.useEffect(() => {
    setHasMounted(true);

    try {
      const savedKnownWords = localStorage.getItem(KNOWN_WORDS_STORAGE_KEY);
      if (savedKnownWords) {
        const parsed = JSON.parse(savedKnownWords);
        if (Array.isArray(parsed)) {
          setKnownWords(parsed);
        }
      }

      const savedRotation = localStorage.getItem(SCENE_ROTATION_STORAGE_KEY);
      if (savedRotation) {
        const parsed = JSON.parse(savedRotation);
        if (parsed && typeof parsed === "object") {
          setSceneRotationIndex(parsed);
        }
      }

      const savedProfile = localStorage.getItem(CHILD_PROFILE_STORAGE_KEY);
      if (savedProfile) {
        const parsed: Partial<ChildProfileData> = JSON.parse(savedProfile);
        if (parsed.childName) setChildName(parsed.childName);
        if (parsed.childAge) setChildAge(parsed.childAge);
        if (parsed.childInterest) setChildInterest(parsed.childInterest);
      }
    } catch (error) {
      console.error("读取本地数据失败：", error);
    }
  }, []);

  React.useEffect(() => {
    if (!hasMounted) return;

    try {
      localStorage.setItem(KNOWN_WORDS_STORAGE_KEY, JSON.stringify(knownWords));
    } catch (error) {
      console.error("保存已掌握字失败：", error);
    }
  }, [knownWords, hasMounted]);

  React.useEffect(() => {
    if (!hasMounted) return;

    try {
      localStorage.setItem(
        SCENE_ROTATION_STORAGE_KEY,
        JSON.stringify(sceneRotationIndex)
      );
    } catch (error) {
      console.error("保存场景轮换进度失败：", error);
    }
  }, [sceneRotationIndex, hasMounted]);

  React.useEffect(() => {
    if (!hasMounted) return;

    try {
      localStorage.setItem(
        CHILD_PROFILE_STORAGE_KEY,
        JSON.stringify({
          childName,
          childAge,
          childInterest,
        })
      );
    } catch (error) {
      console.error("保存孩子档案失败：", error);
    }
  }, [childName, childAge, childInterest, hasMounted]);

  React.useEffect(() => {
    if (Object.keys(scenes).includes(childInterest)) {
      setScene(childInterest);
    }
  }, [childInterest]);

  const currentWords = scenes[scene].words;

  const visibleWords = showOnlyUnknown
    ? currentWords.filter((word) => !knownWords.includes(word.text))
    : currentWords;

  const getTodayWords = () => {
    const unknownWords = currentWords.filter((word) => !knownWords.includes(word.text));

    if (unknownWords.length === 0) return [];
    if (unknownWords.length <= 2) return unknownWords;

    const currentIndex = sceneRotationIndex[scene] ?? 0;
    const normalizedIndex = currentIndex % unknownWords.length;

    const firstWord = unknownWords[normalizedIndex];
    const secondWord = unknownWords[(normalizedIndex + 1) % unknownWords.length];

    return [firstWord, secondWord];
  };

  const todayWords = getTodayWords();

  const toggleKnown = (text: string) => {
    setKnownWords((prev) =>
      prev.includes(text)
        ? prev.filter((item) => item !== text)
        : [...prev, text]
    );
  };

  const resetKnownWords = () => {
    const confirmed = window.confirm("确定要清空所有已掌握记录吗？");
    if (!confirmed) return;
    setKnownWords([]);
  };

  const refreshTodayWords = () => {
    const unknownWords = currentWords.filter((word) => !knownWords.includes(word.text));
    if (unknownWords.length <= 1) return;

    setSceneRotationIndex((prev) => ({
      ...prev,
      [scene]: ((prev[scene] ?? 0) + 1) % unknownWords.length,
    }));
  };

  const resetRotation = () => {
    setSceneRotationIndex({});
  };

  const resetProfile = () => {
    const confirmed = window.confirm("确定要重置孩子档案吗？");
    if (!confirmed) return;

    setChildName("哥哥");
    setChildAge("3岁9个月");
    setChildInterest("恐龙");
  };

  const handleCopyScript = async () => {
    const safeName = childName.trim() || "孩子";
    const safeAge = childAge.trim() || "当前阶段";

    const content =
      todayWords.length > 0
        ? `今日识字话术卡
孩子：${safeName}
年龄：${safeAge}
场景：${scene}

${todayWords
  .map(
    (word, index) =>
      `${index + 1}. 带字：${word.text}
话术：${word.sentence}
提醒：${word.tips}`
  )
  .join("\n\n")}

使用原则：
今天只顺手带 1–2 个字，不测试、不要求重复读、不做成任务。`
        : `今日识字话术卡
孩子：${safeName}
年龄：${safeAge}
场景：${scene}

这个场景里的字已经都标记过啦，可以换个场景继续。`;

    try {
      await navigator.clipboard.writeText(content);
      alert("已复制今日话术文案");
    } catch (error) {
      console.error("复制失败：", error);
      alert("复制失败，请手动复制");
    }
  };

  const sceneNames = Object.keys(scenes);
  const sceneIcons = Object.fromEntries(
    sceneNames.map((name) => [name, scenes[name].icon])
  );
  const sceneCounts = Object.fromEntries(
    sceneNames.map((name) => [name, scenes[name].words.length])
  );

  const greetingName = childName.trim() || "孩子";
  const greetingAge = childAge.trim() || "当前阶段";
  const greetingInterest = childInterest.trim() || "兴趣主题";

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">识字小工具（MVP）</h1>
          <p className="mt-2 text-sm text-gray-600">
            给 {greetingName} 用的轻量识字助手 · {greetingAge} · 当前兴趣：{greetingInterest}
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <div className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700">
              已标记会了：{knownWords.length} 个字
            </div>

            <button
              onClick={() => setShowOnlyUnknown((prev) => !prev)}
              className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {showOnlyUnknown ? "显示全部字" : "只看未掌握"}
            </button>

            <button
              onClick={resetKnownWords}
              className="rounded-full border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              清空记录
            </button>

            <button
              onClick={resetRotation}
              className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              重置推荐顺序
            </button>

            <button
              onClick={resetProfile}
              className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              重置孩子档案
            </button>
          </div>
        </div>

        <div className="mb-6">
          <ChildProfile
            childName={childName}
            childAge={childAge}
            childInterest={childInterest}
            onNameChange={setChildName}
            onAgeChange={setChildAge}
            onInterestChange={setChildInterest}
          />
        </div>

        <div className="mb-6 space-y-6">
          <DailyScriptCard
            childName={childName}
            childAge={childAge}
            scene={scene}
            todayWords={todayWords}
            onCopy={handleCopyScript}
          />

          <SharePosterCard
            childName={childName}
            childAge={childAge}
            scene={scene}
            childInterest={childInterest}
            todayWords={todayWords}
            onCopy={handleCopyScript}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <SceneTabs
            sceneNames={sceneNames}
            currentScene={scene}
            icons={sceneIcons}
            counts={sceneCounts}
            onChange={setScene}
          />

          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    今日推荐 · {scene}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    更适合 {greetingName} 现在这个阶段的轻量推荐，一次 1–2 个字就够。
                  </p>
                </div>

                <button
                  onClick={refreshTodayWords}
                  className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  换一组推荐
                </button>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {todayWords.length > 0 ? (
                  todayWords.map((word) => (
                    <div key={word.text} className="rounded-xl bg-gray-50 p-4">
                      <div className="text-3xl font-bold text-gray-900">
                        {word.text}
                      </div>
                      <div className="mt-2 text-sm text-gray-700">
                        {word.sentence}
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        {word.tips}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
                    这个场景里的字已经都标记过啦，可以换个场景继续。
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                全部字卡 · {scene}
              </h2>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {visibleWords.map((word) => (
                  <WordCard
                    key={word.text}
                    word={word}
                    isKnown={knownWords.includes(word.text)}
                    onToggleKnown={toggleKnown}
                  />
                ))}
              </div>

              {visibleWords.length === 0 && (
                <div className="mt-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
                  当前场景下未掌握的字已经没有了。
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}