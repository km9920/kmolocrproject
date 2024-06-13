import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import UploadPdf from '../model/uploadPdfModel.js';
import UploadImage from '../model/uploadImageModel.js';
import Detections from "../model/detectionModel.js";
import axios from 'axios';



AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

const uploadFileToS3 = (file) => {
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `${Date.now()}_${path.basename(file.originalname)}`,
        Body: fileStream,
        ContentType: file.mimetype,
        
    };

    return s3.upload(uploadParams).promise();
}

export const uploadpdffile = async (req, res) => {
    try {

        const s3Response = await uploadFileToS3(req.file);
        const fileUrl = s3Response.Location;

        const savedPDF =await axios.post(`http://121.140.65.24:5000/pdf/predict?pdf_url=${fileUrl}`);
        const molecules = savedPDF.data.result.filter(item => item.class === 'molecule');
        res.status(200).json(savedPDF.data);

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
        const s3Response = await uploadFileToS3(req.file);
        const fileUrl = s3Response.Location;

        const savedImage = await axios.post(`http://121.140.65.24:5000/image/predict?img_url=${fileUrl}`);
        res.status(200).json(savedImage.data);
        
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