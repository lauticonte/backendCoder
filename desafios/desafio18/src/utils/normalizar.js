const { normalize, schema, denormalize } = require('normalizr');
const util = require('util')

const author = new schema.Entity('author');
const text = new schema.Entity('text', {
  author: author
});

const print = (obj) => {
  console.log(util.inspect(obj, false, 12, true))
}

function normalizar(mensajes) 
{
  const normalizar = mensajes.map((message) => ({
    author: message.author,
    date: message.date,
    text: message.text,
    id: message.id,
  }));

  const normalizados = normalize(
    { id: 'mensajes', messages: normalizar },
    text
  );
  
  return normalizados
}

const denormalizar = (obj) => {
  return denormalize(obj.result, text, obj.entities)
}
module.exports = {print, normalizar, denormalizar}