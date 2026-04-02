// Prompt recommendations for the chat interface.
// Add new prompts by appending to the arrays below.

export const promptsEn = [
	{
		icon: "✅",
		text: "What are the English requirements and accepted tests for gsi applicants?",
	},
	{
		icon: "🇬",
		text: "Is TOEFL or IELTS required or optional for gsi admission?",
	},
	{ icon: "🏫", text: "What is the class size for each gsi program?" },
	{ icon: "⏰", text: "How and when are gsi admission results released?" },
	{
		icon: "💰",
		text: "What costs are covered by gsi tuition, and what are not included?",
	},
	{
		icon: "🧧",
		text: "Are there scholarships or financial aid options for gsi?",
	},
	{
		icon: "💳",
		text: "What are the application fee, deposit, and payment rules for gsi?",
	},
	{
		icon: "💫",
		text: "What is Duke Kunshan University and what makes it unique?",
	},
	{
		icon: "💡",
		text: "Who are the current leadership members of Duke Kunshan University and what roles do they hold?",
	},
	{
		icon: "🙋",
		text: "Who are the members of the Duke Kunshan University board of trustees?",
	},
	{
		icon: "🏠",
		text: "What responsibilities does the board of trustees have at Duke Kunshan University?",
	},
];

export const promptsZh = [
	{ icon: "✅", text: "GSI申请者的英语要求和认可的考试有哪些？" },
	{ icon: "🇬", text: "GSI录取是否需要托福或雅思成绩？" },
	{ icon: "🏫", text: "每个GSI项目的班级规模是多少？" },
	{ icon: "⏰", text: "GSI录取结果何时以及如何发布？" },
	{ icon: "💰", text: "GSI学费包含哪些费用？不包含哪些？" },
	{ icon: "🧧", text: "GSI有奖学金或经济资助选项吗？" },
	{ icon: "💳", text: "GSI的申请费、押金和付款规定是什么？" },
	{ icon: "💫", text: "昆山杜克大学是什么？有什么独特之处？" },
	{ icon: "💡", text: "昆山杜克大学现任领导成员有哪些？他们担任什么职务？" },
	{ icon: "🙋", text: "昆山杜克大学董事会成员有哪些？" },
	{ icon: "🏠", text: "昆山杜克大学董事会有哪些职责？" },
];

/** Pick `count` random items from the given prompt list. */
export function pickRandomPrompts(
	prompts: { icon: string; text: string }[],
	count: number,
): { icon: string; text: string }[] {
	const shuffled = [...prompts].sort(() => Math.random() - 0.5);
	return shuffled.slice(0, count);
}
