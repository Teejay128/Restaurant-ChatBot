const chatMessages = document.querySelector('.chat')
const chatForm = document.querySelector('#message_form')
const textInput = document.querySelector('.text_input')

const socket = io()

socket.on('message', (msg) => {
    chatbotReply(msg.text, msg.time)
})

// User enters a message
chatForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const msg = textInput.value
    if(msg === ""){
        return
    }
    socket.emit("request", msg)

    const newMessage = `
        <div class="message right">
            <p>${msg}</p>
        </div>
    `
    chatMessages.innerHTML += newMessage
    textInput.value = ""
    // timeoutFunction(`A reply to ${msg}`)
})

// Replies the user
function chatbotReply(text, time){
    const messageReply = `
        <div class="message left">
            ${text}
            <p class="time">${time}</p>
        </div>
    `
    chatMessages.innerHTML += messageReply
    chatMessages.scrollTop = chatMessages.scrollHeight
}

// Makes request to the backend, then calls reply function
function timeoutFunction() {
    // this handles message loader and other functionality for delivering response
}