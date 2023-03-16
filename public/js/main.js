const chatMessages = document.querySelector('.chat')
const chatForm = document.querySelector('#message_form')
const textInput = document.querySelector('.text_input')


const socket = io()
chatForm.addEventListener("submit", sendMessage)
let emitter = "mainmenu"

socket.on('message', (question) => {
    let msg = `<p>${question}</p>`

    chatbotReply(msg)
})

socket.on('options', (options) => {
    let msg = ""

    Object.keys(options).forEach((option) => {
        msg += `<li class="option">Enter ${option} to ${options[option]}</li>`
    })

    chatbotReply(msg)
})

socket.on('redirect', (route) => {
    emitter = route
    socket.emit(emitter, "")
    // chatbotReply(text)
})

// User sends a message
function sendMessage(e) {
    e.preventDefault()

    const msg = textInput.value
    textInput.value = ""

    if(msg === "") {
        return
    }

    if (msg === 100) {
        emitter = "mainmenu"
        socket.emit(emitter, "")
        return
    }

    const newMessage = `
        <div class="message right">
            <p>${msg}</p>
        </div>
    `
    
    chatMessages.innerHTML += newMessage
    chatMessages.scrollTop = chatMessages.scrollHeight

    // timeoutFunction(`A reply to ${msg}`)
    socket.emit(emitter, msg)
    console.log(emitter)
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