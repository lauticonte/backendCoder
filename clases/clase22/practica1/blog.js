import { schema, normalize, denormalize } from 'normalizr';

const blog = {
    id:"1",
    title:"Titulo de publicacion",
    description:"Descripcion de la publicacion",
    content:"Hola, este es mi aporte a la comunidad",
    author:{
        id:"1",
        name:"Juan",
    },
    comments:[
        {
            id:"1",
            author:"Alejandro",
            content:"Buen post!"
        },
        {
            id:"2",
            author:"Martin",
            content:"Me gusta el post!"
        }
    ]
}

//PROCESO DE NORMALIZACION//
const author = new schema.Entity('authors');
const comment = new schema.Entity('comments');
const blogSchema = new schema.Entity('blogs', {
    author: author,
    comments: [comment]
})

const normalizedData = normalize(blog, blogSchema);

// console.log(JSON.stringify(normalizedData, null, 2));


//DESNORMALIAZACION//
const normalData = denormalize(normalizedData.result, blogSchema, normalizedData.entities);
console.log(normalData);