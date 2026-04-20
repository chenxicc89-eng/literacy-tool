export type WordItem = {
  text: string;
  sentence: string;
  tips: string;
};

export type SceneMap = Record<
  string,
  {
    icon: string;
    words: WordItem[];
  }
>;

export const scenes: SceneMap = {
  吃饭: {
    icon: "🍽️",
    words: [
      { text: "吃", sentence: "你要吃吗？", tips: "吃饭时顺手指一下“吃”" },
      { text: "喝", sentence: "我们来喝水。", tips: "喝水前说一次“喝”就够" },
      { text: "水", sentence: "这是水。", tips: "杯子、水壶都可以顺手强化" },
      { text: "饭", sentence: "我们吃饭啦。", tips: "盛饭时重复最自然" },
      { text: "多", sentence: "这个多一点。", tips: "用两份食物对比多和少" },
      { text: "少", sentence: "这个少一点。", tips: "和“多”成对出现更容易记" },
    ],
  },
  出门: {
    icon: "🚗",
    words: [
      { text: "车", sentence: "我们上车啦。", tips: "出门高频字，很适合先学" },
      { text: "门", sentence: "把门打开。", tips: "开门关门都是现成场景" },
      { text: "开", sentence: "门开了。", tips: "动作和字一起说效果最好" },
      { text: "走", sentence: "我们走吧。", tips: "每天都能重复" },
      { text: "上", sentence: "上车啦。", tips: "和“下”一起学更自然" },
      { text: "下", sentence: "我们下车。", tips: "下楼、下车都能用" },
    ],
  },
  恐龙: {
    icon: "🦖",
    words: [
      { text: "龙", sentence: "这是一只大龙。", tips: "兴趣字优先，记得会很快" },
      { text: "大", sentence: "这只恐龙好大。", tips: "和小恐龙做对比" },
      { text: "小", sentence: "这只是小恐龙。", tips: "大小一起出现更容易懂" },
      { text: "跑", sentence: "恐龙在跑。", tips: "可以配合动作表演" },
      { text: "吃", sentence: "恐龙在吃东西。", tips: "兴趣字和生活字混搭" },
      { text: "头", sentence: "这是恐龙的头。", tips: "身体部位最直观" },
    ],
  },
  汽车: {
    icon: "🚙",
    words: [
      { text: "车", sentence: "这是一辆车。", tips: "孩子兴趣高，识字动力会更强" },
      { text: "开", sentence: "汽车开走了。", tips: "推玩具车时说最自然" },
      { text: "停", sentence: "汽车停下来啦。", tips: "和“开”形成反差" },
      { text: "快", sentence: "这辆车跑得快。", tips: "快慢游戏很好用" },
      { text: "慢", sentence: "这辆车开得慢。", tips: "让孩子自己做快慢对比" },
      { text: "轮", sentence: "这是车轮。", tips: "指轮子的时候说“轮”" },
    ],
  },
};