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
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-sm font-medium text-gray-500">今日可直接照着用</div>
          <h2 className="mt-2 text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
            今天你可以这样说
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-600 md:text-base">
            {safeName} · {safeAge} · {scene}场景
          </p>
        </div>

        <button
          onClick={onCopy}
          className="rounded-full border border-gray-200 bg-gray-50 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          复制今日话术
        </button>
      </div>

      <div className="mt-6 rounded-2xl bg-gray-50 p-4">
        <div className="text-sm font-medium text-gray-500">今天只带这 1–2 个字</div>

        <div className="mt-4 flex flex-wrap gap-3">
          {todayWords.length > 0 ? (
            todayWords.map((word) => (
              <div
                key={word.text}
                className="rounded-2xl bg-white px-5 py-4 shadow-sm"
              >
                <div className="text-4xl font-bold leading-none text-gray-900">
                  {word.text}
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm leading-6 text-gray-600">
              这个场景里的字已经都标记过啦，可以换个场景继续。
            </div>
          )}
        </div>
      </div>

      {todayWords.length > 0 && (
        <div className="mt-5 space-y-3">
          {todayWords.map((word, index) => (
            <div
              key={word.text + index}
              className="rounded-2xl border border-gray-200 p-4"
            >
              <div className="text-xs font-medium tracking-wide text-gray-400">
                你可以这样说
              </div>
              <div className="mt-2 text-lg leading-8 text-gray-900">
                {word.sentence}
              </div>
              <div className="mt-3 text-sm leading-6 text-gray-500">
                {word.tips}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 rounded-2xl bg-amber-50 p-4">
        <div className="text-xs font-medium tracking-wide text-amber-700">
          今天的原则
        </div>
        <div className="mt-2 text-sm leading-7 text-gray-700 md:text-base">
          说出来就结束，不测试，不追问，不要求孩子重复读。
        </div>
      </div>
    </div>
  );
}