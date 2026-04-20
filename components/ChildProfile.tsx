'use client';

import React from "react";

type ChildProfileProps = {
  childName: string;
  childAge: string;
  childInterest: string;
  onNameChange: (val: string) => void;
  onAgeChange: (val: string) => void;
  onInterestChange: (val: string) => void;
};

const interestOptions = [
  { label: "恐龙", icon: "🦖" },
  { label: "火车", icon: "🚂" },
  { label: "飞机", icon: "✈️" },
  { label: "吃饭", icon: "🍚" },
  { label: "日常", icon: "🏠" },
];

function SettingItem({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (val: string) => void;
}) {
  const [editing, setEditing] = React.useState(false);
  const [tempValue, setTempValue] = React.useState(value);

  React.useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleConfirm = () => {
    onChange(tempValue.trim());
    setEditing(false);
  };

  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="text-sm text-gray-500">{label}</div>

      {!editing ? (
        <button
          onClick={() => setEditing(true)}
          className="flex items-center gap-2 text-right"
        >
          <span className="text-base font-medium text-gray-900">
            {value || placeholder}
          </span>
          <span className="text-gray-400">›</span>
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <input
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            autoFocus
            className="w-32 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            onClick={handleConfirm}
            className="rounded-lg bg-black px-3 py-2 text-xs text-white"
          >
            确定
          </button>
        </div>
      )}
    </div>
  );
}

export default function ChildProfile({
  childName,
  childAge,
  childInterest,
  onNameChange,
  onAgeChange,
  onInterestChange,
}: ChildProfileProps) {
  return (
    <div className="rounded-[28px] bg-white p-5 shadow-sm md:p-6">
      {/* 标题 */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900">孩子档案</h2>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          用来调整推荐内容，更贴近孩子当前阶段
        </p>
      </div>

      {/* 基本信息 */}
      <div className="mt-5 divide-y divide-gray-100">
        <SettingItem
          label="名字"
          value={childName}
          placeholder="填写名字"
          onChange={onNameChange}
        />

        <SettingItem
          label="年龄"
          value={childAge}
          placeholder="如：3岁9个月"
          onChange={onAgeChange}
        />
      </div>

      {/* 兴趣快捷选择 */}
      <div className="mt-6">
        <div className="text-sm text-gray-500">当前兴趣</div>

        <div className="mt-3 flex flex-wrap gap-3">
          {interestOptions.map((item) => {
            const active = childInterest === item.label;

            return (
              <button
                key={item.label}
                onClick={() => onInterestChange(item.label)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-3 text-sm leading-6 text-gray-500">
          当前已选择：<span className="font-medium text-gray-800">{childInterest || "未设置"}</span>
        </div>
      </div>

      {/* 自定义兴趣（可选） */}
      <div className="mt-6 rounded-2xl bg-gray-50 p-4">
        <div className="text-sm text-gray-500">也可以自定义兴趣</div>
        <div className="mt-3 flex items-center gap-2">
          <input
            value={childInterest}
            onChange={(e) => onInterestChange(e.target.value)}
            placeholder="比如：汽车 / 动物 / 绘本"
            className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>
    </div>
  );
}