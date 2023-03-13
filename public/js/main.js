const chatMessages = document.querySelector('.chat')
const chatForm = document.querySelector('#message_form')
const textInput = document.querySelector('.text_input')


const socket = io()
chatForm.addEventListener("submit", sendMessage)
let emitter = "mainmenu"

socket.on('response', ({ question, options}) => {
    let msg = `<p>${question}</p>`

    Object.keys(options).forEach((option) => {
        msg += `<li class="option">Select ${option} to ${options[option]}</li>`
    })
    msg += `<li class="option">Select 100 to Go to main menu</li>`

    chatbotReply(msg)
})

socket.on('message', (response) => {
    let msg = `<p>${response}</p>`

    chatbotReply(msg)
})

socket.on('redirect', ({ text, route }) => {
    emitter = route
    socket.emit(emitter, text)
    // chatbotReply(text)
})

// User sends a message
function sendMessage(e) {
    e.preventDefault()

    const msg = textInput.value

    if(msg === ""){
        return
    }

    const newMessage = `
        <div class="message right">
            <p>${msg}</p>
        </div>
    `
    chatMessages.innerHTML += newMessage
    textInput.value = ""

    // timeoutFunction(`A reply to ${msg}`)
    socket.emit(emitter, msg)
}


// Replies the user
function chatbotReply(text){
    const messageReply = `
        <div class="message left">
            ${text}
        </div>
    `
    chatMessages.innerHTML += messageReply
    chatMessages.scrollTop = chatMessages.scrollHeight
}


// Makes request to the backend, then calls reply function
function timeoutFunction() {
    // this handles message loader and other functionality for delivering response
}