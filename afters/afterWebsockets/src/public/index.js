const socket = io();
let form = document.getElementById("petForm");
form.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    let data = new FormData(form);
    let sendObj = {};
    data.forEach((val,key) => sendObj[key]=val);
    socket.emit("sendPet",sendObj);
    form.reset();
})

socket.on('petlog',(data)=>{
    console.log(data);
})