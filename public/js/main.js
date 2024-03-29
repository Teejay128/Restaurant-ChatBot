// const loginForm = document.querySelector("#login_form");
// const nameInput = document.querySelector(".name_input");

const chatBody = document.querySelector("#chatBody");
const chatForm = document.querySelector("#chatForm");
const textInput = document.querySelector("#textInput");

const socket = io();
const prompt = `
	I need you to play the role of a restaurant waiter that is taking an order from a customer.
	Your responses should be short, brief, and incite a reply from the customer.
	When you need to respond with a list of things, do not add any additional statements.
	Separate the list items with an asterisk, and don't include any whitespace.
	For Example:
	User: What are your top 5 starters?
	Model: *Bruschetta*Calamari Fritti*Mozzarella Sticks*Soup of the Day*Chicken Wings
`;
const chatHistory = [
	{
		role: "user",
		parts: prompt,
	},
	{
		role: "model",
		parts: "Sure, I can do that for you. Welcome. What would you like to eat?",
	},
];

chatForm.addEventListener("submit", sendMessage);

// Gets the reply from the backend and displays it to the User
socket.on("reply", (msg) => {
	const newReply = {
		role: "model",
		parts: msg,
	};

	chatHistory.push(newReply);
	newReply.parts = `<p class="small mb-0">${msg}</p>`;
	displayMessage(newReply);
});

// Displays options for the user to choose from
socket.on("option", (reply) => {
	let options = reply.split("*");
	options.shift();

	const newReply = {
		role: "model",
		parts: reply,
	};

	chatHistory.push(newReply);
	newReply.parts = convertToList(options);
	displayMessage(newReply);

	// Also configue next response to pertain to option
});

// Display the chat on the frontend
function displayMessage(chatObj) {
	let newChat;
	if (chatObj.role == "user") {
		// Might remove the profile images in the chat
		newChat = `
			<div class="d-flex flex-row justify-content-end mb-4">
				<div class="p-2 me-3 rounded text-white bg-secondary">
					<p class="small mb-0">${chatObj.parts}</p>
				</div>
			</div>
			`;
	} else {
		newChat = `
			<div class="d-flex flex-row justify-content-start mb-4">
				<div class="p-2 ms-3 bg-light border rounded">
					${chatObj.parts}
				</div>
			</div>
			`;
	}

	chatBody.innerHTML += newChat;

	textInput.scrollIntoView({
		behavior: "smooth",
		block: "center",
		inline: "center",
	});
}

// Sends user message to the backend
function sendMessage(e) {
	e.preventDefault();

	const msg = textInput.value;
	textInput.value = "";

	if (msg == "") {
		// Also send error message
		return;
	}

	// TWO DIFFERENT CASES

	// NORMAL MESSAGE
	if (typeof msg == "string") {
		// Add message to the Array
		const newMessage = {
			role: "user",
			parts: msg,
		};
		socket.emit("message", { msg, chatHistory });
		chatHistory.push(newMessage);
		displayMessage(newMessage);
	}

	// // NUMBER MESSAGE
	// if (typeof msg == "number") {
	// 	// Get the selected number
	// 	// Send that to the backend
	// 	const optionList = [];

	// 	const option = optionList[msg - 1];

	// 	// Add message to the Array
	// 	const newMessage = {
	// 		role: "user",
	// 		parts: `${msg - 1}: ${option}`,
	// 	};

	// 	socket.emit("message", { msg: option, chatHistory });
	// 	chatHistory.push(newMessage);
	// 	displayMessage(newMessage);
	// }
}

function convertToList(options) {
	let list = "";

	options.forEach((option, index) => {
		list += `<li>${index + 1}: ${option}</li>`;
	});

	list += "<p>Please Pick A Number</p>";

	return list;
}
