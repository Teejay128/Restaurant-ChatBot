const chat = document.querySelector('.chat')
const message_form = document.querySelector('#message_form')
const text_input = document.querySelector('.text_input')

message_form.addEventListener("submit", newRequest)

// User enters a message
function newRequest(e) {
    e.preventDefault()

    const msg = text_input.value
    const newMessage = `
    <div class="message right">
        <p>${msg}</p>
    </div>
    `
    chat.innerHTML += newMessage
    timeoutFunction(`A reply to ${msg}`, 1000)
    text_input.value = ""
}

// Replies the user
function reply(msg){
    const messageReply = `
    <div class="message left">
        <p>${msg}</p>
    </div>
    `
    chat.innerHTML += messageReply
}

// Makes request to the backend, then calls reply function
function timeoutFunction(msg, time) {
    setTimeout(() => {
        reply(msg)
    }, time)
}