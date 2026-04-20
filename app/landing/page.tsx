type LandingPageProps = {
  searchParams?: Promise<{
    title?: string;
    scene?: string;
    words?: string;
  }>;
};

export default async function LandingPage({ searchParams }: LandingPageProps) {
  const params = (await searchParams) || {};

  const incomingTitle =
    params.title?.trim() || "恐龙迷孩子，我只带这2个字";

  const scene = params.scene?.trim() || "恐龙";

  const parsedWords =
    params.words
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean) || [];

  const displayWords =
    parsedWords.length >= 2 ? parsedWords.slice(0, 2) : ["跑", "吃"];

  const exampleMap: Record<string, string[]> = {
    恐龙: ["恐龙在跑", "恐龙在吃东西"],
    火车: ["火车开来了", "火车到站了"],
    飞机: ["飞机飞起来了", "飞机飞很高"],
    吃饭: ["我们吃饭", "我们喝水"],
    日常: ["我们走吧", "你看这个"],
  };

  const examples =
    exampleMap[scene] || [
      `${displayWords[0]} 这个字今天顺手带`,
      `${displayWords[1]} 这个字今天顺手带`,
    ];

  return (
    <main className="min-h-screen bg-[#fffaf7] text-gray-900">
      {/* ===== 第一屏：钩子 ===== */}
      <section className="px-6 pt-20 pb-16 text-center">
        <div className="mx-auto max-w-xl">
          <div className="text-base font-semibold text-rose-500">
            {incomingTitle}
          </div>

          <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
            我没有教孩子识字
            <br />
            他却开始认字了
          </h1>

          <div className="mt-10 flex justify-center gap-4">
            {displayWords.map((word) => (
              <div
                key={word}
                className="rounded-2xl bg-white px-6 py-4 text-4xl font-bold shadow-sm"
              >
                {word}
              </div>
            ))}
          </div>

          <a
            href="/"
            className="mt-10 inline-block w-full max-w-xs rounded-full bg-black px-6 py-4 text-base font-medium text-white"
          >
            👉 我也试试这个方法
          </a>

          <div className="mt-3 text-xs text-gray-500">
            每天只用1分钟
          </div>
        </div>
      </section>

      {/* ===== 第二屏：方法 ===== */}
      <section className="bg-white px-6 py-16 text-center">
        <div className="mx-auto max-w-xl">
          <h2 className="text-2xl font-bold leading-tight">
            我后来只做了一件很简单的事
          </h2>

          <div className="mt-6 text-lg font-semibold text-gray-900">
            👉 在他喜欢的场景里顺手带字
          </div>

          <div className="mt-6 space-y-2 text-gray-600">
            <div>不让他读</div>
            <div>不测试</div>
            <div>说完就结束</div>
          </div>
        </div>
      </section>

      {/* ===== 第三屏：例子 ===== */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold">
            比如今天，我只带这2个字
          </h2>

          <div className="mt-8 grid gap-4">
            {displayWords.map((word, index) => (
              <div
                key={word}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="text-4xl font-bold">{word}</div>
                <div className="mt-4 text-lg text-gray-700">
                  {examples[index]}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 text-sm text-gray-500">
            就像聊天一样说一句就够了
          </div>
        </div>
      </section>

      {/* ===== 第四屏：CTA ===== */}
      <section className="bg-white px-6 py-20 text-center">
        <div className="mx-auto max-w-xl">
          <h2 className="text-3xl font-bold leading-tight">
            如果你也不想鸡娃
          </h2>

          <p className="mt-5 text-lg text-gray-600">
            可以试试每天只带2个字
          </p>

          <a
            href="/"
            className="mt-10 inline-block w-full max-w-xs rounded-full bg-black px-8 py-4 text-base font-medium text-white"
          >
            👉 现在就试一下
          </a>
        </div>
      </section>
    </main>
  );
}