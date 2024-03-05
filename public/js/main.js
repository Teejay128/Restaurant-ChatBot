// const loginForm = document.querySelector("#login_form");
// const nameInput = document.querySelector(".name_input");

const chatBody = document.querySelector("#chatBody");
const chatForm = document.querySelector("#chatForm");
const textInput = document.querySelector("#textInput");

const chatHistory = [
	{
		role: "user",
		parts: "I need you to play the role of a restaurant waitress that is taking my order, keep your responses short and brief",
	},
	{
		role: "model",
		parts: "Sure, I can do that for you. Welcome. What would you like to eat?",
	},
];

const socket = io();

chatForm.addEventListener("submit", sendMessage);

socket.on("reply", (msg) => {
	chatbotReply(msg);
});

// socket.on("message", (question) => {
// 	let msg = `${question}`;

// 	chatbotReply(msg);
// });

// socket.on("options", ({ options, divider }) => {
// 	let msg = "";

// 	Object.keys(options).forEach((option) => {
// 		msg += `<li class="option">Enter ${option} ${divider} ${options[option]}</li>`;
// 	});

// 	chatbotReply(msg);
// });

// socket.on("redirect", ({ route, text }) => {
// 	emitter = route;
// 	socket.emit(emitter, text);
// 	// chatbotReply(text)
// });

// // Starts the chat in the backend
// function newUser(e) {
// 	e.preventDefault();

// 	// chatBody.innerHTML = "";
// 	// loginForm.style.display = "none";
// 	// chatForm.style.display = "block";
// 	// let username = nameInput.value;
// 	// let msg = `Hi ${username}, you are being redirected to the main menu`;
// 	// chatbotReply(msg);

// 	socket.emit("startChat", username);
// }

// Display the chat on the frontend
function displayChat(chatObj) {
	let newChat;
	if (chatObj.role == "user") {
		newChat = `
			<div class="d-flex flex-row justify-content-end mb-4">
				<div class="p-2 me-3 border rounded bg-light">
					<p class="small mb-0">${chatObj.parts}</p>
				</div>
				<img
					src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
					alt="avatar 1"
					style="width: 45px; height: 100%;"
				/>
			</div>
			`;
	} else {
		newChat = `
			<div class="d-flex flex-row justify-content-start mb-4">
				<img
					src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
					alt="avatar 1"
					style="width: 45px; height: 100%;"
				/>
				<div class="p-2 ms-3 bg-secondary text-white rounded">
					<p class="small mb-0">${chatObj.parts}</p>
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

	if (msg === "") {
		return;
	}

	// Add message to the Array
	const newMessage = {
		role: "user",
		parts: msg,
	};

	socket.emit("message", { msg, chatHistory });

	chatHistory.push(newMessage);
	displayChat(newMessage);
}

// Gets the reply from the backend and displays it to the User
function chatbotReply(text) {
	// Add text to the array
	const newReply = {
		role: "model",
		parts: text,
	};

	chatHistory.push(newReply);
	displayChat(newReply);
}
