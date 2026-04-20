'use client';

import React from "react";

type AppHeaderProps = {
  childName: string;
  childAge: string;
  childInterest: string;
  knownCount: number;

  onResetProfile: () => void;
  onResetKnown: () => void;
  onResetRotation: () => void;
};

export default function AppHeader({
  childName,
  childAge,
  childInterest,
  knownCount,
  onResetProfile,
  onResetKnown,
  onResetRotation,
}: AppHeaderProps) {
  const [open, setOpen] = React.useState(false);

  const safeName = childName.trim() || "孩子";
  const safeAge = childAge.trim() || "当前阶段";
  const safeInterest = childInterest.trim() || "未设置";

  return (
    <div className="rounded-[28px] bg-white p-4 shadow-sm md:p-5">
      {/* 顶部导航栏 */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-base font-semibold text-gray-900">
            识字助手
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {safeName} · {safeAge}
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-full p-2 text-gray-600 hover:bg-gray-100"
          >
            ⋯
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 rounded-xl bg-white shadow-lg border border-gray-100 z-10">
              <button
                onClick={() => {
                  setOpen(false);
                  onResetProfile();
                }}
                className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
              >
                重置孩子档案
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  onResetKnown();
                }}
                className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
              >
                清空已掌握
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  onResetRotation();
                }}
                className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
              >
                重置推荐
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 状态胶囊 */}
      <div className="mt-4 flex flex-wrap gap-2">
        <div className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
          当前兴趣：{safeInterest}
        </div>

        <div className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
          已掌握：{knownCount} 个字
        </div>
      </div>
    </div>
  );
}