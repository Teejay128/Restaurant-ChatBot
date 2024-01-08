// const loginForm = document.querySelector("#login_form");
// const nameInput = document.querySelector(".name_input");

const chatBody = document.querySelector("#chatBody");
const chatForm = document.querySelector("#chatForm");
const textInput = document.querySelector("#textInput");
const sendButton = document.querySelector("sendButton");

const socket = io();

let emitter = "mainmenu";
// loginForm.addEventListener("submit", newUser);
chatForm.addEventListener("submit", sendMessage);

socket.on("reply", (msg) => {
	chatbotReply(msg);
});

socket.on("message", (question) => {
	let msg = `${question}`;

	chatbotReply(msg);
});

socket.on("options", ({ options, divider }) => {
	let msg = "";

	Object.keys(options).forEach((option) => {
		msg += `<li class="option">Enter ${option} ${divider} ${options[option]}</li>`;
	});

	chatbotReply(msg);
});

socket.on("redirect", ({ route, text }) => {
	emitter = route;
	socket.emit(emitter, text);
	// chatbotReply(text)
});

// function newUser(e) {
// 	e.preventDefault();

// 	chatBody.innerHTML = "";
// 	loginForm.style.display = "none";
// 	chatForm.style.display = "block";
// 	let username = nameInput.value;
// 	let msg = `Hi ${username}, you are being redirected to the main menu`;
// 	chatbotReply(msg);

// 	socket.emit("startChat", username);
// }

// User sends a message
function sendMessage(e) {
	e.preventDefault();

	const msg = textInput.value;
	textInput.value = "";
	textInput.scrollIntoView({
		behavior: "smooth",
		block: "center",
		inline: "center",
	});

	if (msg === "") {
		return;
	}

	const newMessage = `
	<div class="d-flex flex-row justify-content-end mb-4">
	<div class="p-2 me-3 border rounded bg-light">
		<p class="small mb-0">${msg}</p>
	</div>
	<img
		src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
		alt="avatar 1"
		style="width: 45px; height: 100%;"
	/>
	</div>
	`;

	chatBody.innerHTML += newMessage;

	// setTimeout(() => chatbotReply("OH, thats rude of you to say"), 2000);

	socket.emit("message", msg);
	// // Now emit the request to the backend
	// if (msg == 100) {
	// 	emitter = "mainmenu";
	// 	socket.emit(emitter, "");
	// } else {
	// 	socket.emit(emitter, msg);
	// }
}

// Replies the user
function chatbotReply(text) {
	const messageReply = `
	<div class="d-flex flex-row justify-content-start mb-4">
		<img
			src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
			alt="avatar 1"
			style="width: 45px; height: 100%;"
		/>
		<div class="p-2 ms-3 bg-secondary text-white rounded">
			<p class="small mb-0">${text}</p>
		</div>
	</div>
    `;

	chatBody.innerHTML += messageReply;
	textInput.scrollIntoView({
		behavior: "smooth",
		block: "center",
		inline: "center",
	});
}
