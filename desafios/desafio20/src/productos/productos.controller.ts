import {Body, Controller, Get, Put, Delete, Post, Param} from '@nestjs/common';
import { ProductoDto } from './dto/producto.dto'
import { Producto } from 'src/productos/interfaces/producto.interface';
import { ProductosService } from './productos.service';

@Controller('productos')
export class ProductosController {
  constructor(private readonly ProductosService:ProductosService){}

  @Post()
  async save(@Body() saveProducts: ProductoDto){
    this.ProductosService.save(saveProducts)
  }
  
  @Get()
  async getAll(): Promise<Producto[]> {
    return this.ProductosService.getAll();
  }
  
  @Delete()
  async delete(): Promise<Producto[]>{
    return this.ProductosService.delete();
  }

  @Put(':id')
  async update(@Param() params, @Body() actualizarProducto: ProductoDto){
    this.ProductosService.update(params.id, actualizarProducto)
  }
}
