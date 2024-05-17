require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

async function geminiChat(msg, history) {
	try {
		const chat = model.startChat({
			history,
			generationConfig: {
				maxOutputTokens: 100,
			},
		});

		const result = await chat.sendMessage(msg);
		const response = result.response;
		const text = response.text();
		return text;
	} catch (error) {
		console.log(error);
	}
}

// // To test if the gemini api connection is functional
// const msg = "What are the top five desserts available.";
// const history = [
// 	{
// 		role: "user",
// 		parts: "I need you to play the role of a restaurant waitress that is taking my order, keep your responses short and brief",
// 	},
// 	{
// 		role: "model",
// 		parts: "Sure, I can do that for you. Welcome. What would you like to eat?",
// 	},
// ];

// geminiChat(msg, history).then((response) => console.log(response));

module.exports = {
	geminiChat,
};
