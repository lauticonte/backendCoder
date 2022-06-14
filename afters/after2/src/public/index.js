fetch('/pets').then(result=>result.json()).then(json=>{
    pets = json.payload;
    let container = document.getElementById('pet-container');
    pets.forEach(pet=>{
        let card = document.createElement('div');
        card.setAttribute('class','pet-card');
        let name = document.createElement('p');
        name.setAttribute('class','pet-text');
        name.innerHTML = pet.name;
        let specie = document.createElement('p');
        specie.setAttribute('class','pet-text');
        specie.innerHTML = pet.specie;
        let img = document.createElement('img');
        img.src=pet.thumbnail;
        card.append(name);
        card.append(specie);
        card.append(img);
        container.append(card);

    })
})






let form = document.getElementById('petForm');
const handleSubmit = (evt,form,route)=>{
    evt.preventDefault();
    let formData = new FormData(form);
    fetch(route,{
        method:"POST",
        body:formData
    }).then(result=>result.json()).then(json=>console.log(json))
    form.reset();
}

form.addEventListener('submit',(e)=>handleSubmit(e,e.target,'/pets'))