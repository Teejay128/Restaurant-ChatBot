const moment = require('moment')

function optionsResponse(msg) {
    const options = ["Poor", "Bad", "Average", "Good", "Excellent"]
    let response = `<h3>${msg}</h3>`
    for(let i = 0; i < options.length; i++){
        response += `\n<p>${i + 1}. ${options[i]}</p>`
    }

    return formatMessage(response)
}


function formatMessage(text) {
    return {
        text,
        time: moment().format('h:mm a')
    }
}

module.exports = optionsResponse
console.log(optionsResponse("What the fuck just happened"))
