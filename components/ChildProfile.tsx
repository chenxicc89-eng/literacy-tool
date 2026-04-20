type ChildProfileProps = {
  childName: string;
  childAge: string;
  childInterest: string;
  onNameChange: (value: string) => void;
  onAgeChange: (value: string) => void;
  onInterestChange: (value: string) => void;
};

const interestOptions = ["恐龙", "汽车", "火车", "飞机"];

export default function ChildProfile({
  childName,
  childAge,
  childInterest,
  onNameChange,
  onAgeChange,
  onInterestChange,
}: ChildProfileProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">孩子档案</h2>
      <p className="mt-2 text-sm text-gray-600">
        用来个性化推荐内容，也方便后面扩展成多孩子版本。
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            孩子名字
          </label>
          <input
            value={childName}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="比如：哥哥"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            年龄
          </label>
          <input
            value={childAge}
            onChange={(e) => onAgeChange(e.target.value)}
            placeholder="比如：3岁9个月"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            当前兴趣
          </label>
          <select
            value={childInterest}
            onChange={(e) => onInterestChange(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
          >
            {interestOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}