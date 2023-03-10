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

    chatbotReply(msg)
})

socket.on('message', (response) => {
    let msg = `<p>${response}</p>`

    chatbotReply(msg)
})

socket.on('redirect', ({ text, route }) => {
    emitter = route
    chatbotReply(text)
})

// socket.on('options', (options) => {
//     let msg = ""
    // const selection = Object.keys(options)
    // selection.forEach((val) => {
    //     msg += `<li class="option">Select ${val} to ${options[val]}</li>`
    // })

//     chatbotReply(msg)
// })

// socket.on('sourceChange', (source) => {
//     emitter = source
//     console.log(emitter)
// })


// User sends a message
function sendMessage(e) {
    e.preventDefault()

    const msg = textInput.value

    // Using regex validation!!!!!!!!!!!!!
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