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
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">选择场景</h2>
      <div className="space-y-2">
        {sceneNames.map((name) => (
          <button
            key={name}
            onClick={() => onChange(name)}
            className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left ${
              currentScene === name
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            <span>
              {icons[name]} {name}
            </span>
            <span className="text-xs opacity-70">{counts[name]}字</span>
          </button>
        ))}
      </div>
    </div>
  );
}