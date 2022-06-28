class Producto {
  #id
  #title
  #price
  #thumbnail
  constructor({ id, title, price, thumbnail}) {
    this.id = id
    this.title = title
    this.price = price
    this.thumbnail = thumbnail
  }

  get id() { return this.#id }

  set id(id) {
    if (!id) throw new Error('"id" es un campo requerido')
    this.#id = id
  }

  get title() { return this.#title }

  set title(title) {
    if (!title) throw new Error('"title" es un campo requerido')
    this.#title = title
  }

  get price() { return this.#price }

  set price(price) {
    if (!price) throw new Error('"price" es un campo requerido')
    if (isNaN(price)) throw new Error('"price" debe ser un número')
    this.#price = price
  }

  get thumbnail() { return this.#thumbnail }

  set thumbnail(thumbnail) {
    if (!thumbnail) throw new Error('"thumbnail" es un campo requerido')
    this.#thumbnail = thumbnail
  }
}

module.exports = Producto;