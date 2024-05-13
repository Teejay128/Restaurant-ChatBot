// Click to select functionality
// Suggested Requests
// Login and signup
// Do some frontend polishing and testing

// ELEMENTS
const chatBody = document.querySelector("#chatBody");
const chatForm = document.querySelector("#chatForm");
const textInput = document.querySelector("#textInput");
const order = document.querySelector(".order");

// VARIABLES
const socket = io();
let confirmOrder = false;
let currentOptions = [];
const prompt = `
	I need you to play the role of a restaurant waiter that is taking an order from a customer.
	Your responses should be short, brief, and incite a reply from the customer.
	Any time you respond with a list of things, do not add any additional statements.
	Separate the list items with an asterisk, and don't include any whitespace.
	For Example:
	User: What are your top 5 starters?
	Model: *Bruschetta $4.99*Calamari Fritti $12.49*Mozzarella Sticks $6.99*Soup of the Day $5.49*Chicken Wings $7.99
`;
const chatHistory = [
	{
		role: "user",
		parts: prompt,
	},
	{
		role: "model",
		parts: "Sure, I can do that for you. Welcome, would you like to check our starters?",
	},
];

// EVENT LISTENERS
chatForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let msg = textInput.value;
	textInput.value = "";

	if (msg == "") {
		return;
	}

	if (textInput.type == "text") {
		sendMessage(msg);
	} else {
		chooseOption(msg);
	}
	confirmOrder = false;
});

chatBody.addEventListener("click", (e) => {
	if (!e.target.classList.contains("option")) {
		return;
	}

	if (textInput.type == "number") {
		let text = e.target.innerText;
		let msg = currentOptions.indexOf(text) + 1;

		chooseOption(msg);
	}
});

order.addEventListener("click", () => {
	if (confirmOrder) {
		// Place the order and proceed to checkout
		console.log("Your order has been placed");
		confirmOrder = false;
		// Restart the page and start afresh or something
		return;
	}

	const newMessage = {
		role: "user",
		parts: "I would like to place an order...",
	};

	displayMessage(newMessage);
	socket.emit("order", chatHistory);
});

// SOCKET LISTENERS
socket.on("reply", (msg) => {
	const newReply = {
		role: "model",
		parts: msg,
	};

	chatHistory.push(newReply);
	// newReply.parts = `<p class="mb-0">${msg}</p>`;
	displayMessage(newReply);
});

socket.on("option", (reply) => {
	const newReply = {
		role: "model",
		parts: reply,
	};

	chatHistory.push(newReply);

	let options = reply.split("*");
	options.shift();
	currentOptions = options;

	const newOption = {
		role: "model",
		parts: convertToList(options),
	};
	displayMessage(newOption);

	textInput.type = "number";
	textInput.min = 1;
	textInput.max = options.length;
});

socket.on("order", (msg) => {
	let newOrder = {
		role: "model",
		parts: msg,
	};

	// What else do I need to do here?

	displayMessage(newOrder);
	confirmOrder = true;
});

// HELPING FUNCTIONS
function displayMessage(chatObj) {
	let newChat;
	if (chatObj.role == "user") {
		// Might remove the profile images in the chat
		newChat = `
			<div class="d-flex flex-row justify-content-end mb-4">
				<div class="p-2 me-3 rounded text-white bg-secondary">
					<div class="small mb-0">${chatObj.parts}</div>
				</div>
			</div>
			`;
	} else {
		newChat = `
			<div class="d-flex flex-row justify-content-start mb-4">
				<div class="p-2 ms-3 bg-light border rounded">
					<div class="small mb-0">${chatObj.parts}</div>
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

function sendMessage(msg) {
	const newMessage = {
		role: "user",
		parts: msg,
	};

	socket.emit("message", { msg, chatHistory });
	chatHistory.push(newMessage);
	displayMessage(newMessage);
}

function chooseOption(msg) {
	textInput.type = "text";
	textInput.max = "";
	textInput.min = "";

	const newMessage = {
		role: "user",
		parts: `I would like number ${msg}`,
	};

	socket.emit("option", { option: currentOptions[msg - 1], chatHistory });
	chatHistory.push(newMessage);
	displayMessage(newMessage);
}

function convertToList(options) {
	let list = `<ul class="list-group list-group-flush">`;

	options.forEach((option) => {
		list += `<li class="list-group-item option">${option}</li>`;
	});

	list += "</ul>";

	return list;
}
