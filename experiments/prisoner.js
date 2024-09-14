const { GoogleLLM, ChatGoogle } = require("@langchain/google-gauth");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const { HumanMessageChunk } = require("@langchain/core/messages");
const fs = require("fs");
require("dotenv").config();

const model = new ChatGoogle({
	apiKey: process.env.API_KEY,
	modelName: "gemini-1.5-flash",
});
const outputParser = new StringOutputParser();

const getJoke = async (topic) => {
	const template = `Tell me a short joke about ${topic}.`;
	const prompt = ChatPromptTemplate.fromMessages([
		[
			"system",
			"You are a comedian and your specialty is telling jokes about a topic.",
		],
		["human", template],
	]);

	const chain = prompt.pipe(model).pipe(outputParser);

	const response = await chain.invoke({
		prompt,
	});

	return response;
};

const fileNameToDataUrl = (filename) => {
	const buffer = fs.readFileSync(filename);
	const base64 = buffer.toString("base64");

	const mimeType = "image/jpeg";
	const url = `data:${mimeType};base64,${base64}`;
	return url;
};

const buildPrompt = (dataUrl) => {
	const message = [
		{
			type: "text",
			text: "What is in this image?",
		},
		{
			type: "image_url",
			image_url: dataUrl,
		},
	];

	const messages = [new HumanMessageChunk({ content: message })];
	const template = ChatPromptTemplate.fromMessages(messages);
	return template;
};

const describeImageFile = async (fileName) => {
	const dataUrl = fileNameToDataUrl(fileName);
	const prompt = buildPrompt(dataUrl);

	const chain = prompt.pipe(model).pipe(outputParser);

	const response = await chain.invoke();
	return response;
};

const fileName = "./public/assets/images/chatbot.jpg";
describeImageFile(fileName).then((text) => console.log(text));
