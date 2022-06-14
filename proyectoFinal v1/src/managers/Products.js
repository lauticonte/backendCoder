const Container = require('../models/Container');
let products = new Container('../models/products.txt');

const getProducts = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            const productArray = await products.getAllProducts().then((resolve) => resolve);
            console.log(productArray);
            if (productArray.length <= 0) {
                throw new Error("There are no products");
            }
            res.json({"products": productArray});
        } else {
            const product = await products.getProductById(+id).then((resolve) => resolve);
            if (!product) {
                throw new Error("Product not found");
            }
            res.json(product);
        }
    } catch (error) {
        next(error);        
    }
}

const postProducts = async (req, res, next) => {
    try {
        const { title, description, code, price, thumbnail, stock } = req.body;
        const validNames = /^[a-zA-Z0-9ÑñÁáÉéÍíÓóÚú\s]+$/;
        if (!title || !description || !code || !price || !thumbnail || !stock) {
            throw new Error("Your product must have name, description, code, price, URL and stock")
        }
        if (price <= 0) {
            throw new Error("Price must be higher than 0")
        }
        if (!validNames.exec(title)) {
            throw new Error("Title only must have letters, numbers and spaces");
        }
        if (!validNames.exec(description)) {
            throw new Error("Description only must have letters, numbers and spaces");
        }
        await products.saveProducts(req.body).then((resolve) => {
            res.json(resolve);
        });
    } catch (error) {
        next(error);
    }
}

const putProducts = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { title, description, code, price, thumbnail, stock } = req.body;
        const validNames = /^[a-zA-Z0-9ÑñÁáÉéÍíÓóÚú\s]+$/;
        const product = await products.getProductById(+id).then((res) => res);
        if (!product) {
            throw new Error("Product not found");
        }
        if (price <= 0) {
            throw new Error("Price must be higher than 0")
        }
        if (title && !validNames.exec(title)) {
            throw new Error("Title only must have letters, numbers and spaces");
        }
        if (description && !validNames.exec(description)) {
            throw new Error("Description only must have letters, numbers and spaces");
        }
        await products.updateProduct(
            +id,
            title,
            description,
            code,
            price,
            thumbnail,
            stock
        ).then((resolve) => {
            res.json(resolve);
        });
    } catch (error) {
        next(error);
    }
}

const deleteProducts = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await products.getProductById(+id).then((resolve) => resolve);
        if (!product) {
            throw new Error("Product not found")
        }
        await products.deleteProductById(+id).then((resolve) => {
            res.json(`${product.title} succesfully deleted`);
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { getProducts, postProducts, putProducts, deleteProducts };