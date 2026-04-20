'use client';

import React from "react";
import SceneTabs from "@/components/SceneTabs";
import WordCard from "@/components/WordCard";
import ChildProfile from "@/components/ChildProfile";
import DailyScriptCard from "@/components/DailyScriptCard";
import SharePosterCard from "@/components/SharePosterCard";
import TodayWordCarousel from "@/components/TodayWordCarousel";
import AppHeader from "@/components/AppHeader";
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
  const [scene, setScene] = React.useState<string>("恐龙");
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

  const refreshTodayWords = () => {
    const unknownWords = currentWords.filter((word) => !knownWords.includes(word.text));
    if (unknownWords.length <= 1) return;

    setSceneRotationIndex((prev) => ({
      ...prev,
      [scene]: ((prev[scene] ?? 0) + 1) % unknownWords.length,
    }));
  };

  const resetKnownWords = () => {
    const confirmed = window.confirm("确定要清空所有已掌握记录吗？");
    if (!confirmed) return;
    setKnownWords([]);
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
        ? `今日识字话术
孩子：${safeName}
年龄：${safeAge}
场景：${scene}

${todayWords
  .map(
    (word, index) =>
      `${index + 1}. 字：${word.text}
话术：${word.sentence}
提醒：${word.tips}`
  )
  .join("\n\n")}

今天只顺手带 1–2 个字，不测试、不追问。`
        : `今日识字话术
孩子：${safeName}
年龄：${safeAge}
场景：${scene}

这个场景里的字已经都标记过啦，可以换个场景继续。`;

    try {
      await navigator.clipboard.writeText(content);
      alert("已复制今日话术");
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
    <div className="min-h-screen bg-[#f6f7f9] pb-24">
      <div className="mx-auto max-w-5xl px-4 py-4 md:px-6 md:py-6">
        {/* App Header */}
        <AppHeader
          childName={childName}
          childAge={childAge}
          childInterest={childInterest}
          knownCount={knownWords.length}
          onResetProfile={resetProfile}
          onResetKnown={resetKnownWords}
          onResetRotation={resetRotation}
        />

        {/* 孩子档案 */}
        <div className="mt-6">
          <ChildProfile
            childName={childName}
            childAge={childAge}
            childInterest={childInterest}
            onNameChange={setChildName}
            onAgeChange={setChildAge}
            onInterestChange={setChildInterest}
          />
        </div>

        {/* 场景切换 */}
        <div className="mt-6">
          <SceneTabs
            sceneNames={sceneNames}
            currentScene={scene}
            icons={sceneIcons}
            counts={sceneCounts}
            onChange={setScene}
          />
        </div>

        {/* 今日推荐轮播 */}
        <div className="mt-6">
          <TodayWordCarousel
            scene={scene}
            words={todayWords}
            onRefresh={refreshTodayWords}
          />
        </div>

        {/* 今日这样说 */}
        <div className="mt-6">
          <DailyScriptCard
            childName={childName}
            childAge={childAge}
            scene={scene}
            todayWords={todayWords}
            onCopy={handleCopyScript}
          />
        </div>

        {/* 分享卡 */}
        <div className="mt-6">
          <SharePosterCard
            childName={childName}
            childAge={childAge}
            scene={scene}
            childInterest={childInterest}
            todayWords={todayWords}
            onCopy={handleCopyScript}
          />
        </div>

        {/* 字卡列表 */}
        <div className="mt-6 rounded-[28px] bg-white p-5 shadow-sm md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                全部字卡 · {scene}
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                这里更像字库，适合你快速切场景和标记已掌握。
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4">
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
            <div className="mt-4 rounded-2xl bg-gray-50 p-5 text-sm leading-6 text-gray-600">
              当前场景下未掌握的字已经没有了。
            </div>
          )}
        </div>
      </div>

      {/* 底部主操作 */}
      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        <a
          href="/landing"
          className="block rounded-full bg-black px-6 py-4 text-center text-sm font-medium text-white shadow-lg"
        >
          👉 预览引流页
        </a>
      </div>
    </div>
  );
}