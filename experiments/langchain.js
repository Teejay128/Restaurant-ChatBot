const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { HumanMessage, SystemMessage } = require("@langchain/core/messages");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
require("dotenv").config();

const model = new ChatGoogleGenerativeAI({
	modelName: "gemini-1.5-flash",
	apiKey: process.env.GOOGLE_API_KEY,
});
const parser = new StringOutputParser();

async function main(text) {
	const systemTemplate = "Translate the following into {language}:";
	const promptTemplate = ChatPromptTemplate.fromMessages([
		["system", systemTemplate],
		["user", "{text}"],
	]);

	const chain = promptTemplate.pipe(model).pipe(parser);
	const response = await chain.invoke({
		language: "french",
		text,
	});

	console.log(response);
}

main("How are you doing?");
