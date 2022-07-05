const axios = require('axios');

const postProduct = async() => {
  try {
    return await axios.post('http://localhost:8080/api/productos',{
      title: 'Producto de prueba',
      price: 112233,
      thumbnail: 'http://google.com/imagen'
    })
  } catch (error) {
    console.log( `error: ${error}`)
  }
}

const getAll = async() => {
  try {
    return await axios.get('http://localhost:8080/api/productos-test')
  } catch (error) {
    console.log( `error: ${error}`)
  }
}

const getById = async() => {
  try {
    return await axios.get('http://localhost:8080/api/productos/1')
  } catch (error) {
    console.log( `error: ${error}`)
  }
}

const deleteAll = async() => {
  try {
    return await axios.delete('http://localhost:8080/api/productos')
  } catch (error) {
    console.log( `error: ${error}`)
  }
}

const deleteById = async() => {
  try {
    return await axios.delete('http://localhost:8080/api/productos/1')
  } catch (error) {
    console.log( `error: ${error}`)
  }
}

const getProduct = async () => {
  const products = await getAll()
  if (products.data) {
    console.log (products.data);
  }
}

const getProductById = async () => {
  const product = await getById()
  if (product.data) {
    console.log (product.data);
  }
}

postProduct()
getProduct()
getProductById()
deleteById()
deleteAll()