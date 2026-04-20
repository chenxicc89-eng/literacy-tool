export type WordItem = {
  text: string;
  sentence: string;
  tips: string;
};

export type Scene = {
  icon: string;
  words: WordItem[];
};

export const scenes: Record<string, Scene> = {
  日常: {
    icon: "🏠",
    words: [
      { text: "走", sentence: "我们走吧", tips: "高频生活词" },
      { text: "来", sentence: "你过来", tips: "简单重复" },
      { text: "看", sentence: "你看这个", tips: "配手势" },
      { text: "拿", sentence: "帮我拿一下", tips: "动作强化" },
      { text: "给", sentence: "给你", tips: "互动更自然" },
      { text: "开", sentence: "开门", tips: "指实物更好" },
      { text: "关", sentence: "关门", tips: "对比记忆" },
      { text: "上", sentence: "上楼", tips: "动作理解" },
      { text: "下", sentence: "下楼", tips: "配合动作" },
    ],
  },

  吃饭: {
    icon: "🍚",
    words: [
      { text: "吃", sentence: "我们吃饭", tips: "每天都会用到" },
      { text: "饭", sentence: "这是饭", tips: "指实物更好" },
      { text: "水", sentence: "喝水", tips: "重复出现" },
      { text: "拿", sentence: "拿勺子", tips: "动作+语言" },
      { text: "给", sentence: "给你", tips: "简单互动" },
      { text: "要", sentence: "你要吗", tips: "提问式更自然" },
      { text: "多", sentence: "再来一点", tips: "不用纠结字义" },
      { text: "少", sentence: "少一点", tips: "对比理解" },
    ],
  },

  恐龙: {
    icon: "🦖",
    words: [
      { text: "跑", sentence: "恐龙在跑", tips: "用手指指字，不要求孩子读" },
      { text: "吃", sentence: "恐龙在吃东西", tips: "配合动作更容易理解" },
      { text: "大", sentence: "这个恐龙很大", tips: "用夸张语气增强记忆" },
      { text: "小", sentence: "这个恐龙很小", tips: "对比更容易建立概念" },
      { text: "来", sentence: "恐龙来了", tips: "重复出现就够了" },
      { text: "走", sentence: "恐龙走了", tips: "不需要让孩子重复" },
      { text: "看", sentence: "我们看恐龙", tips: "用生活语言就好" },
      { text: "上", sentence: "恐龙上山了", tips: "结合画面理解" },
      { text: "下", sentence: "恐龙下来了", tips: "用动作强化" },
      { text: "叫", sentence: "恐龙在叫", tips: "可以模仿声音" },
    ],
  },

  火车: {
    icon: "🚂",
    words: [
      { text: "车", sentence: "火车来了", tips: "先建立“车”的概念" },
      { text: "开", sentence: "火车开走了", tips: "用动态场景" },
      { text: "来", sentence: "火车来了", tips: "重复高频词" },
      { text: "走", sentence: "火车走了", tips: "形成对比" },
      { text: "上", sentence: "我们上车", tips: "结合真实体验" },
      { text: "下", sentence: "我们下车", tips: "生活中重复" },
      { text: "站", sentence: "火车到站了", tips: "强调“站”这个字" },
      { text: "门", sentence: "车门开了", tips: "指实物更好" },
      { text: "坐", sentence: "我们坐火车", tips: "不用解释字义" },
      { text: "看", sentence: "我们看火车", tips: "轻松表达就行" },
      { text: "快", sentence: "火车很快", tips: "配合动作更好" },
      { text: "停", sentence: "火车停了", tips: "简单重复" },
    ],
  },

  飞机: {
    icon: "✈️",
    words: [
      { text: "飞", sentence: "飞机在飞", tips: "核心字优先出现" },
      { text: "上", sentence: "飞机飞上去了", tips: "配手势更好" },
      { text: "下", sentence: "飞机下来了", tips: "重复建立理解" },
      { text: "看", sentence: "我们看飞机", tips: "自然表达" },
      { text: "云", sentence: "飞机在云里", tips: "结合画面理解" },
      { text: "高", sentence: "飞机飞很高", tips: "用夸张语气" },
      { text: "来", sentence: "飞机来了", tips: "简单重复" },
      { text: "走", sentence: "飞机飞走了", tips: "形成对比" },
      { text: "远", sentence: "飞机飞很远", tips: "不用解释抽象概念" },
      { text: "起", sentence: "飞机起飞了", tips: "重点词可以多说几次" },
      { text: "落", sentence: "飞机落地了", tips: "配合动作理解" },
      { text: "坐", sentence: "我们坐飞机", tips: "结合真实经验" },
    ],
  },
};