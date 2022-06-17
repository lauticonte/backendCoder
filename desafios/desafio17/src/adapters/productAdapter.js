class ProductAdapter {
  #producto

  constructor(producto) {
    this.producto = producto
  }
  textoPlano() {
    const lines = []
    lines.push(`id: ${this.producto.id}`);
    lines.push(`title: ${this.producto.title}`);
    lines.push(`price: ${this.producto.price}`);
    lines.push(`thumbnail: ${this.producto.thumbnail}`);
    return lines.join('\n')
  }
}

module.exports = ProductAdapter;