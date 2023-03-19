const chatMessages = document.querySelector('.chat')
const loginForm = document.querySelector('#login_form')
const chatForm = document.querySelector('#message_form')
const textInput = document.querySelector('.text_input')
const nameInput = document.querySelector('.name_input')


const socket = io()

let emitter = "mainmenu"
loginForm.addEventListener("submit", newUser)
chatForm.addEventListener("submit", sendMessage)


socket.on('message', (question) => {
    let msg = `${question}`

    chatbotReply(msg)
})

socket.on('options', ({ options, divider }) => {
    let msg = ""

    Object.keys(options).forEach((option) => {
        msg += `<li class="option">Enter ${option} ${divider} ${options[option]}</li>`
    })

    chatbotReply(msg)
})

socket.on('redirect', ({ route, text }) => {
    emitter = route
    socket.emit(emitter, text)
    // chatbotReply(text)
})


function newUser(e) {
    e.preventDefault()

    chatMessages.innerHTML = ""
    loginForm.style.display = "none"
    chatForm.style.display = "block"
    let username = nameInput.value

    socket.emit('startChat', username)
}

// User sends a message
function sendMessage(e) {
    e.preventDefault()

    const msg = textInput.value
    textInput.value = ""
    if(msg === "") {
        return
    }

    if (msg == 100) {
        emitter = "mainmenu"
        socket.emit(emitter, "")
    } else {
        socket.emit(emitter, msg)
    }

    const newMessage = `
        <div class="message right">
            <p>${msg}</p>
        </div>
    `
    
    chatMessages.innerHTML += newMessage
    chatMessages.scrollTop = chatMessages.scrollHeight

    // timeoutFunction(`A reply to ${msg}`)
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