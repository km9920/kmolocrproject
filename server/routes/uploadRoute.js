import express from "express";
import { deletefile, getAll, getOne, uploadfile } from '../controller/uploadController.js';
import uploadMiddleware from '../middleware/uploadMiddleware.js';

const uploadRoute = express.Router();

uploadRoute.post("/fileupload", uploadMiddleware.single("pdf"), uploadfile);
uploadRoute.delete("/delete/:id", deletefile);
uploadRoute.get("/getall", getAll);
uploadRoute.get("/getone/:id", getOne);

export default uploadRoute;