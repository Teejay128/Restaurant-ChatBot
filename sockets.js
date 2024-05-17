/*
 * TODO
 * Add room functionality
 * But with different bots
 * Different languages or styles
 * All so make the orders more straightforward
 * Implement user sessions
 */

const { geminiChat } = require("./gemini");

const socketHandler = (socket) => {
	console.log("Connection successful");

	// const userDevice = socket.request.headers["user-agent"];
	// if (userDevice) {
	// 	socket.request.session.save();
	// }

	const user = {
		name: "Bonheur",
		id: socket.id,
		orders: [],
	};

	socket.on("message", async (newChat) => {
		const { msg, chatHistory } = newChat;

		const reply = await geminiChat(msg, chatHistory);
		// console.log(reply);

		if (!reply) {
			socket.emit(
				"error",
				"An error occured while processing your request"
			);
			return;
		}

		// If model responds with options
		if (reply[0] == "*") {
			socket.emit("option", reply);
			return;
		}

		// If it is just a normal reply
		socket.emit("reply", reply);
	});

	socket.on("option", async (newOption) => {
		const { option, chatHistory } = newOption;

		user.orders.push(option);

		const msg = `Acknoledge that an order for ${option} has been placed, then ask me what else I'd like to order.`;
		const reply = await geminiChat(msg, chatHistory);

		if (!reply) {
			socket.emit(
				"error",
				"An error occured while processing your request"
			);
			return;
		}
		socket.emit("order", user.orders);
		socket.emit("reply", reply);
		// console.log(user);
	});
};

module.exports = socketHandler;
