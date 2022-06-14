//=========== MODULOS ===========//
const express = require('express');
const Contenedor = require("../managers/contenedor");
//=========== ROUTER ===========//
const router = express.Router();


//=========== MIDDLEWARE ===========//
router.use(express.urlencoded({extended: true}));
router.use(express.json())
router.use((req, res, next) => {
    console.log(`Product Middleware, Time: ${Date.now()}`)
    next()
})

//=========== CONTENEDOR ===========//
let products = new Contenedor("../files/productos.txt");

//=========== RUTAS ===========//
router.get("/", async (req, res, next) => {
  try {
    const productArray = await products
      .getAll()
      .then((resolve) => resolve);
    if (productArray.length === 0) {
      throw new Error("No products");
    }
    res.json(productArray);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await products
      .getById(Number(req.params.id))
      .then((resolve) => resolve);
    if (!product) {
      throw new Error("Product don't found");
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.price || !req.body.thumbnail) {
      throw new Error("Product must have name, price and URL");
    }
    await products.save(req.body).then((resolve) => {
      res.json(`Product ${resolve} succesfully added`);
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const product = await products
      .getById(Number(req.params.id))
      .then((res) => res);
    if (!product) {
      throw new Error("Product don't found");
    }
    await products
      .update(
        Number(req.params.id),
        req.body.title,
        req.body.price,
        req.body.thumbnail
      )
      .then((resolve) => {
        res.json(resolve);
      });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const product = await products
      .getById(Number(req.params.id))
      .then((resolve) => resolve);
    if (!product) {
      throw new Error("Product don't found");
    }
    await products.deleteById(Number(req.params.id)).then((resolve) => {
      res.json(`${product.title} succesfully deleted`);
    });
  } catch (err) {
    next(err);
  }
});

//=========== handeErrors ===========//
function handleErrors(err, req, res, next) {
  console.log(err.message);
  res.status(500).send({ error: err.message });
}
router.use(handleErrors);

module.exports = router;
