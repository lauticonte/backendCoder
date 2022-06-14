const CarritoMongo = require("../modelsMongoose/Carrito");
const InterfaceFactory = require("../Factories/InterfaceFactory");

class CarritoService extends InterfaceFactory {
    constructor() {
        super();
    }

    async listar() {
        try {
          let carritos = await CarritoMongo.find({}).lean();
          return carritos;
        } catch (error) {
          throw error;
        }
      }
    
      async listarId(id) {
        try {
          let carrito = await CarritoMongo.findById(id);
          console.log(carrito)
          return carrito;
        } catch (error) {
          throw error;
        }
      }
    
      async guardar(body) {
        try {
          let carrito = await CarritoMongo.create(body);
          return carrito;
        } catch (error) {
          throw error;
        }
      }

      async agregar(id, id_product) {
        try {
          const carrito = await CarritoMongo.findByIdAndUpdate(id, { $push: { productos: id_product }}, { new: true}).then((carrito) => carrito).catch((err) => {
            throw new Error(err);
          });
          return carrito;
        } catch (error) {
          throw error;
        }
      }
    
      async actualizar(id, newProduct) {
        try {
          let carrito = await CarritoMongo.findByIdAndUpdate(id, newProduct);
          return carrito;
        } catch (error) {
          throw error;
        }
      }
    
      async borrar(id) {
        try {
          let product = await CarritoMongo.findByIdAndDelete(id);
        } catch (error) {
          throw error;
        }
      }
}
    
module.exports = new CarritoService();


//     async createCart(){
//         try {
//             let newCart = await this.collection.create({productos:[]});
//             return {status:"success", message: "Carrito creado", payload: newCart};
//         } catch (error) {
//             return {status:"error", error: err.message};
//         } 
//     }

//     async guardar(id, id_producto){
//         try {
//             let cart = await this.collection.findById(id);
//             cart.productos.push(id_producto);
//             cart.save();
//             return {status:"success", message: "Producto agregado", payload: cart};
//         } catch (error) {
//             return {status:"error", error: err.message};
//         } 
//     }

//     async listarId(id){
//         try {
//             let cart = await this.collection.findById(id);
//             const products = cart.productos;
//             return {status:"success", message: "Productos encontrados", payload: products};
//         } catch (error) {
//             return {status:"error", error: err.message};
//         } 
//     }

//     async deleteProduct(id, id_producto){
//         try{
//             let result = await this.collection.updateOne({_id:id},{$pull:{products:id_producto}})
//             return {status:"success", message:`product deleted at cart ${idNumber}`, payload:result}
//         }catch(err){
//             console.log(err)
//             return {status:"error", message:`Error to delete product ${id_producto} in Cart ${idNumber}: ${err}`}
            
//         }
//     }