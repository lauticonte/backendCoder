const fs = require('fs');

const pathToProducts = __dirname+'/products.txt';

class Container {
    async getAllProducts() {
        try {
            const content = await fs.promises.readFile(pathToProducts, "utf-8");
            if (!content) {
                const products = [];
                fs.writeFileSync(pathToProducts, JSON.stringify(products));
                return products;
            }
            const data = JSON.parse(content);
            return data;
        } catch (error) {
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const array = await this.getAllProducts().then((res) => res).catch((err) => {
                throw err;
            });
            if (array.length <= 0) {
                return null;
            }
            for (let i = 0; i < array.length; i++) {
                if (array[i].id === id) {
                    return array [i];
                }
            }
            return null;
        } catch (error) {
            throw error;
            
        }
    }

    async saveProducts(obj) {
        try {
            const array = await this.getAllProducts().then((res) => res).catch((err) => {
                throw err;
            });
            obj.timestamp = Date.now();
            if (array.length <= 0) {
                obj.id = 1;
                array.push(obj);
                const data = JSON.stringify(array);
                fs.writeFileSync(pathToProducts, data, "utf-8");
                return obj;
            }
            obj.id = array.length+1;
            array.push(obj);
            const data = JSON.stringify(array);
            fs.writeFileSync(pathToProducts, data, "utf-8");
            return obj;
        } catch (error) {
            throw error;            
        }
    }

    async deleteAllProducts() {
        try {
            const array = await this.getAllProducts().then((res) => res).catch((err) => {
                throw err;
            });
            if (array.length >= 1){
                fs.writeFileSync(pathToProducts, JSON.stringify([]));
            }            
        } catch (error) {
            throw error;            
        }
    }

    async deleteProductById(id) {
        try {
            let array = await this.getAllProducts().then((res) => res).catch((err) => {
                throw err;
            });
            if (array.length >= 1){
                array = array.filter((obj) => {
                    return obj.id !== id;
                });
                for (let i = 0; i < array.length; i++) {
                    if (array[i].id > id) {
                        array[i].id -= 1;
                    }
                }
                fs.writeFileSync(pathToProducts, JSON.stringify(array), "utf-8");
            } 
        } catch (error) {
            throw error;            
        }
    }

    async updateProduct(id, title, description, code, price, thumbnail, stock) {
        try {
            const products = await this.getAllProducts().then((res)=> res).catch((error) => {
                throw error;
            });
            products.map((product) => {
                if (product.id === id) {
                    product.title = title ? title : product.title;
                    product.description = description ? description : product.description;
                    product.code = code ? code : product.code;
                    product.price = price ? price : product.price;
                    product.thumbnail = thumbnail ? thumbnail : product.thumbnail;
                    product.stock = stock ? stock : product.stock;
                }
            });
            await this.deleteAllProducts();
            fs.writeFileSync(pathToProducts, JSON.stringify(products), "utf-8");
            const updatedProduct = await this.getProductById(id).then((res)=> res);
            return updatedProduct;
        } catch (error) {
            throw error;            
        }
    }
}

module.exports = Container;