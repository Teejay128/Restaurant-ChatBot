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
    const newMessage = `
    <div class="message right">
        <p>${msg}</p>
    </div>
    `
    chatMessages.innerHTML += newMessage
    timeoutFunction(`A reply to ${msg}`)
    chatForm.value = ""
    // chatForm.focus()
})

// Replies the user
function chatbotReply(msg){
    const messageReply = `
    <div class="message left">
        <p>${msg}</p>
    </div>
    `
    chatMessages.innerHTML += messageReply
}

// Makes request to the backend, then calls reply function
function timeoutFunction(msg) {
    const time = Math.floor(Math.random() * 3000)
    setTimeout(() => {
        messageReply(msg)
    }, time)
}