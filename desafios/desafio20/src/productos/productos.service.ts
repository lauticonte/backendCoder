import { Injectable } from '@nestjs/common';
import { Producto } from 'src/productos/interfaces/producto.interface';

@Injectable()
export class ProductosService {
  private readonly producto: Producto[] =[];
  
  getAll():Producto[] {
    return this.producto;
  }
  
  save(producto:Producto) {
    let id = this.producto.length + 1;
    let nuevoProducto = {...producto, id: id}
    this.producto.push(nuevoProducto);
  }
  
  delete():Producto[] {
    let productosABorrar = this.producto;
    productosABorrar.splice(0, productosABorrar.length);
    return this.producto;
  }

  update(id, producto:Producto) {
    let productIndex = this.producto.findIndex((product => product.id === parseInt(id)));
    
    let productUpdated = {...producto, id: productIndex+1}
    this.producto[productIndex] = productUpdated;
    return this.producto;
  }
}
