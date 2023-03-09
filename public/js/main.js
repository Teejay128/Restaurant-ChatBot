const chatMessages = document.querySelector('.chat')
const chatForm = document.querySelector('#message_form')
const textInput = document.querySelector('.text_input')

const socket = io()

socket.on('message', (msg) => {
    chatbotReply(msg)
})

// User enters a message
chatForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const msg = textInput.value
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
function chatbotReply(msg){
    const messageReply = `
        <div class="message left">
            <p>${msg}</p>
        </div>
    `
    chatMessages.innerHTML += messageReply
    chatMessages.scrollTop = chatMessages.scrollHeight
}

// Makes request to the backend, then calls reply function
function timeoutFunction() {
    // this handles message loader and other functionality for delivering response

}