import UploadPdf from '../model/uploadPdfModel.js';
import UploadImage from '../model/uploadImageModel.js';
import Detections from "../model/detectionModel.js";
import axios from 'axios';

export const uploadpdffile = async (req, res) => {
    try {

        req.body.fileName = req.file.filename;
        req.body.filePath = req.file.path;
        req.body.fileSize = req.file.size;
        req.body.fileOriginalName = req.file.originalname;

        //const pdfData = await new UploadPdf(req.body);
        //const savedPDF = await pdfData.save();

        const savedPDF =await axios.post("http://121.140.65.24:5000/pdf/predict");
        res.status(200).json(savedPDF);

    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const deletefile = async (req, res) => {
    try {
        
        const id = req.params.id;
        const uploadExist = await UploadPdf.findById(id);
        if(!uploadExist){
            return res.status(404).json({msg: "Uploaded File not exist"});
        }
        await UploadPdf.findByIdAndDelete(id);
        res.status(200).json({msg:"Uploaded File deleted successfully"});

    } catch (error) {
        res.status(500).json({error :error});
    }
}

export const getAll = async(req,res) => {
    try {
        
        const uploadExist = await UploadPdf.find();
        
        if(!uploadExist){
            return res.status(404).json({msg:"Uploaded File data not found"});
        }

        res.status(200).json(uploadExist);

    } catch (error) {
        res.status(500).json({error :err});
    }
}

export const getOne = async (req,res) => {
    try {
        
        const id = req.params.id;
        const uploadExist = await UploadPdf.find({fileOriginalName : `${id}`});
        if(!uploadExist){
            return res.status(404).json({msg: "Uploaded File not found"});
        }
        res.status(200).json(uploadExist);
    } catch (error) {
        res.status(500).json({error :err});
    }
}

export const getDetectedChemPage = async (req,res) => {
    try {
        
        const id = req.params.id;
        const detectionsExist = await Detections.find({pdf_name: `${id}`, class: 'molecule' });
        if(!detectionsExist){
            return res.status(404).json({msg: "Detections not found"});
        }

        const pages = detectionsExist.map(detections => detections.page);
        const pagesurl = detectionsExist.map(detections => detections.page_image_url);
        res.status(200).json({pages, pagesurl});

    } catch (error) {
        res.status(500).json({error :err});
    }
}

export const uploadimagefile = async (req, res) => {
    try {

        req.body.fileName = req.file.filename;
        req.body.filePath = req.file.path;
        req.body.fileSize = req.file.size;
        req.body.fileOriginalName = req.file.originalname;

        const imageData = await new UploadImage(req.body);
        const savedImage = await imageData.save();
        res.status(200).json(savedImage);

    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const deleteimagefile = async (req, res) => {
    try {
        
        const id = req.params.id;
        const uploadExist = await UploadImage.findById(id);
        if(!uploadExist){
            return res.status(404).json({msg: "Uploaded File not exist"});
        }
        await UploadImage.findByIdAndDelete(id);
        res.status(200).json({msg:"Uploaded File deleted successfully"});

    } catch (error) {
        res.status(500).json({error :error});
    }
}

export const getAllimage = async(req,res) => {
    try {
        
        const uploadExist = await UploadImage.find();
        
        if(!uploadExist){
            return res.status(404).json({msg:"Uploaded File data not found"});
        }

        res.status(200).json(uploadExist);

    } catch (error) {
        res.status(500).json({error :err});
    }
}

export const getOneimage = async (req,res) => {
    try {
        
        const id = req.params.id;
        const uploadExist = await UploadImage.find({fileOriginalName : `${id}`});
        if(!uploadExist){
            return res.status(404).json({msg: "Uploaded File not found"});
        }
        res.status(200).json(uploadExist);
    } catch (error) {
        res.status(500).json({error :err});
    }
}