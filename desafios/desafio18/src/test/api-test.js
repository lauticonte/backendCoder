const req = require('supertest')('http://localhost:8080');
const expect = require('chai').expect;
const generarProducto = require('../utils/generador-productos')
const generarId = require('../utils/generador-ids')

describe('Test api productos', () => {
  describe('save product', () => {
    it('guardar un producto', async () => {
      const producto = generarProducto(generarId())
      const res = await req.post('/api/productos').send(producto)
      expect(res.status).to.equal(200)
      expect(res.body).to.include.keys('title, price, thumbnail')
      expect(res.body.title).to.equal(producto.title)
      expect(res.body.price).to.equal(producto.price)
      expect(res.body.thumbnail).to.equal(producto.thumbnail)
    })
  })

  describe('getAll', () => {
    it('Espected status 200', async () => {
      const res = await req.get('/api/productos-test');
      expect(res.status).to.equal(200);
    })
  })
  describe('getById', () => {
    it('Espected object', async () => {
      const res = await req.get('/api/productos/1')
      expect(res.body).to.equal({id: 1})
      expect(res.status).to.equal(200);
    })
  })
  describe('deleteById', () => {
    it('Borra un producto por su id', async() => {
      const res = await req.delete('/api/productos/1');
      expect(res.status).to.equal(200);
    })
  })
  describe('deleteAll', () => {
    it('Borra todos los productos', async () => {
      const res = await req.delete('/api/productos')
      expect(res.status).to.equal(200)
    })
  })
})