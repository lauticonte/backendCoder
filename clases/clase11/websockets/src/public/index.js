const socket = io();
let chatBox = document.getElementById('chatBox');

chatBox.addEventListener('keyup',(evt)=>{
    if(evt.key==="Enter"){
        socket.emit('message', chatBox.value)
    }
})

socket.on('history', data => {
    let history = document.getElementById('history');
    let messages = "";
    data.forEach(message => {
        messages = messages + `${message.userId} dice: ${message.message}</br>`;
    })
    history.innerHTML = messages;
    chatBox.value = "";
})