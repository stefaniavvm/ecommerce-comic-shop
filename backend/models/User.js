const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    user: { type: String },
    email: { type: String, require: true },
    password: { type: String, require: true },
    confirnPassword: { type: String, require: true },
    role: { type: String },
  },
  {
    timestamps: true,
  }
);
//encriptando contraseña
userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

const User = mongoose.model("User", userSchema);

//exportamos models
module.exports = User;
