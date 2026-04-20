export default function LandingPage() {
  return (
    <div className="bg-white text-gray-900">
      
      {/* 第一屏 */}
      <section className="px-6 py-20 text-center">
        <h1 className="text-4xl font-bold">
          我给3岁孩子做了个“不鸡娃识字工具”
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          不刷题、不打卡，只是告诉你今天顺手说哪2句话
        </p>

        <a
          href="/"
          className="mt-8 inline-block rounded-full bg-black px-6 py-3 text-white"
        >
          马上试试
        </a>
      </section>

      {/* 痛点 */}
      <section className="bg-gray-50 px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold">
          为什么很多识字方法很难坚持？
        </h2>

        <div className="mt-6 space-y-2 text-gray-600">
          <p>每天要安排任务，很累</p>
          <p>孩子不配合，很焦虑</p>
          <p>不知道怎么教，很迷茫</p>
        </div>

        <p className="mt-6 font-medium">
          我只是把它变成一件更简单的事
        </p>
      </section>

      {/* 工具展示 */}
      <section className="px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold">
          每天打开一次就够了
        </h2>
        <p className="mt-4 text-gray-600">
          它会告诉你今天可以顺手说什么
        </p>
      </section>

      {/* 价值观 */}
      <section className="bg-gray-50 px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold">
          我不想让孩子提前学会
        </h2>
        <p className="mt-4 text-gray-600">
          我只想让他不讨厌学习
        </p>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <a
          href="/"
          className="rounded-full bg-black px-6 py-3 text-white"
        >
          打开工具试一下
        </a>
      </section>
    </div>
  );
}