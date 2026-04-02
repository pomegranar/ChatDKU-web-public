const zh = {
  // Navbar
  "navbar.about": "关于",
  "navbar.dev": "开发",
  "navbar.preview": "示范",

  // Back button
  back: "返回",

  // Home page - Navbar
  "home.nav.stack": "技术栈",
  "home.nav.agent": "智能体",
  "home.nav.seekbench": "SeekBench",
  "home.nav.about": "关于",
  "home.nav.team": "团队",
  "home.nav.login": "登录",

  // Home page - Hero
  "home.hero.title1": "大学知识，",
  "home.hero.title2": "尽在一处。",
  "home.hero.subtitle.prefix": "",
  "home.hero.subtitle":
    "是一款智能AI助手，能够准确、私密、即时地回答您所有关于DKU的问题。",
  "home.hero.cta": "打开 ChatDKU",
  "home.hero.broughtBy": "由以下团队倾力打造",
  "home.hero.watchYouTube": "在 YouTube 上观看",
  "home.hero.videoFallback": "您的浏览器不支持视频标签。",

  // Home page - Partners
  "home.partners.label": "合作伙伴",

  // Home page - Problem
  "home.problem.title": "这些场景是否似曾相识？",
  "home.problem.pdf.title": "迷失在PDF中",
  "home.problem.pdf.desc": "学术政策深藏在无人愿意再看第二遍的文档里。",
  "home.problem.tabs.title": "打开了10个标签页",
  "home.problem.tabs.desc": "截止日期、要求和资源分散在十几个网站上。",
  "home.problem.office.title": "办公室来回跑",
  "home.problem.office.desc": "为了一个简单的答案，在各办公室之间来回奔波。",
  "home.problem.coda": "我们都经历过。",

  // Home page - Solution
  "home.solution.badge": "解决方案",
  "home.solution.title": "一个真正了解DKU的AI。",
  "home.solution.desc":
    "与通用聊天机器人不同，ChatDKU基于DKU官方资料构建。包括政策、截止日期、课程、公告——全部部署在DKU基础设施上。",
  "home.solution.privacy": "完全本地部署，您的查询不会离开DKU内部网络。",
  "home.solution.sources": "基于官方最新DKU资料，而非公共互联网。",
  "home.solution.audience": "为学生、教师和员工而构建。",
  "home.solution.demo.you": "你",
  "home.solution.demo.question": "我什么时候可以申报专业？",
  "home.solution.demo.answer":
    "您可以在昆山杜克大学<b>大二春季学期</b>申报专业。<br/>在申报之前，您应该与学术导师一起制定与您意向专业一致的长期学术计划。<br/>建议在大一期间探索不同的专业选项，以做出明智的决定。如需更多信息，请咨询本科生学术指导办公室或查阅DKU本科生手册。",
  "home.solution.demo.ref":
    "参考来源：<br/>• DKU本科生手册（第52页）<br/>• 学术指导常见问题（2024年12月19日更新）（第5页）",

  // Home page - Architecture
  "home.arch.badge": "技术架构",
  "home.arch.title": "全栈AI平台",
  "home.arch.subtitle": "每一层都为可靠性、隐私性和持续改进而构建。",
  "home.arch.layer1": "现代化界面",
  "home.arch.layer1.desc": "Next.js 驱动的移动端和桌面端无障碍UI。",
  "home.arch.layer2": "安全后端",
  "home.arch.layer2.desc": "Duke NetID 身份验证、安全路由和请求处理。",
  "home.arch.layer3": "智能RAG核心",
  "home.arch.layer3.desc":
    "ChatDKU 采用先进的AI技术，包括响应规划、混合检索机制、推理、综合和记忆。",
  "home.arch.layer4": "知识库",
  "home.arch.layer4.desc":
    "来自各类DKU文档的专属信息，以向量嵌入和关系数据库形式存储。",
  "home.arch.footer":
    "我们使用离线数据摄取管道来解析DKU官方资料，将其分块进行向量嵌入，构建高效的可搜索索引。在查询时，",
  "home.arch.footerBold": "向量搜索 + 关键词搜索 + 重排序",
  "home.arch.footerEnd": "确保每个回答都基于真实的校园信息。",

  // Home page - Agent Flow
  "home.agent.badge": "智能体流程",
  "home.agent.title": "您的问题如何变成答案",
  "home.agent.subtitle": "ChatDKU 不猜测。每个回答都经过严格的验证循环。",
  "home.agent.step1": "提问",
  "home.agent.step1.desc": "您的问题被发送到系统",
  "home.agent.step2": "检索",
  "home.agent.step2.desc": "智能体搜索知识库",
  "home.agent.step3": "评估",
  "home.agent.step3.desc": "证据是否充分？",
  "home.agent.step4": "优化",
  "home.agent.step4.desc": "如果不充分，重写查询并再次检索",
  "home.agent.step5": "综合",
  "home.agent.step5.desc": "生成带引用的答案",
  "home.agent.footer1":
    "如果检索到的上下文不够充分，系统会重写查询并在生成之前再次检索。",
  "home.agent.footerBold": "不产生幻觉，不猜测。",
  "home.agent.footer2":
    "只有当证据通过充分性检查后，综合器才会生成最终回答，并附带引用供人工审核。",

  // Home page - SeekBench
  "home.seekbench.badge": "评估",
  "home.seekbench.title": "不仅仅是一个回答机器。",
  "home.seekbench.desc1":
    "SeekBench 是贯穿整个管道的评估框架——不仅评估最终答案，还评估检索质量和中间推理决策。",
  "home.seekbench.desc2":
    "这让我们能够精确定位管道中需要改进的地方，使 ChatDKU 成为一个",
  "home.seekbench.desc2Bold": "可持续改进的系统",
  "home.seekbench.desc2End": "，由真实评估和用户反馈驱动。",
  "home.seekbench.metric1": "检索质量",
  "home.seekbench.metric1.desc": "是否找到了正确的文档？",
  "home.seekbench.metric2": "充分性判断",
  "home.seekbench.metric2.desc": "证据阈值是否被正确满足？",
  "home.seekbench.metric3": "最终答案质量",
  "home.seekbench.metric3.desc": "回答是否准确、有据可查且有帮助？",

  // Home page - Roadmap
  "home.roadmap.badge": "路线图",
  "home.roadmap.title": "即将推出",
  "home.roadmap.subtitle": "ChatDKU 正在积极发展中。",
  "home.roadmap.mobile": "移动应用",
  "home.roadmap.mobile.desc": "原生 iOS 和 Android 应用，随时随地访问",
  "home.roadmap.agents": "更强智能体",
  "home.roadmap.agents.desc": "更强大的多步推理和规划能力",
  "home.roadmap.visual": "可视化数据导入",
  "home.roadmap.visual.desc": "拖放式校园文档添加界面",
  "home.roadmap.eval": "自动评估",
  "home.roadmap.eval.desc": "更强大的自动化基准测试框架",

  // Home page - CTA
  "home.cta.title": "准备好提出您的第一个问题了吗？",
  "home.cta.desc":
    "ChatDKU 面向所有DKU学生、教师和员工开放——免费、快速且私密。",
  "home.cta.button": "开始使用",

  // Home page - Footer
  "home.footer.copyright": "DKU 边缘智能实验室 © 2026",
  "home.footer.about": "关于",
  "home.footer.team": "团队",
  "home.footer.login": "登录",

  // Login page
  "login.home": "首页",
  "login.about": "关于",
  "login.team": "团队",
  "login.tagline": "大学生活导航，从未如此简单。",
  "login.openTerms": "查看使用条款",
  "login.acceptTerms": "接受使用条款",
  "login.cookieNotice": "我们保存 Cookie 以记住您的偏好。",
  "login.guest": "以",
  "login.guestBold": "访客",
  "login.or": "或",
  "login.netid": "使用",
  "login.netidBold": "Duke NetID 登录",
  "login.termsTooltip": "请先接受使用条款才能使用 ChatDKU",
  "login.footer": "2026 边缘智能实验室",
  "login.serverError": "无法连接到服务器，请稍后重试。",

  // Chat page
  "chat.welcome": "欢迎使用 ChatDKU",
  "chat.placeholder": "请输入您的问题...",
  "chat.searching": "正在搜索相关文档",
  "chat.feedbackQuestion": "这个回答对您有帮助吗？",
  "chat.feedbackYes": "有帮助",
  "chat.feedbackNo": "没帮助",
  "chat.feedbackThanks": "感谢您的反馈！",
  "chat.feedbackCanceled": "已取消反馈。",
  "chat.feedbackWhyTitle": "很抱歉。您能告诉我们原因吗？",
  "chat.feedbackNotCorrect": "不正确",
  "chat.feedbackNotClear": "不清楚",
  "chat.feedbackNotRelevant": "不相关",
  "chat.feedbackOther": "其他",
  "chat.feedbackCustomPlaceholder": "请描述问题",
  "chat.feedbackCustomRequired": "请填写内容！",
  "chat.feedbackSubmit": "提交",
  "chat.feedbackCancel": "取消",
  "chat.disclaimer":
    "AI回答可能包含错误。如有不明之处，请向您的导师和/或学术服务部门核实。",

  // About page / component
  "about.title": "关于 ChatDKU",
  "about.point1":
    "ChatDKU 是昆山杜克大学专属的AI聊天机器人，旨在简化校园信息获取，提升学生、教师和员工的参与度。ChatDKU 能够即时、可靠地回答DKU相关问题——节省时间，简化大学生活。ChatDKU 的独特之处在于本地部署，确保数据隐私和安全。",
  "about.point2":
    "ChatDKU-Student 并非学术导师会议或相关办公室沟通的替代品。它是一个提供关于DKU政策的快速、准确答案的工具，但如果您要根据政策采取行动，请务必跟进相关大学工作人员。",
  "about.point3":
    "所有AI系统都可能因各种原因出错。虽然此平台的开发者会尽一切努力使其尽可能准确，但用户有责任核实系统提供的任何答案的准确性。如果用户因系统提供的答案而错过截止日期或未采取行动，责任在于用户而非 ChatDKU。系统提供的回答截图不能作为要求例外处理本科生手册中政策或学术日历中截止日期的理由。",
  "about.point4":
    "为提高答案准确性，请确保您的问题包含具体且详细的关键词，以避免误解或错误解读。",
  "about.developedBy":
    "由DKU边缘智能实验室开发，与IGHE SET实验室和本科生学术指导办公室合作。",
  "about.guidebook": "获取指南手册",
  "about.credits": "制作团队",

  // Terms and Conditions
  "terms.title": "使用条款",
  "terms.openButton": "查看使用条款",

  // Sidebar
  "side.newChat": "新对话",
  "side.aboutChatDKU": "关于 ChatDKU",
  "side.loginNetID": "使用 Duke NetID 登录",
  "side.modelSelection": "模型选择",
  "side.chatHistory": "对话历史",
  "side.historyDisabled": "访客用户不保存对话历史。",
  "side.searchChats": "搜索对话",
  "side.noMatches": "无匹配结果",
  "side.noConversations": "暂无对话",
  "side.deleteChat": "删除对话？",
  "side.deleteConfirm": "此操作将永久删除此对话历史。",
  "side.cancel": "取消",
  "side.delete": "删除",

  // Starter
  "starter.title": "问 ChatDKU",

  // Team Credits
  "team.credits": "制作团队",
  "team.coreMembers": "核心成员",
  "team.newMembers": "新成员",
  "team.alumni": "往届成员",
  "team.showMore": "展开更多",
  "team.showLess": "收起",

  // Prompt recommendations
  "prompts.0": "昆山杜克大学有哪些专业？",
  "prompts.1": "GSI申请者的英语要求和认可的考试有哪些？",
  "prompts.2": "GSI录取是否需要托福或雅思成绩？",
  "prompts.3": "每个GSI项目的班级规模是多少？",
  "prompts.4": "GSI录取结果何时以及如何发布？",
  "prompts.5": "GSI学费包含哪些费用？不包含哪些？",
  "prompts.6": "GSI有奖学金或经济资助选项吗？",
  "prompts.7": "GSI的申请费、押金和付款规定是什么？",
  "prompts.8": "介绍一下通识博雅课程。",
  "prompts.9": "昆山杜克大学是什么？有什么独特之处？",
  "prompts.10": "我可以在之后换专业吗？怎么换？",
  "prompts.11": "昆山杜克大学现任领导成员有哪些？他们担任什么职务？",
  "prompts.12": "应用数学有哪些课程？",
  "prompts.13": "昆山杜克大学董事会成员有哪些？",
  "prompts.14": "介绍一下海外学习机会。",
  "prompts.15": "昆山杜克大学董事会有哪些职责？",
  "prompts.16": "DKU有哪些心理健康支持资源？",
  "prompts.17": "有哪些奖学金和助学金？申请条件是什么？",
  "prompts.18": "申请经济资助的流程是什么？",
  "prompts.19": "对创业感兴趣的学生有哪些资源？",
  "prompts.20": "校园里有休闲和健身设施吗？",
  "prompts.21": "校园提供哪些医疗服务？",
  "prompts.22": "什么是通识核心课程？",
  "prompts.23": "一个学期最多可以修多少学分？",
  "prompts.24": "CR/NC记录的课程可以重修吗？",
  "prompts.25": "专业申报的流程是什么？",
  "prompts.26": "什么时候可以申报专业？",
  "prompts.27": "我可以因服兵役申请休学吗？",
  "prompts.28": "如何申请医疗休学？",
  "prompts.29": "注册相关问题应该咨询谁？",
  "prompts.30": "海外学习最多可以转多少学分？",
  "prompts.31": "国防体育的评分标准和毕业要求是什么？",
} as const;

export default zh;
