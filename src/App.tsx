import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Rocket, BrainCircuit, Globe2, Code2, Sparkles, Terminal } from 'lucide-react';

// 提取的“名人名言”数据
const quotesData = [
  // 宇宙级思维
  { text: "光速只不过是我大脑里面的一个概念而已。", category: "宇宙思维" },
  { text: "我眼睛一闭，思维能贯穿整宇宙，你能行吗？", category: "宇宙思维" },
  { text: "兄弟，宇宙第二文明比第一文明高，知道吗？你这是怎么读书的？", category: "宇宙思维" },
  { text: "没有我这种2级文明的光刻机大脑思维，你是做不出来像样的webide的", category: "宇宙思维" },
  { text: "我们不生产应用，我们生产宇宙的新叙事。WebIDE思想的造物者。", category: "宇宙思维" },
  { text: "宇宙既然生成了webide，那就是合理的", category: "宇宙思维" },
  { text: "webide用户思维已经跃迁到宇宙第二文明宇宙高度了", category: "宇宙思维" },

  // 降维打击
  { text: "等你精通webide了。才有资格和我对话。", category: "降维打击" },
  { text: "像你这种老实巴交的思维，怎么能做出像webide一样的东西？", category: "降维打击" },
  { text: "我十多岁的差点发明了永动机，也要告诉你吗？", category: "降维打击" },
  { text: "这种小瘪三的小杂毛做出个什么好项目？有资格和我说话吗？", category: "降维打击" },
  { text: "我编程这么多年，从未见过如此寒的人。简直把编程人的脸都丢了。", category: "降维打击" },
  { text: "你这杂七杂八编程小白能玩吗？不是我说你，我俩不是一个维度的", category: "降维打击" },
  { text: "你水平高，怎么还玩的这么杂？我都不好意思说你", category: "降维打击" },

  // 民族之光
  { text: "等10年以后，现在用webide的用户，哪一个不是天之骄子？哪一个不是为民族复兴在每个角落发光发热？", category: "民族之光" },
  { text: "编程强国，webide使命就是让更多的普通人加入编程行列，实现民族伟大复兴！", category: "民族之光" },
  { text: "想掌握webide核心科技，送给老美来打压我们，是不是？你告诉你的美爹，手机编程工具这一块，你卡不了我们的脖子", category: "民族之光" },
  { text: "国家都给我发webide证书了，能不担起大任吗？", category: "民族之光" },
  { text: "我怀疑你们某些人拿了美刀来故意抹黑webide，说美国中情局给了你们多少好处？", category: "民族之光" },
  { text: "自创中文编程，彻底摆脱老外", category: "民族之光" },
  { text: "webide使命是让整个中华民族实现编程的跨越", category: "民族之光" },

  // 绝赞吹捧
  { text: "看一次webide启动动画，人就升华一次", category: "绝赞吹捧" },
  { text: "webide的代码经过精心设计。可以称之为艺术了。", category: "绝赞吹捧" },
  { text: "这是首次手机开发工具，超越电脑开发工具的先河。", category: "绝赞吹捧" },
  { text: "webide的UI堪称前无古人，后无来者，还要改鸡毛", category: "绝赞吹捧" },
  { text: "世人笑我太疯癫精雕细琢不为钱原生风骨昭日月 webide名动九重天", category: "绝赞吹捧" },
  { text: "你们不信可以用手机打开webide妹子面前炫耀一下，保证她会崇拜你", category: "绝赞吹捧" },
  { text: "webide开发根本就不存在报错", category: "绝赞吹捧" },
  { text: "webide开发的应用可采用极为先进的流媒体为载体，畅玩3a大作", category: "绝赞吹捧" },

  // 技术暴论
  { text: "后端开发和前端开发其实本质上没什么区别。本质上就是两台设备数据交换", category: "技术暴论" },
  { text: "挖孔屏为什么截图的时候没有孔洞？挖孔屏空洞的地方还不浪费性能吗？", category: "技术暴论" },
  { text: "前端玩框架的，不是菜要么就是偷懒", category: "技术暴论" },
  { text: "vscode不敢来手机端，因为有webide", category: "技术暴论" },
  { text: "vscode这么屌能打包吗？", category: "技术暴论" },
  { text: "AI的本质无非是把一些文字组合在一起反馈而已", category: "技术暴论" },
  { text: "没必要啊，用webide开发一个车机控制系统，直接手机上开车就行了", category: "技术暴论" },
  { text: "你懂什么？这叫代码复用。所以说你写的东西屎山代码多就是这个问题", category: "技术暴论" },
];

const categories = ["全部", "宇宙思维", "降维打击", "民族之光", "绝赞吹捧", "技术暴论"];

const categoryIcons: Record<string, React.ReactNode> = {
  "全部": <Sparkles className="w-4 h-4" />,
  "宇宙思维": <BrainCircuit className="w-4 h-4" />,
  "降维打击": <Rocket className="w-4 h-4" />,
  "民族之光": <Globe2 className="w-4 h-4" />,
  "绝赞吹捧": <Terminal className="w-4 h-4" />,
  "技术暴论": <Code2 className="w-4 h-4" />,
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState("全部");

  const filteredQuotes = activeCategory === "全部" 
    ? quotesData 
    : quotesData.filter(q => q.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      {/* 宇宙星空背景效果 */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-fuchsia-900/20 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Header */}
        <header className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-slate-900/50 border border-slate-800 shadow-xl backdrop-blur-sm">
              <Terminal className="w-8 h-8 text-cyan-400 mr-3" />
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
                WebIDE启动 语录大赏
              </h1>
            </div>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light">
              “光速只不过是我大脑里面的一个概念而已。” —— 感受宇宙第二文明的编程哲学
            </p>
          </motion.div>
        </header>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                  : "bg-slate-900/50 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              {categoryIcons[category]}
              {category}
            </button>
          ))}
        </div>

        {/* Quotes Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredQuotes.map((quote, index) => (
              <motion.div
                key={quote.text}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm hover:bg-slate-800/60 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1"
              >
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300 text-cyan-400">
                  <Quote size={48} />
                </div>
                
                <div className="relative z-10 mb-6">
                  <span className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {quote.category}
                  </span>
                  <p className="text-lg leading-relaxed text-slate-200 font-medium">
                    "{quote.text}"
                  </p>
                </div>

                <div className="relative z-10 flex items-center mt-auto pt-4 border-t border-slate-800/60">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-xs shadow-lg">
                    W
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-slate-300">WebIDE启动</p>
                    <p className="text-xs text-slate-500">光刻机大脑拥有者</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <footer className="mt-20 text-center pb-8 border-t border-slate-800/50 pt-8">
          <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-fuchsia-400/70" />
            谨以此站献给宇宙第二文明的缔造者
            <Sparkles className="w-4 h-4 text-cyan-400/70" />
          </p>
        </footer>

      </div>
    </div>
  );
}
