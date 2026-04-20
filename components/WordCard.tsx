import { WordItem } from "@/lib/words";

type WordCardProps = {
  word: WordItem;
  isKnown: boolean;
  onToggleKnown: (text: string) => void;
};

export default function WordCard({
  word,
  isKnown,
  onToggleKnown,
}: WordCardProps) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-5xl font-bold leading-none text-gray-900">
            {word.text}
          </div>

          <div className="mt-4 text-base leading-7 text-gray-800">
            {word.sentence}
          </div>
        </div>

        <button
          onClick={() => onToggleKnown(word.text)}
          className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition ${
            isKnown
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {isKnown ? "已掌握" : "标记会了"}
        </button>
      </div>

      <div className="mt-4 rounded-2xl bg-gray-50 p-4">
        <div className="text-xs font-medium tracking-wide text-gray-400">
          小提醒
        </div>
        <div className="mt-2 text-sm leading-6 text-gray-500">
          {word.tips}
        </div>
      </div>
    </div>
  );
}