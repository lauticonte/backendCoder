class ProductDto{
  constructor({id, title, price, thumbnail}){
    this.id = id;
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
  }
}

function asProductDto(products) {
  if (Array.isArray(products)){
    return products.map(p => new ProductDto(p));
  }
  else {
    return new ProductDto(products)
  }
}

module.exports = {asProductDto, ProductDto}