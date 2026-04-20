import { WordItem } from "@/lib/words";

type DailyScriptCardProps = {
  childName: string;
  childAge: string;
  scene: string;
  todayWords: WordItem[];
  onCopy: () => void;
};

export default function DailyScriptCard({
  childName,
  childAge,
  scene,
  todayWords,
  onCopy,
}: DailyScriptCardProps) {
  const safeName = childName.trim() || "孩子";
  const safeAge = childAge.trim() || "当前阶段";

  return (
    <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-sm border border-orange-100">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-sm font-medium text-orange-600">家长今日话术卡</div>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            {safeName} 的识字小卡片
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {safeAge} · 当前场景：{scene}
          </p>
        </div>

        <button
          onClick={onCopy}
          className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-50"
        >
          复制话术文案
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {todayWords.length > 0 ? (
          todayWords.map((word, index) => (
            <div
              key={word.text + index}
              className="rounded-2xl bg-white/80 p-5 border border-white shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="text-4xl font-bold text-gray-900">{word.text}</div>
                <div className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                  今日带字
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs font-medium text-gray-500">自然话术</div>
                <div className="mt-1 text-base text-gray-800 leading-7">
                  {word.sentence}
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs font-medium text-gray-500">小提醒</div>
                <div className="mt-1 text-sm text-gray-600 leading-6">
                  {word.tips}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl bg-white/80 p-5 border border-white text-sm text-gray-600">
            当前场景的字已经都标记过啦，可以换个场景继续。
          </div>
        )}
      </div>

      <div className="mt-6 rounded-2xl bg-white/70 p-4 border border-white">
        <div className="text-xs font-medium text-gray-500">使用原则</div>
        <div className="mt-2 text-sm leading-6 text-gray-700">
          今天只顺手带 1–2 个字，不测试、不要求重复读、不做成任务。只要在自然场景里说出来，就已经很好了。
        </div>
      </div>
    </div>
  );
}