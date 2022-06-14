const mongoose = require("mongoose");
const Products = require("../models/Products");
const database = require("../database");

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

const productsDocument = products.map((product) => new Products(product));

database
  .connectDB()
  .then(async () => {
    const allproducts = await Products.find();
    if (allproducts.length > 0) {
      await Products.collection.drop();
    }
  })
  .catch((err) => console.error(`Error deleting information from DB:${err}`))
  .then(async () => {
    await Products.insertMany(productsDocument);
  })

  //desconectamos
  .catch((err) => console.log(`Error creating documents from DB:${err}`))
  .finally(() => mongoose.disconnect());
