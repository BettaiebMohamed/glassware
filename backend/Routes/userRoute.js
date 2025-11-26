const express = require("express");
const isAuth = require("../Middleware/isAuth")
const isAutho = require("../Middleware/isAutho")
const userRoute = express.Router();
const {
  getUsers,
  postUser,
  putUser,
  deleteUser,
  getOneUser,
  signIn,
} = require("../Controllers/UserController");
userRoute.get("/users", getUsers);
userRoute.get("/users/:id", isAuth,isAutho(['user']), getOneUser);
userRoute.post("/users", postUser);
userRoute.put("/users/:id", putUser);
userRoute.delete("/users/:id",isAuth,isAutho(['admin']), deleteUser);
userRoute.post("/signin", signIn);


module.exports = userRoute;
