// const loginForm = document.querySelector("#login_form");
// const nameInput = document.querySelector(".name_input");

const chatBody = document.querySelector("#chatBody");
const chatForm = document.querySelector("#chatForm");
const textInput = document.querySelector("#textInput");

const socket = io();
let currentOptions = [];
const prompt = `
	I need you to play the role of a restaurant waiter that is taking an order from a customer.
	Your responses should be short, brief, and incite a reply from the customer.
	Any time you respond with a list of things, do not add any additional statements.
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

chatForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const msg = textInput.value;
	textInput.value = "";

	if (msg == "") {
		return;
	}

	if (textInput.type == "text") {
		sendMessage(msg);
	} else {
		chooseOption(msg);
	}
});

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

	// Change textInput type to number, set appropriate min and max values
	textInput.type = "number";
	textInput.min = 1;
	textInput.max = options.length;
});

// Display the chat on the frontend
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

// Sends user message to the backend
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
	// How do i get this function to access "options"
	textInput.type = "text";
	textInput.max = "";
	textInput.min = "";

	socket.emit("option", currentOptions[msg - 1]);
}

function convertToList(options) {
	let list = `<ul class="list-group list-group-flush">`;

	options.forEach((option) => {
		list += `<li class="list-group-item">${option}</li>`;
	});

	list += "</ul>";

	return list;
}
