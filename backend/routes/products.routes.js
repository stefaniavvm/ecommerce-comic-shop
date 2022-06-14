const express = require("express");

const {
  upload,
  uploadToCloudinary,
} = require("../middlewares/file.middleware");
const Products = require("../models/Products");

//importamos ruta productos
const productsRouter = express.Router();

const products = [
  {
    article: "spiderman funko",
    price: 12,
    Image:
      "https://cdnfuturartshop-9d53.kxcdn.com/83862-large_default/marvel-pop-80%C2%BA-spider-man-593.jpg",
    stock: 15,
    productId: 1,
    isactive: true,
  },

  {
    article: "Daredevil funko",
    price: 12,
    urlImg:
      "https://www.funkotienda.com/wp-content/uploads/2017/02/funko-pop-daredevil.jpg",
    stock: 15,
    productId: 2,
    isactive: true,
  },

  {
    article: "Caballero luna",
    price: 12,
    urlImg:
      "https://funkollection.es/wp-content/uploads/2022/04/figura-Funko-POP-Mr.-Knight-Caballero-Luna-Moon-Knight-Marvel.jpg",
    stock: 15,
    productId: 3,
    isactive: true,
  },

  {
    article: "Lobezno funko",
    price: 12,
    urlImg:
      "https://www.funkotienda.com/wp-content/uploads/2020/05/Funko-Pop-Marvel-X-Men-20th-Wolverine-In-Jacket.jpg",
    stock: 15,
    isactive: true,
    productId: 4,
  },
];

//ENDPOINS  Get
productsRouter.get("/", async (req, res, next) => {
  let filtro = {};
  if (req.query.article) {
    filtro = { ...filtro, article: req.query.article };
  }
  console.log("Filtro de /products", filtro);
  return Products.find(filtro)
    .then((productsLeidos) => {
      return res.status(200).json(productsLeidos);
    })
    .catch((err) => {
      const error = new Error(error);
      error.status = 500;
      return next(error);
    });
});

//GET BY ID

productsRouter.get("/:id", (req, res, next) => {
  const id = req.params.id;
  return Products.findById(id)
    .then((product) => {
      if (!product) {
        const error = new Error("Product not found");
        error.status = 404;
        return next(error);
      }
      return res.status(200).json(product);
    })
    .catch((err) => {
      const error = new Error(err);
      error.status = 500;
      return next(error);
    });
});

//post

productsRouter.post("/", (req, res, next) => {
  const imageProduct = req.file_url ? req.file_url : undefined;
  const newProduct = new Products({
    article: req.body.article,
    price: req.body.price,
    Stock: req.body.Stock,
    urlImage: req.body.urlImage,
    imagen: imageProduct,
  });
  return newProduct
    .save()
    .then(() => {
      return res.status(201).json(newProduct);
    })
    .catch((err) => {
      const error = new Error(err);
      error.status = 500;
      return next();
    });
});

//put
productsRouter.put("/:id", (req, res, next) => {
  const id = req.params.id;
  return Products.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then((productActualizado) => {
      return res.status(200).json(productActualizado);
    })
    .catch((err) => {
      const error = new Error(err);
      error.status = 500;
      return next(error);
    });
});

//DELETE

productsRouter.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  return Products.findByIdAndDelete(id)
    .then(() => {
      return res.status(200).json(`Produc with id: ${id} deleted`);
    })
    .catch((err) => {
      const error = new Error(err);
      error.status = 500;
      return next(error);
    });
});

module.exports = productsRouter;
