const chatMessages = document.querySelector('.chat')
const chatForm = document.querySelector('#message_form')
const textInput = document.querySelector('.text_input')


const socket = io()
chatForm.addEventListener("submit", sendMessage)
let emitter = "mainmenu"


socket.on('message', (response) => {
    let msg = `<p>${response}</p>`

    chatbotReply(msg)
})

socket.on('options', (options) => {
    let msg = ""
    const selection = Object.keys(options)
    selection.forEach((val) => {
        msg += `<li class="option">Select ${val} to ${options[val]}</li>`
    })

    chatbotReply(msg)
})

socket.on('sourceChange', async (source) => {
    emitter = source
})






// User sends a message
function sendMessage(e) {
    e.preventDefault()

    const msg = textInput.value
    if(msg === ""){
        return
    }

    console.log(emitter)
    socket.emit(emitter, msg)

    const newMessage = `
        <div class="message right">
            <p>${msg}</p>
        </div>
    `
    chatMessages.innerHTML += newMessage
    textInput.value = ""
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