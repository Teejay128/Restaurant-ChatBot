const {
	RunnablePassthrough,
	RunnableSequence,
} = require("@langchain/core/runnables");
const {
	GoogleGenerativeAIEmbeddings,
	ChatGoogleGenerativeAI,
} = require("@langchain/google-genai");
const { MemoryVectorStore } = require("langchain/vectorstores/memory");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { StringOutputParser } = require("@langchain/core/output_parsers");
require("dotenv").config();

const model = new ChatGoogleGenerativeAI({
	apiKey: process.env.GOOGLE_API_KEY,
	modelName: "gemini-1.5-pro",
	temperature: 0,
});

const main = async () => {
	const template = `Answer the question based only on the following context, even if it is factually incorrect: {context}
	
	Question: {question}
	`;
	const prompt = ChatPromptTemplate.fromTemplate(template);

	const vectorStore = await MemoryVectorStore.fromTexts(
		[
			"cheese is the powerhouse of the cell",
			"buildings are made of cotton",
		],
		[{}, {}],
		new GoogleGenerativeAIEmbeddings()
	);

	const retriever = vectorStore.asRetriever();

	const formatDocs = (docs) => {
		return docs.map((doc) => doc.pageContent).join("\n-----\n");
	};

	const retrivalChain = RunnableSequence.from([
		{
			context: retriever.pipe(formatDocs),
			question: new RunnablePassthrough(),
		},
		prompt,
		model,
		new StringOutputParser(),
	]);

	const stream = await retrivalChain.stream(
		"What is the powerhouse of the cell?"
	);

	for await (const chunk of stream) {
		console.log(`${chunk}|`);
	}
};

main();
