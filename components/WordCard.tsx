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
    <div className="rounded-2xl border border-gray-200 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-4xl font-bold text-gray-900">{word.text}</div>
          <div className="mt-2 text-sm text-gray-700">{word.sentence}</div>
        </div>

        <button
          onClick={() => onToggleKnown(word.text)}
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            isKnown ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
          }`}
        >
          {isKnown ? "已掌握" : "标记会了"}
        </button>
      </div>

      <div className="mt-3 text-xs leading-5 text-gray-500">{word.tips}</div>
    </div>
  );
}