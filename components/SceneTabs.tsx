type SceneTabsProps = {
  sceneNames: string[];
  currentScene: string;
  icons: Record<string, string>;
  counts: Record<string, number>;
  onChange: (scene: string) => void;
};

export default function SceneTabs({
  sceneNames,
  currentScene,
  icons,
  counts,
  onChange,
}: SceneTabsProps) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm md:p-6">
      <div className="mb-3">
        <h2 className="text-xl font-semibold text-gray-900">选择场景</h2>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          手机上可左右滑动，按孩子兴趣切换更自然。
        </p>
      </div>

      <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
        {sceneNames.map((name) => {
          const active = currentScene === name;

          return (
            <button
              key={name}
              onClick={() => onChange(name)}
              className={`shrink-0 rounded-2xl px-4 py-3 text-left transition ${
                active
                  ? "bg-black text-white shadow-sm"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="text-base">{icons[name]}</span>
                <span>{name}</span>
              </div>

              <div
                className={`mt-1 text-xs ${
                  active ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {counts[name]} 个字
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}