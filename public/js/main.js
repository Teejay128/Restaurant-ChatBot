const chatMessages = document.querySelector('.chat')
const chatForm = document.querySelector('#message_form')
const textInput = document.querySelector('.text_input')

let emiiter = "mainmenu"

const socket = io()

socket.on('message', (response) => {
    let msg = `<h3>${response}</h3>`

    chatbotReply(msg)
})

socket.on('options', (options) => {

    console.log(options)
})

// User enters a message
chatForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let destiantion = emiiter

    const msg = textInput.value
    if(msg === ""){
        return
    }

    socket.emit(destiantion, msg)

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