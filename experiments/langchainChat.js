const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { InMemoryChatMessageHistory } = require("@langchain/core/chat_history");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { HumanMessage, AIMessage } = require("@langchain/core/messages");
const {
	RunnableWithMessageHistory,
	RunnablePassthrough,
	RunnableSequence,
} = require("@langchain/core/runnables");
require("dotenv").config();

const filterMessages = (input) => input.chat_history.slice(-10);

const model = new ChatGoogleGenerativeAI({
	apiKey: process.env.GOOGLE_API_KEY,
	modelName: "gemini-1.5-flash",
	temperature: 0,
});

async function main() {
	const messageHistories = {};

	const prompt = ChatPromptTemplate.fromMessages([
		[
			"system",
			`You are a helpful assistant who remembers all details the user shares with you.`,
		],
		["placeholder", "{chat_history}"],
		["human", "{input}"],
	]);

	const chain = prompt.pipe(model);
	const chain2 = RunnableSequence.from([
		RunnablePassthrough.assign({
			chat_history: filterMessages,
		}),
		prompt,
		model,
	]);

	const messages = [
		new HumanMessage({ content: "hi! I'm bob" }),
		new AIMessage({ content: "hi!" }),
		new HumanMessage({ content: "I like vanilla ice cream" }),
		new AIMessage({ content: "nice" }),
		new HumanMessage({ content: "whats 2 + 2" }),
		new AIMessage({ content: "4" }),
		new HumanMessage({ content: "thanks" }),
		new AIMessage({ content: "No problem!" }),
		new HumanMessage({ content: "having fun?" }),
		new AIMessage({ content: "yes!" }),
		new HumanMessage({ content: "That's great!" }),
		new AIMessage({ content: "yes it is!" }),
	];

	const withMessageHistory = new RunnableWithMessageHistory({
		runnable: chain2,
		getMessageHistory: async (sessionId) => {
			if (messageHistories[sessionId] === undefined) {
				const messageHistory = new InMemoryChatMessageHistory();
				await messageHistory.addMessages(messages);
				messageHistories[sessionId] = messageHistory;
			}
			return messageHistories[sessionId];
		},
		inputMessagesKey: "input",
		historyMessagesKey: "chat_history",
	});

	const config = {
		configurable: {
			sessionId: "abc1",
		},
	};

	const stream = await withMessageHistory.stream(
		{
			input: "Okay then, tell me a joke.",
		},
		config
	);

	for await (const chunk of stream) {
		console.log("|", chunk.content);
	}
}

main();
