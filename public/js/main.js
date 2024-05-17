// Click to select functionality
// Suggested Requests
// Login and signup
// Do some frontend polishing and testing
// Process how the final check out is done

// ELEMENTS
const chatBody = document.querySelector("#chatBody");
const chatForm = document.querySelector("#chatForm");
const textInput = document.querySelector("#textInput");
const modalBtn = document.querySelector(".modalBtn");
const accordion = document.querySelector(".accordion");
const orderCard = document.querySelector(".orderCard");
const bill = document.querySelector(".bill");

// VARIABLES
const socket = io();
let currentOptions = [];
let chatHistory = [];

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

// SOCKET LISTENERS
socket.on("reply", (msg) => {
	const newReply = {
		role: "model",
		parts: msg,
	};

	chatHistory.push(newReply);
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

socket.on("order", (orders) => {
	if (!orders.length) {
		bill.innerHTML = `<p class="text-secondary text-center">Your orders will show up here</p>`;
		return;
	}

	let total = 0;
	let orderList = [];

	orders.forEach((order) => {
		console.log(order);
		let item = order.split("$");
		let orderItem = `${item[0]} <span class="float-end">$${item[1]}</span>`;
		total += parseFloat(item[1]);

		orderList.push(orderItem);
	});

	orderList.push(`Total: <span class="float-end text-info">$${total}</span>`);

	let billList = convertToList(orderList);
	bill.innerHTML = billList;
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

function convertToList(items) {
	let list = `<ul class="list-group list-group-flush">`;

	items.forEach((item) => {
		list += `<li class="list-group-item option">${item}</li>`;
	});

	list += "</ul>";

	return list;
}

function selectBot(bot) {
	let prompt;
	// Use a switch statement to select the bot
	switch (bot) {
		case "american":
			prompt = "an american";
			break;
		case "french":
			prompt = "a french";
			break;
		case "nigerian":
			prompt = "a nigerian";
			break;
		default:
			prompt = `a`;
	}

	let msg = `
		I need you to play the role of a waiter that is taking the order of a customer at ${prompt} restaurant.
		Your responses should be casual, friendly, and incite a response from the customer
		However, when you are responding with a list of items for the customer to choose from,
		your response should contain only the list of items you are responding with,
		start your response with an asterisk and separate each item with an asterisk.
		For example:
		User: What dishes do you have for starters
		Model: *dish 1 $5.99*dish 2 $6.99*dish 3 $3.59*dish 4 $6.99*dish 5 $12.49
	`;

	chatHistory = [
		{
			role: "user",
			parts: msg,
		},
		{
			role: "model",
			parts: "Sure, I can do that for you. Welcome, would you like to check our starters?",
		},
	];

	modalBtn.classList.remove("d-none");
	orderCard.classList.remove("d-none");
	accordion.classList.add("d-none");
}

function resetChat() {
	modalBtn.classList.add("d-none");
	orderCard.classList.add("d-none");
	accordion.classList.remove("d-none");

	chatHistory = [];
	currentOptions = [];
}

function checkOut() {
	window.alert("Your order has been placed");

	resetChat();
}
