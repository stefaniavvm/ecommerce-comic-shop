const mongoose = require("mongoose");
const Users = require("../models/User");
const database = require("../database");

const users = [
  {
    user: "Marcos villegas",
    email: "marcvill@gmail.com",
    password: "123456.A",
    confirnPassword: "123456.A",
    role: "Admin",
  },
];

const usersDocument = users.map((user) => new Users(user));

database
  .connectDB()
  .then(async () => {
    const allusers = await Users.find();
    if (allusers.length > 0) {
      await Users.collection.drop();
    }
  })
  .catch((err) => console.error(`Error deleting information from DB:${err}`))
  .then(async () => {
    await Users.insertMany(usersDocument);
  })

  //desconectamos
  .catch((err) => console.log(`Error creating documents from DB:${err}`))
  .finally(() => mongoose.disconnect());
