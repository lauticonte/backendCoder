const fs = require('fs');

pathToCart = __dirname+'/cart.txt';

class Carts {
    async getAllCarts() {
        try {
            const content = await fs.promises.readFile(pathToCart, "utf-8");
            if (!content) {
                const carts = [];
                fs.writeFileSync(pathToCart, JSON.stringify(carts));
                return carts;
            }
            const data = JSON.parse(content);
            return data;
        } catch (error) {
            throw error;
        }
    }

    async getProductsFromCart(id) {
        try {
            const array = await this.getAllCarts().then((res) => res).catch((err) => {
                throw err;
            });
            if (array.length <= 0) {
                return null;
            }
            for (let i = 0; i < array.length; i++) {
                if (array[i].id === id) {
                    return array[i].products;
                }
            }
            return null
        } catch (error) {
            throw error;
        }
    }

    async createCart(obj) {
        try {
            const array = await this.getAllCarts().then((res) => res).catch((err) => {
                throw err;
            });
            obj.timestamp = Date.now();
            if (array.length <= 0) {
                obj.id = 1;
                array.push(obj);
                const data = JSON.stringify(array);
                fs.writeFileSync(pathToCart, data, "utf-8");
                return obj;
            }
            obj.id = array.length + 1;
            array.push(obj);
            const data = JSON.stringify(array);
            fs.writeFileSync(pathToCart, data, "utf-8");
            return obj;
        } catch (error) {
            throw error;
        }
    }

    async addProductToCart(id, product) {
        try {
            const array = await this.getAllCarts().then((res) => res).catch((err) => {
                throw err;
            });
            if(array.length <= 0) {
                return null;
            }
            for (let cart of array) {
                if (cart.id === id) {
                    cart.products.push(product);
                    const data = JSON.stringify(array);
                    fs.writeFileSync(pathToCart, data, "utf-8");
                    return cart;
                }
            }
            return null;
        } catch (error) {
            throw error;            
        }
    }

    async deleteAllCarts() {
        try {
            const array = await this.getAllCarts().then((res) => res).catch((err) => {
                throw err;
            });
            if (array.length <= 1) {
                fs.writeFileSync(pathToCart, JSON.stringify([]));
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteCartById(id) {
        try {
            let array = await this.getAllCarts().then((res) => res).catch((err) => {
                throw err;
            });
            let cartToDelete;
            if (array.length <= 0) {
                return null;
            }
            for (let cart of array) {
                if (cart.id === id) {
                    cartToDelete = cart;
                }
            }
            array = array.filter((obj) => {
                return obj.id !== id;
            });
            for (let i = 0; i < array.length; i++) {
                if (array[i].id > id) {
                    array[i].id -= 1;
                }
            }
            if (!cartToDelete) {
                return null;
            }
            fs.writeFileSync(pathToCart, JSON.stringify(array), "utf-8");
            return cartToDelete;
        } catch (error) {
            throw error;
        }
    }

    async deleteProductFromCart(id, id_prod) {
        try {
            let array = await this.getAllCarts().then((res) => res).catch((err) => {
                throw err;
            });
            let productDeleted;
            if (array.length <= 0) {
                return null;
            }
            for (let cart of array) {
                if (cart.id === id) {
                    cart.products = cart.products.filter((prod) => {
                        productDeleted = prod.id === id_prod ? prod : null;
                        return prod.id != id_prod;
                    });
                }
            }
            if (!productDeleted) {
                return null;
            }
            fs.writeFileSync(pathToCart, JSON.stringify(array), "utf-8");
            return productDeleted;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Carts;
