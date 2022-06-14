const template = Handlebars.compile(`<ul>
<li>{{nombre}}</li>
<li>{{apellido}}</li>
<li>{{edad}}</li>
<li>{{email}}</li>
<li>{{telefono}}</li>
</ul>`)

const html = template({
    nombre:"Lautaro",
    apellido:"Conte",
    edad:21,
    email:"correoLautaro",
    telefono:"12344523"
})

document.getElementById('data').innerHTML = html;