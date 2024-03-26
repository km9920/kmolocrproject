import express from "express";
import { deletefile, getAll, getOne, uploadpdffile, uploadimagefile, getDetectedChemPage } from '../controller/uploadController.js';
import pdfUploadMiddleware from '../middleware/pdfUploadMiddleware.js';
import imageUploadMiddleware from '../middleware/imageUploadMiddleware.js'

const uploadRoute = express.Router();

uploadRoute.post("/pdffileupload", pdfUploadMiddleware.single("pdf"), uploadpdffile);
uploadRoute.post("/imagefileupload", imageUploadMiddleware.single("image"), uploadimagefile);
uploadRoute.delete("/delete/:id", deletefile);
uploadRoute.get("/getall", getAll);
uploadRoute.get("/getone/:id", getOne);
uploadRoute.get("/getdetectedchempage/:id", getDetectedChemPage);

export default uploadRoute;