import express from "express";
import { create, deleteUser, getAll, getOne, update } from '../controller/userController.js';

const userRoute = express.Router();

userRoute.post("/create", create);
userRoute.get("/getall", getAll);
userRoute.get("/getone/:id", getOne);
userRoute.put("/update/:id", update);
userRoute.delete("/delete/:id", deleteUser);

export default userRoute;